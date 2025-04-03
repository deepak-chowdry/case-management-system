"use client";
import { useEdgeStore } from "@/lib/edgestore";
import { Check, File, Trash2, Upload } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

type UploadResponse = {
  url: string;
  size: number;
  uploadedAt: Date;
  metadata: Record<string, never>;
  path: Record<string, never>;
  pathOrder: string[];
};

interface CaseFileProps {
  file: File | null;
  setFile: (data: File | null) => void;
  onNext: () => void;
  onPrevious: () => void;
}

// Create a cache to store upload states
const uploadCache = new Map<string, boolean>();

const CaseFile = ({ file, setFile, onNext, onPrevious }: CaseFileProps) => {
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const { edgestore } = useEdgeStore();
  
  // Set initial upload state from cache
  useEffect(() => {
    if (file && uploadCache.has(file.name)) {
      setIsUploaded(true);
    }
  }, [file]);

  // Memoize the upload function
  const handleUpload = useCallback(async (fileToUpload: File) => {
    // Check if file is already uploaded
    if (uploadCache.has(fileToUpload.name)) {
      setIsUploaded(true);
      return;
    }

    setIsUploading(true);

    try {
      const res: UploadResponse = await edgestore.publicFiles.upload({
        file: fileToUpload,
        onProgressChange: (progress: number) => {
          setProgress(progress);
        },
      });

      // Cache the upload state
      uploadCache.set(fileToUpload.name, true);
      setIsUploading(false);
      setIsUploaded(true);

      console.log("File upload response:", res);
      return res;
    } catch (err) {
      console.error("Upload failed:", err);
      setIsUploading(false);
      uploadCache.delete(fileToUpload.name);
    }
  }, [edgestore.publicFiles]);

  // Handle file selection
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Check if file was previously uploaded
      setIsUploaded(uploadCache.has(selectedFile.name));
    }
  }, [setFile]);

  // Automatically start upload when a file is selected
  useEffect(() => {
    if (file && !isUploading && !isUploaded && !uploadCache.has(file.name)) {
      handleUpload(file);
    }
  }, [file, isUploading, isUploaded, handleUpload]);

  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <div className="flex flex-col md:flex-row items-center w-full h-full gap-4">
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 h-72 border border-muted-foreground rounded-lg shadow-sm p-4 cursor-pointer">
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*, .pdf, .doc, .docx"
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="w-full h-full flex flex-col items-center justify-center gap-3 cursor-pointer"
          >
            <button className="p-4 rounded-full bg-muted transition duration-200">
              <Upload className="text-muted-foreground" strokeWidth={1.5} />
            </button>
            <p className="text-sm text-gray-600">
              <span className="text-blue-500 font-medium">Click here</span> to
              upload your file.
            </p>
            <div className="flex flex-col items-center text-xs text-gray-500 mt-2">
              <span>Accepted file types: PDF, DOC, DOCX</span>
              <span>Max number files: 50</span>
              <span>Max size per file: 100MB</span>
            </div>
          </label>
        </div>

        <div className="w-full md:w-1/2 h-72 bg-muted rounded-lg shadow-sm p-4">
          {file && (
            <div className="flex flex-col gap-3 items-center w-full border rounded-lg p-2.5">
              <div className="w-full flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 w-10/12">
                  <button className="">
                    <File
                      className="text-muted-foreground size-4"
                      strokeWidth={1.25}
                    />
                  </button>
                  <div className="flex flex-col gap-1 w-full">
                    <h3 className="text-xs text-ellipsis overflow-clip">
                      {file.name}
                    </h3>
                    {/* ShadCN Upload Progress Bar */}
                    {isUploading && (
                      <Progress
                        value={progress}
                        max={100}
                        className="w-full h-1"
                      />
                    )}
                  </div>
                </div>

                {/* Display "Uploaded" once upload is completed */}
                {isUploaded && (
                  <div className="flex items-center space-x-3">
                    <button className="text-green-500">
                      <Check className="size-3" />
                    </button>
                    <button className="">
                      <Trash2 className="size-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <Button
          onClick={onPrevious}
          className="w-1/4"
          variant="outline"
          size="sm"
        >
          Back
        </Button>
        <Button onClick={onNext} className="w-1/4" size="sm">
          Next
        </Button>
      </div>
    </div>
  );
};

export default CaseFile;
