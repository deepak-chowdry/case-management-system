"use client";
import { useEdgeStore } from '@/lib/edgestore';
import { Check, File, Trash2, Upload } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface CaseFileProps {
    file: File | null;
    setFile: (data: File | null) => void;
    onNext: () => void;
    onPrevious: () => void;
}

const CaseFile = ({ file, setFile, onNext, onPrevious }: CaseFileProps) => {
    const [progress, setProgress] = useState<number>(0); // Track upload progress
    const [isUploading, setIsUploading] = useState<boolean>(false); // Track if the file is uploading
    const [isUploaded, setIsUploaded] = useState<boolean>(false); // Track if the file has been uploaded
    const { edgestore } = useEdgeStore();

    // Handle file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile); // Set the selected file
            setIsUploaded(false); // Reset upload status when a new file is selected
        }
    };

    // Automatically start upload when a file is selected
    useEffect(() => {
        if (file && !isUploading && !isUploaded) {
            handleUpload();
        }
    }, [file]);

    // Handle file upload
    const handleUpload = async () => {
        if (file) {
            setIsUploading(true); // Start the uploading process

            try {
                const res = await edgestore.publicFiles.upload({
                    file,
                    onProgressChange: (progress) => {
                        setProgress(progress); // Update the progress bar
                    },
                });

                // After the upload is complete, set the uploaded flag and stop the upload process
                setIsUploading(false);
                setIsUploaded(true);

                console.log('File upload response:', res);
            } catch (err) {
                console.error('Upload failed:', err);
                setIsUploading(false);
            }
        }
    };

    return (
        <div className='flex flex-col gap-3 px-4 h-full'>
            <div className='flex flex-col md:flex-row items-center w-full h-11/12 gap-2'>
                <div className="flex flex-col items-center justify-center gap-3 cursor-pointer w-full md:w-1/2 border h-72">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*, .pdf, .doc, .docx" // Accept multiple file types
                        className="hidden"
                        id="file-upload"
                    />
                    <label htmlFor="file-upload" className="w-full h-full flex flex-col items-center justify-center gap-3 cursor-pointer">
                        <button className="p-3 rounded-full bg-muted border border-muted">
                            <Upload className="text-muted-foreground" strokeWidth={1.5} />
                        </button>
                        <p className="text-sm">
                            <span className="text-blue-400 font-medium">Click here</span> to upload your file.
                        </p>
                        <div className='flex flex-col items-center text-xs text-muted-foreground'>
                            <span>Accepted file types: PDF</span>
                            <span>Max number files: 50</span>
                            <span>Max size per file: 100MB</span>
                        </div>
                        {/* <Button
                            className='rounded-sm cursor-pointer'>
                            <File />
                            Select File
                        </Button> */}
                    </label>
                </div>

                <div className='w-full md:w-1/2 bg-muted h-72'>
                    {file && (
                        <div className="flex flex-col gap-2 items-center w-full border border-muted shadow-sm shadow-muted p-2 md:p-3 rounded-xl">
                            <div className="w-full flex items-center justify-between gap-1">
                                <div className="flex items-center gap-px w-10/12">
                                    <button className="p-1 rounded-md bg-muted border border-muted">
                                        <File className="text-muted-foreground size-4" strokeWidth={1.25} />
                                    </button>
                                    <div className="flex flex-col gap-1 w-full">
                                        <h3 className="text-xs text-nowrap text-ellipsis overflow-clip w-11/12">{file.name}</h3>
                                        {/* <p className="text-xs text-muted-foreground">{file.type}</p> */}
                                        {/* <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p> */}
                                        {/* ShadCN Upload Progress Bar */}
                                        {isUploading && (
                                            <Progress value={progress} max={100} className="w-full h-1" />
                                        )}
                                    </div>
                                </div>

                                {/* Display "Uploaded" once upload is completed */}
                                {isUploaded && (
                                    <div className='flex items-center'>
                                        <button className="w-6">
                                            <Check className="text-green-400 size-4" />
                                        </button>
                                        <button className="w-6">
                                            <Trash2 className="text-gray-400 size-4" />
                                        </button>
                                    </div>
                                )}
                            </div>


                        </div>
                    )}
                </div>
            </div>
            <div className='w-full space-x-3 flex justify-end'>
                <Button onClick={onPrevious} className='w-1/4' variant="outline">Back</Button>
                <Button onClick={onNext} className='w-1/4'>Next</Button>
            </div>
        </div>
    );
};

export default CaseFile;
