import path from 'path';
import fs from 'fs';
import {Readable} from 'stream';
import {pipeline} from 'stream/promises';
import {FsService} from './FsService';

export default class LocalFsService implements FsService {

  constructor(
    private rootDirectory: string,
  ) {}

  async init(): Promise<void> {
    await fs.promises.mkdir(this.rootDirectory, {recursive: true});
  }

  private getFullPath(name: string): string {
    if (name.indexOf('\0') !== -1) {
      throw new Error('Access denied');
    }

    const fullPath = path.join(this.rootDirectory, name);
    if (fullPath.indexOf(this.rootDirectory) != 0) {
      throw new Error('Access denied');
    }

    return fullPath;
  }

  get(name: string): Promise<Readable> {
    const filePath = this.getFullPath(name);

    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(filePath);
      readStream.on('open', () => resolve(readStream));
      readStream.on('error', error => reject(error));
    });
  }

  async put(name: string, stream: Readable | Buffer): Promise<void> {
    const filePath = this.getFullPath(name);

    // make sure the directory exists
    const directory = path.dirname(filePath);
    await fs.promises.mkdir(directory, {recursive: true});

    if (Buffer.isBuffer(stream)) {
      await fs.promises.writeFile(filePath, stream);
      return;
    }

    await pipeline(stream, fs.createWriteStream(filePath));
  }

}
