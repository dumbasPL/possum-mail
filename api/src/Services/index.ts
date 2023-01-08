import {assertNever} from 'tsoa';
import {container, instanceCachingFactory} from 'tsyringe';
import {STORAGE_LOCAL_PATH, STORAGE_S3_ACCESS_KEY, STORAGE_S3_BUCKET_NAME, STORAGE_S3_ENDPOINT, STORAGE_S3_REGION, STORAGE_S3_SECRET_KEY, STORAGE_SERVICE} from '../env';
import {FsService} from './FsService';
import LocalFsService from './LocalFsService';
import S3FsService from './S3FsService';

export function registerServices() {
  container.register('FsService', {
    useFactory: instanceCachingFactory<FsService>(() => {
      switch (STORAGE_SERVICE) {
      case 'local':
        return new LocalFsService(STORAGE_LOCAL_PATH);
      case 's3':
        return new S3FsService(
          STORAGE_S3_ENDPOINT,
          STORAGE_S3_ACCESS_KEY,
          STORAGE_S3_SECRET_KEY,
          STORAGE_S3_BUCKET_NAME,
          STORAGE_S3_REGION,
        );
      default:
        assertNever(STORAGE_SERVICE);
      }
    })
  });
}
