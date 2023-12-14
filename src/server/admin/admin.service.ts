import Logger from '@/lib/logging/log-util';
import { type MyContextType } from '@/server/graphql/server';
import {
  NotificationEventType,
  publishNotificationEvent,
} from '@/server/graphql/subscriptions/notification';
import { accessCheck } from '@/server/utils/accessCheck';
import { nanoid } from 'nanoid';

export interface UploadResponse {
  filename: string;
}

export interface Upload {
  file: File;
}

export interface NotificationInput {
  message: string;
}

export interface NotificationResponse {
  published: boolean;
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

  async publishNotification(
    input: NotificationInput,
    ctx: MyContextType
  ): Promise<NotificationResponse> {
    const logger = this.logger.logMethodStart(this.publishNotification.name, ctx, { ...input });

    accessCheck(logger, ctx.currentUser, 'manage', 'all', input);

    const event = {
      id: 'not_' + nanoid(),
      type: NotificationEventType.SystemNotification,
      message: input.message,
    };

    await publishNotificationEvent(event, ctx);

    return { published: true };
  }
}
