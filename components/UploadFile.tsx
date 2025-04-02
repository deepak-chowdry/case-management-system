"use client";
import { useEdgeStore } from '@/lib/edgestore';
import { Check, File } from 'lucide-react';
import React, { useEffect } from 'react';
import { Progress } from './ui/progress';

const UploadFile = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [progress, setProgress] = React.useState<number>(0); // Track upload progress
  const [isUploading, setIsUploading] = React.useState<boolean>(false); // Track if the file is uploading
  const [isUploaded, setIsUploaded] = React.useState<boolean>(false); // Track if the file has been uploaded
  const { edgestore } = useEdgeStore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsUploaded(false); // Reset upload status when a new file is selected
    }
  };

  // Start the upload automatically when a file is selected
  useEffect(() => {
    if (file && !isUploading && !isUploaded) {
      handleUpload();
    }
  }, [file]);

  const handleUpload = async () => {
    if (file) {
      setIsUploading(true); // Start the uploading process

      try {
        const res = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => {
            // Update the progress bar
            setProgress(progress);
          },
        });

        // After the upload is complete, set the uploaded flag and stop the upload process
        setIsUploading(false);
        setIsUploaded(true);

        // You can run some server action or API here to add necessary data to your database
        console.log(res);
      } catch (error: any) {
        // Handle errors
        console.error("Upload failed:", error);
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex flex-col items-center justify-center gap-3 h-40 bg-sidebar border border-muted border-dashed rounded-lg cursor-pointer">
        {/* Entire Area is Clickable */}
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*, .pdf, .doc, .docx" // Add file type restrictions if needed
          className="hidden"
          id="file-upload"
        />

        <label htmlFor="file-upload" className="w-full h-full flex flex-col items-center justify-center gap-3 cursor-pointer">
          <button className='p-3 rounded-md bg-muted border border-muted'>
            <File className='text-muted-foreground' strokeWidth={1.5} />
          </button>
          <p className='text-sm'><span className='text-blue-400 font-medium'>Click here</span> to upload your file.</p>
        </label>
      </div>

      {file && (
        <div className='flex flex-col gap-2 items-center w-full border border-muted shadow-sm shadow-muted p-2 md:p-3 rounded-xl'>
          {/* File Preview */}
          {file && (
            <div className="w-full flex items-center justify-between gap-1">
              {file.type.startsWith("image/") ? (
                <div className='flex items-center gap-3'>
                  <img
                    src={URL.createObjectURL(file)}
                    alt="File Preview"
                    className="w-14 h-14 object-cover rounded-md"
                  />
                  <div className='flex flex-col '>
                    <h3 className='text-xs'>{file.name}</h3>
                    <div className='flex items-center gap-2 md:gap-3'>
                      <p className='text-xs text-muted-foreground'>{file.type}</p>
                      <span className='text-muted-foreground'>•</span>
                      <p className='text-xs text-muted-foreground'>{(file.size / 1024).toFixed(2)} KB</p>
                      <span className='text-muted-foreground'>•</span>
                      <p className="text-xs text-muted-foreground">
                        {progress}%
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='flex items-center gap-3 w-11/12'>
                  <button className='p-3 rounded-md bg-muted border border-muted'>
                    <File className='text-muted-foreground' strokeWidth={1.25} />
                  </button>
                  <div className='flex flex-col '>
                    <h3 className='text-xs md:text-sm'>{file.name}</h3>
                    <div className='flex items-center gap-2 md:gap-3'>
                      <p className='text-xs text-muted-foreground'>{file.type}</p>
                      <span className='text-muted-foreground'>•</span>
                      <p className='text-xs text-muted-foreground'>{(file.size / 1024).toFixed(2)} KB</p>
                      <span className='text-muted-foreground'>•</span>
                      <p className="text-xs text-muted-foreground">
                        {progress}%
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Display "Uploaded" once upload is completed */}
              {isUploaded && (
                <button className='w-6'>
                  <Check className="text-green-400 size-5" />
                </button>
              )}
            </div>
          )}

          {/* ShadCN Upload Progress Bar */}
          {isUploading && (
            <Progress value={progress} max={100} className='w-full h-1.5' />
          )}
        </div>
      )}
    </div>
  );
};

export default UploadFile;
