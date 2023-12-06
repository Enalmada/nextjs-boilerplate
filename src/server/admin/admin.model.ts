import AdminService, { type UploadResponse } from '@/server/admin/admin.service';
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
