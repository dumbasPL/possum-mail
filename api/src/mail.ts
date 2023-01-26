import {SMTPServer} from 'smtp-server';
import {EmailAddress, simpleParser, SimpleParserOptions} from 'mailparser';
import logger from './logger';
import {container} from 'tsyringe';
import ConfigService from './Services/ConfigService';
import {SMTP_PORT} from './env';
import {formatServerAddress} from './util/ip';
import {generateFakeMessageId, getEmailDomain} from './util/mail';
import MailService from './Services/MailService';
import {SaveEmailAttachmentModel} from './Models/EmailModel';

export function createMailServer() {
  const configService = container.resolve(ConfigService);

  const server = new SMTPServer({
    disabledCommands: ['AUTH'],
    async onData(stream, session, callback) {
      try {
        const parsed = await simpleParser(stream, {
          skipHtmlToText: false, // we always want text representation for search purposes
          skipTextToHtml: true, // but we don't want redundant html
          keepCidLinks: true,
          skipImageLinks: true,
          ...{
            checksumAlgo: 'sha256'
          } as SimpleParserOptions, // undocumented fields https://github.com/nodemailer/mailparser/issues/331
        });

        const walkAddressList = (list: EmailAddress[]) => {
          const addresses: string[] = [];
          for (const address of list) {
            if (address.group) {
              addresses.push(...walkAddressList(address.group));
            } else if (address.address) {
              addresses.push(address.address);
            }
          }
          return addresses;
        };

        const toArray = (
          parsed.to == undefined ? [] :
            Array.isArray(parsed.to) ?
              parsed.to : [parsed.to]
        ).flatMap(to => walkAddressList(to.value));

        if (toArray.length == 0) {
          throw new Error('Invalid "To" header');
        }

        const allowedDomains = await configService.getDomains();

        const to = toArray.find(address => {
          const domain = getEmailDomain(address);
          return domain != null && allowedDomains.includes(domain);
        });

        if (to == undefined) {
          throw new Error('Invalid "To" address');
        }

        const from = parsed.from?.value[0]?.address;
        const fromName = parsed.from?.value[0]?.name || null;
        const fromDomain = from ? getEmailDomain(from) : null;

        if (from == undefined || fromDomain == null) {
          throw new Error('Missing/Invalid "From" header');
        }

        const attachments = parsed.attachments.map<SaveEmailAttachmentModel>((a, i) => ({
          hash: a.checksum,
          filename: a.filename ?? `attachment-${i + 1}`,
          contentType: a.contentType,
          contentId: a.contentId || null,
          related: a.related || false,
          size: a.size,
          content: a.content,
        }));

        const mail = await container.resolve(MailService).saveEmail({
          messageId: parsed.messageId ?? generateFakeMessageId(),
          date: parsed.date ?? new Date(),
          fromName,
          from,
          to,
          subject: parsed.subject || null,
          htmlBody: parsed.html || null,
          textBody: parsed.text || null,
          attachments,
        });

        logger.info(`new mail ${mail.messageId} from ${mail.from} to ${mail.to}: ${mail.subject} (${mail.attachments?.length ?? 0} attachments)`);

        callback();
      } catch (error) {
        logger.error(error);
        callback(error as Error);
      }
    },
  });

  server.listen(SMTP_PORT, () => logger.info(`SMTP server listening on http://${formatServerAddress(server.server.address())}`));

  return server;
}
