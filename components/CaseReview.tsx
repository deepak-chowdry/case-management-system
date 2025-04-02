import { Button } from './ui/button';
import { Card } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'; // Assuming ShadCN Table components are available

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
        <Card className="shadow-none border-none rounded-lg">
            <h3 className="text-xl font-medium mb-4">Review Your Case Information</h3>

            {/* Display Case Details */}
            <div className="space-y-4 mb-6 border rounded-xl p-4">
                <div className="flex justify-between items-center">
                    <p className="font-medium ">Case Name:</p>
                    <span className="">{formData.casename || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center">
                    <p className="font-medium ">Area of Law:</p>
                    <span className="">{formData.casetype || 'N/A'}</span>
                </div>
            </div>

            {/* Display Uploaded File with ShadCN Table */}
            <div className="border p-4 rounded-xl mb-6">
                <div className="flex justify-between items-center mb-3">
                    <p className="font-medium ">Uploaded File:</p>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-left">File Name</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {file ? (
                            <TableRow>
                                <TableCell>{file.name}</TableCell>
                               
                            </TableRow>
                        ) : (
                            <TableRow>
                                <TableCell colSpan={2} className="text-center ">
                                    No file uploaded
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-end gap-4">
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
