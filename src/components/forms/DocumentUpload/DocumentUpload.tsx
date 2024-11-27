import { DocumentUploadProps } from '@/interfaces/ComponentInterfaces'
import React from 'react'
import useUpload from '@/customHooks/useUpload';

const DocumentUpload: React.FC<DocumentUploadProps> = ({ uploadInterface, validFormats, callback, otherData=null }) => {

  const { uploading, error, handleUpload } = useUpload();

  return (
    // to make the whole div clickable
    <div className='relative'>
      {uploadInterface}
      <input
      id="file-upload"
      className="cursor-pointer left-0 top-0 absolute opacity-0 h-full w-full"
      type="file"
      accept={validFormats}
      onChange={(event) => handleUpload(event, callback, otherData)}
      disabled={uploading}
      />
      {error && <p className="text-xs text-danger-main">{error}</p>}
    </div>
  );
}

export default DocumentUpload