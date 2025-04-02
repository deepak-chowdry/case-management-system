"use client"
import React, { useState } from 'react'
import CaseDetails from './CaseDetails'
import CaseFile from './CaseFile'
import CaseReview from './CaseReview'
import { FormProgress } from './FormProgress'
import { Card, CardContent, CardHeader } from './ui/card'
// Define the form data structure
export type FormData = {
    casename: string,
    casetype: string,
}

// Initial form data
const initialFormData: FormData = {
    casename: "",
    casetype: "",
}

const CaseForm = () => {
    const [file, setFile] = React.useState<File | null>(null);
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState<FormData>(initialFormData)

    const totalSteps = 3

    // Update form data
    const updateFormData = (newData: Partial<FormData>) => {
        setFormData((prev) => ({ ...prev, ...newData }))
    }

    // Handle next step
    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep((prev) => prev + 1)
        }
    }

    // Handle previous step
    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1)
        }
    }

    // Handle form submission
    const handleSubmit = () => {
        console.log("Form submitted:", formData)
        alert("Form submitted successfully!")
    }
    return (
        <Card className='w-11/12 md:w-2xl md:min-w-2xl min-h-[60vh] flex flex-col justify-around'>
            <CardHeader>
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
            </CardContent>

            {currentStep === 2 && (
                <CaseFile
                    file={file}
                    setFile={setFile}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                />
            )}

            {currentStep === 3 && <CaseReview formData={formData} file={file} onPrevious={handlePrevious} onSubmit={handleSubmit} />}
        </Card>
    )
}

export default CaseForm
