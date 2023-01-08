import {Readable as ReadableStream} from 'stream';

export interface FsService {

  init(): Promise<void>;

  get(name: string): Promise<ReadableStream>;

  put(name: string, stream: ReadableStream | Buffer): Promise<void>;

}

