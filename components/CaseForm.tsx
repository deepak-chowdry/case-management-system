"use client";
import React, { useState } from "react";
import CaseDetails from "./CaseDetails";
import CaseFile from "./CaseFile";
import CaseReview from "./CaseReview";
import { FormProgress } from "./FormProgress";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type FormData = {
  casename: string;
  casetype: string;
};

const CaseForm = () => {
  const router = useRouter();
  const [file, setFile] = React.useState<File | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    casename: "",
    casetype: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 3;

  // Update form data
  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  // Handle next step
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const createCase = useMutation(api.cases.createCase);
  const updateCaseFile = useMutation(api.cases.updateCaseFile);
  const storeFileMetadata = useMutation(api.cases.storeFileMetadata);

  // Handle form submission
  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      // Create the case first
      const caseId = await createCase({
        caseName: formData.casename,
        caseType: formData.casetype,
      });

      // If there's a file, handle file upload and update case
      if (file) {
        // Generate a storage ID for the file
        const storageId = `${Date.now()}-${file.name}`;

        // Store file metadata
        await storeFileMetadata({
          caseId,
          storageId,
          fileName: file.name,
          fileSize: file.size,
        });

        // Update case with file information
        await updateCaseFile({
          caseId,
          fileId: storageId,
          fileName: file.name,
        });
      }

      toast.success("Case created successfully");
      
      // Small delay to ensure toast is visible before navigation
      setTimeout(() => {
        router.push("/dashboard/cases");
      }, 500);
    } catch (error) {
      console.error("Error submitting case:", error);
      toast.error("Failed to create case. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Card className="w-11/12 md:w-2xl md:min-w-2xl min-h-[50vh] flex flex-col justify-around">
      <CardHeader className="">
        <FormProgress currentStep={currentStep} totalSteps={totalSteps} />
      </CardHeader>
      <CardContent>
        {currentStep === 1 && (
          <CaseDetails
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
          />
        )}
        {currentStep === 2 && (
          <CaseFile
            file={file}
            setFile={setFile}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}

        {currentStep === 3 && (
          <CaseReview
            formData={formData}
            file={file}
            onPrevious={handlePrevious}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default CaseForm;
