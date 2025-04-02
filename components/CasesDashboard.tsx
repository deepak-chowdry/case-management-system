"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BriefcaseBusiness, ChevronDown, Search } from "lucide-react"
import { useRouter } from "next/navigation"

const CasesDashboard = () => {
    const router = useRouter()
    return (
        <div className="min-h-screen">
            <div className="flex-1 mx-auto">
                <div className="space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold">My Cases</h1>
                        <p className="text-gray-500">You are all set to start your day.</p>
                    </div>

                    <div className="border rounded-xl p-3">
                        <div className="flex gap-2 justify-between items-center mb-6">
                            <div className="flex justify-between items-center w-10/12 md:w-fit md:gap-3">
                                <div className="relative w-4/6 md:w-[280px]">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input placeholder="Filter by case..." className="pl-9" />
                                </div>
                                <Button variant="outline" className="flex items-center gap-1">
                                    Status
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </div>
                            <Button onClick={() => router.push("/dashboard/newcase")} className="bg-black text-white hover:bg-gray-800 flex items-center gap-2 cursor-pointer">
                                <BriefcaseBusiness className="h-4 w-4" strokeWidth={1.5} />
                                <span className="hidden md:flex">
                                    New Case
                                </span>
                            </Button>
                        </div>

                        <div className="border rounded-xl overflow-hidden">
                            <Table className=" rounded-xl">
                                <TableHeader className="border-b rounded-xl">
                                    <TableRow>
                                        <TableHead className="text-xs text-muted-foreground">
                                            Case Title
                                        </TableHead>
                                        <TableHead className="text-xs text-muted-foreground">
                                            Status
                                        </TableHead>
                                        <TableHead className="text-xs text-muted-foreground">
                                            Files
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell onClick={() => router.push("/dashboard/newcase")} colSpan={3} className="h-[250px] text-center cursor-pointer">
                                            <div className="flex flex-col items-center justify-center h-full space-y-2">
                                                <h2 className="text-xl font-semibold">Start Your Case Timeline Journey</h2>
                                                <p className="text-gray-500 max-w-md text-center">
                                                    Create a new timeline to organize and visualize your case events.
                                                </p>
                                                <Button className="mt-4 bg-black text-white hover:bg-gray-800 flex items-center gap-2">
                                                    <BriefcaseBusiness className="h-4 w-4" strokeWidth={1.5} />
                                                    <span>
                                                        New Case
                                                    </span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>

                        {/* <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                                <div>0 of 0 row(s) selected.</div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        Rows per page
                                        <Select defaultValue="10">
                                            <SelectTrigger className="w-16 h-8">
                                                <SelectValue placeholder="10" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="10">10</SelectItem>
                                                <SelectItem value="20">20</SelectItem>
                                                <SelectItem value="50">50</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>Page 1 of 0</div>

                                    <div className="flex items-center">
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <ChevronsLeft className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <ChevronsRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div> */}
                    </div>

                    {/* <div className="text-center text-sm text-gray-500">
                            <p>Note: Your data is secure and will not be used for model training.</p>
                            <p>It can be removed at any time upon request or once the job is complete.</p>
                        </div> */}
                </div>
            </div>
        </div>
    )
}

export default CasesDashboard

