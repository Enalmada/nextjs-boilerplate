'use client';

import React, { useRef, useState, type ChangeEvent } from 'react';
import { UPLOAD_FILE } from '@/client/gql/admin-queries.gql';
import { type UploadFileMutation } from '@/client/gql/generated/graphql';
import { Button, Spinner } from '@nextui-org/react';
import { useMutation } from 'urql';

// File Upload Example
// https://github.com/urql-graphql/urql/blob/main/examples/with-multipart/src/FileUpload.jsx

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [result, uploadFile] = useMutation<UploadFileMutation>(UPLOAD_FILE);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data, fetching, error } = result;

  const handleFileUpload = () => {
    if (selectedFile) {
      void uploadFile({ file: selectedFile });
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <div className={'mb-3'}>Test File Upload</div>

      {fetching && (
        <>
          <Spinner /> <p>Loading...</p>
        </>
      )}

      {error && <p>Oh no... {error.message}</p>}

      {data && data.uploadFile ? (
        <p>File uploaded: {data.uploadFile.filename}</p>
      ) : (
        <div className="flex flex-row items-center gap-2">
          <input
            type="file"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }} // Hide the default input
          />

          <Button onPress={triggerFileInput}>Select File</Button>

          {!selectedFile && <div className={'text-center'}>No file chosen</div>}
          {selectedFile && (
            <>
              <div>{selectedFile.name}</div>

              <Button
                onPress={handleFileUpload}
                disabled={!selectedFile} // Disable button if no file is selected
              >
                Upload!
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
