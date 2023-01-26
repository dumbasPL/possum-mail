
export interface SaveEmailModel {
  messageId: string,
  date: Date,
  fromName: string | null,
  from: string,
  to: string,
  subject: string | null,
  htmlBody: string | null,
  textBody: string | null,
  attachments: SaveEmailAttachmentModel[],
}

export interface SaveEmailAttachmentModel {
  hash: string;
  filename: string;
  contentType: string;
  contentId: string | null;
  related: boolean;
  size: number;
  content: Buffer;
}
