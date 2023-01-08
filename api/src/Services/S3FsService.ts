import {Client, Region} from 'minio';
import {Readable} from 'stream';
import {FsService} from './FsService';

export default class S3FsService implements FsService {

  private client: Client;

  constructor(
    endPoint: string,
    accessKey: string,
    secretKey: string,
    private bucketName: string,
    private bucketRegion: Region,
  ) {
    this.client = new Client({
      endPoint,
      accessKey,
      secretKey,
    });
  }

  async init(): Promise<void> {
    if (!await this.client.bucketExists(this.bucketName)) {
      await this.client.makeBucket(this.bucketName, this.bucketRegion);
    }
  }

  get(name: string): Promise<Readable> {
    return this.client.getObject(this.bucketName, name);
  }

  async put(name: string, stream: Readable | Buffer): Promise<void> {
    await this.client.putObject(this.bucketName, name, stream);
  }

}
