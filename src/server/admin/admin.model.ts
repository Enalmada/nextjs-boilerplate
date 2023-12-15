import AdminService, {
  type NotificationResponse,
  type UploadResponse,
} from '@/server/admin/admin.service';
import { builder } from '@/server/graphql/builder';

// File Upload Example
// https://github.com/dotansimha/graphql-yoga/blob/main/examples/file-upload-nextjs-pothos/schema.ts
const UploadResponseObject = builder.objectRef<UploadResponse>('UploadResponse');

UploadResponseObject.implement({
  fields: (t) => ({
    filename: t.exposeString('filename'),
  }),
});

builder.mutationField('uploadFile', (t) =>
  t.field({
    type: UploadResponseObject,
    args: {
      file: t.arg({
        type: 'File',
        required: true,
      }),
    },
    resolve: async (root, { file }, ctx) => {
      return new AdminService().uploadFile({ file }, ctx);
    },
  })
);

// Notifications

const NotificationResponseObject = builder.objectRef<NotificationResponse>('NotificationResponse');

NotificationResponseObject.implement({
  fields: (t) => ({
    published: t.exposeBoolean('published'),
  }),
});

builder.mutationField('publishNotification', (t) =>
  t.fieldWithInput({
    type: NotificationResponseObject,
    nullable: true,
    input: {
      message: t.input.string({
        required: false,
      }),
    },
    resolve: (root, args, ctx) => {
      const finalMessage = args.input.message || 'hello';
      return new AdminService().publishNotification({ message: finalMessage }, ctx);
    },
  })
);
