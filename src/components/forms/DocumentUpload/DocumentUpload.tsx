import { DocumentUploadProps } from '@/interfaces/ComponentInterfaces'
import React from 'react'
import useUpload from '@/customHooks/useUpload';

const DocumentUpload: React.FC<DocumentUploadProps> = ({ uploadInterface, validFormats, callback, otherData=null, onBlur }) => {

  const { uploading, error, handleUpload } = useUpload();

  return (
    <div>
      {uploadInterface}
      <input
      id="file-upload"
      className="hidden"
      type="file"
      accept={validFormats}
        onChange={(event) => handleUpload(event, callback, otherData)}
        onBlur={onBlur}
      disabled={uploading}
      />
      {error && <p className="text-xs text-danger-main">{error}</p>}
    </div>
  );
}

export default DocumentUpload