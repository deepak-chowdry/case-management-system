import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { FormData } from './CaseForm';
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface CaseDetailsProps {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
    onNext: () => void;
}

const CaseDetails = ({ formData, updateFormData, onNext }: CaseDetailsProps) => {
    const [disabled, setDisabled] = useState(true);

    // Handle input change for form fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });
    };

    // Handle selection change for the area of law
    const handleSelectChange = (value: string) => {
        updateFormData({ casetype: value });
    };

    // Effect to enable/disable the Next button based on form data
    useEffect(() => {
        const isFormValid = formData.casename.trim() !== "" && formData.casetype.trim() !== "";
        setDisabled(!isFormValid);
    }, [formData]);

    return (
        <Card className="w-full shadow-none borderFO h-full">
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        {/* Case Name */}
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Enter case name</Label>
                            <Input
                                id="name"
                                name="casename" // Add name attribute
                                placeholder="Name of your case"
                                value={formData.casename} // Control value with formData
                                onChange={handleInputChange} // Use handleInputChange for text inputs
                            />
                        </div>

                        {/* Area of Law */}
                        <div className="flex flex-col space-y-1.5 w-full">
                            <Label htmlFor="law">Area of law</Label>
                            <Select value={formData.casetype} onValueChange={handleSelectChange}>
                                <SelectTrigger id="law" className="w-full h-14">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper" className="w-full">
                                    <SelectItem value="criminal">Criminal Law</SelectItem>
                                    <SelectItem value="civil">Civil Law</SelectItem>
                                    <SelectItem value="corporate">Corporate Law</SelectItem>
                                    <SelectItem value="family">Family Law</SelectItem>
                                    <SelectItem value="intellectual">Intellectual Property Law</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <div className="text-center text-sm text-gray-500">
                    <p>Note: Your data is secure and will not be used for model training.</p>
                    <p>It can be removed at any time upon request or once the job is complete.</p>
                </div>
                <div className="flex justify-end w-full">
                    <Button 
                        disabled={disabled} 
                        onClick={onNext} 
                        className="w-1/3"
                    >
                        Next
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default CaseDetails;
