import Logger from '@/lib/logging/log-util';
import { type MyContextType } from '@/server/graphql/server';
import { accessCheck } from '@/server/utils/accessCheck';

export interface UploadResponse {
  filename: string;
}

export interface Upload {
  file: File;
}

export default class AdminService {
  private readonly logger = new Logger(AdminService.name);

  async uploadFile(input: Upload, ctx: MyContextType): Promise<UploadResponse> {
    const logger = this.logger.logMethodStart(this.uploadFile.name, ctx, { ...input });

    accessCheck(logger, ctx.currentUser, 'manage', 'all', input);

    const text = await input.file.text();
    logger.debug('file content:' + text);

    return { filename: input.file.name };
  }
}
