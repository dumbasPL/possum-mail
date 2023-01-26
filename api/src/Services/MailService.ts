import {EmptyResultError, UniqueConstraintError} from 'sequelize';
import {injectable} from 'tsyringe';
import Attachment from '../Entities/Attachment';
import Mail from '../Entities/Mail';
import {SaveEmailModel} from '../Models/EmailModel';
import sequelize from '../sequelize';
import AttachmentService from './AttachmentService';

@injectable()
export default class MailService {

  constructor(
    private attachmentService: AttachmentService,
  ) {}

  async saveEmail(model: SaveEmailModel): Promise<Mail> {
    return await sequelize.transaction(async transaction => {
      let mail!: Mail;
      try {
        mail = await Mail.create({
          messageId: model.messageId,
          date: model.date,
          fromName: model.fromName,
          from: model.from,
          to: model.to,
          subject: model.subject,
          htmlBody: model.htmlBody,
          textBody: model.textBody,
        }, {transaction});
      } catch (error) {
        // duplicate email
        if (error instanceof UniqueConstraintError || error instanceof EmptyResultError) {
          // return existing email
          return (await Mail.findOne({
            where: {messageId: model.messageId},
            include: [Attachment],
          }))!;
        }
        throw error;
      }

      mail.attachments = [];
      for (const attachment of model.attachments) {
        const att = await this.attachmentService.saveAttachment(attachment, mail.id, transaction);
        mail.attachments.push(att);
      }

      return mail;
    });
  }

}
