import {Transaction} from 'sequelize';
import {inject, injectable} from 'tsyringe';
import Attachment from '../Entities/Attachment';
import {SaveEmailAttachmentModel} from '../Models/EmailModel';
import {FsService} from './FsService';

@injectable()
export default class AttachmentService {

  constructor(
    @inject('FsService') private fs: FsService,
  ) {}

  private getFullName(name: string) {
    return `attachments/${name}`;
  }

  async saveAttachment(model: SaveEmailAttachmentModel, mailId: string, transaction: Transaction | undefined): Promise<Attachment> {
    // check if the hash is already known (this should be an index only scan)
    const exists = await Attachment.findOne({
      attributes: ['hash'],
      where: {hash: model.hash},
      //* the lack of transaction here is deliberate
    }).then(row => row != null);

    const attachment = await Attachment.create({
      hash: Buffer.from(model.hash, 'hex'),
      filename: model.filename,
      contentType: model.contentType,
      contentId: model.contentId,
      related: model.related,
      size: model.size,
      MailId: mailId,
    }, {transaction});

    // don't save it, It's already there
    if (exists) {
      return attachment;
    }

    // TODO: background save
    await this.fs.put(this.getFullName(model.hash), model.content);

    return attachment;
  }

}
