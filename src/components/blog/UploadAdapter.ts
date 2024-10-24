export class MyUploadAdapter {
  private loader: any;
  private validateFile: (file: File) => boolean;
  private handleFileUpload: (file: File) => Promise<string>;

  constructor(
    loader: any,
    validateFile: (file: File) => boolean,
    handleFileUpload: (file: File) => Promise<string>
  ) {
    this.loader = loader;
    this.validateFile = validateFile;
    this.handleFileUpload = handleFileUpload;
  }

  upload(): Promise<{ default: string }> {
    return this.loader.file
      .then((file: File) => {
        if (!this.validateFile(file)) {
          return Promise.reject("Invalid file");
        }
        return this.handleFileUpload(file);
      })
      .then((fileUrl: string) => ({ default: fileUrl }));
  }

  abort(): void {
    // Handle abort if necessary
  }
}


export function MyCustomUploadAdapterPlugin(
  editor: any,
  validateFile: (file: File) => boolean,
  handleFileUpload: (file: File) => Promise<string>
): void {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
    return new MyUploadAdapter(loader, validateFile, handleFileUpload);
  };
}
