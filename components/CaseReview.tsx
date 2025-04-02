import { Button } from './ui/button';
import { Card } from './ui/card';

interface CaseReviewProps {
    formData: {
        casename: string;
        casetype: string;
    };
    file: File | null;
    onPrevious: () => void;
    onSubmit: () => void;
}

const CaseReview = ({ formData, file, onPrevious, onSubmit }: CaseReviewProps) => {
    return (
        <Card className="px-4 shadow-none border-none">
            <h3 className="text- font-medium">Review Your Case Information</h3>

            {/* Display Case Details */}
            <div className="space-y-2 border p-3 rounded-xl">
                <div className="flex justify-between">
                    <p className="font-medium text-sm">Case Name:</p>
                    <span>{formData.casename || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                    <p className="font-medium text-sm">Area of Law:</p>
                    <span>{formData.casetype || 'N/A'}</span>
                </div>
            </div>

            {/* Display Uploaded File */}
            <div className="space-y-2 border p-3 rounded-xl">
                <div className="flex justify-between">
                    <span className="font-medium">Uploaded File:</span>
                </div>
                <span>{file ? file.name : 'No file uploaded'}</span>

            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-end gap-3">
                <Button onClick={onPrevious} variant="outline" className="w-1/4">
                    Back
                </Button>
                <Button onClick={onSubmit} className="w-1/4">
                    Submit
                </Button>
            </div>
        </Card>
    );
};

export default CaseReview;
