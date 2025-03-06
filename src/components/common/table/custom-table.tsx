import { Input } from "@/components/ui/input";
import { ChevronLeft, Search } from "lucide-react";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { DataTable } from "./data-table";
import { columnsStudent, columnsStaff } from "./columns";
import { biodataStudents, biodataStaffs } from "@/lib/data";


type CustomTableType = {
    mode: string
}

function CustomTable({ mode }: CustomTableType) {
    return (
        <div className="bg-white rounded-[8px] max-h-[776px]">
            <div className="p-4 flex justify-between items-center">
                <div className="text-black  flex flex-col gap-1">
                    <span className="uppercase font-medium text-sm">Total Entries</span>
                    <span className="text-2xl font-bold">56,732</span>
                </div>

                <div>
                    <div className="relative w-[384px] max-w-[384px] text-[#6B7280] space-x-2 ">
                        <Search className="absolute w-[16px] top-2.5 left-3"/>
                        <Input type="text" placeholder="Search" className="bg-[#F9FAFB] border border-[#D1D5DB] rounded-[8px] py-5 px-4 pl-10 text-sm"/>
                    </div>
                </div>

            </div>

            {
                mode === 'students' ? <DataTable columns={columnsStudent} data={biodataStudents} /> : <DataTable columns={columnsStaff} data={biodataStaffs} />
            }

            <div className="p-4 flex justify-between items-center mt-10">
                <p className="text-sm">Showing <span className="font-bold">1-10</span> of <span className="font-bold">100</span></p>

                <div>
                    <Pagination className="">
                        <PaginationContent className="rounded-[4px] overflow-hidden gap-0">
                            <PaginationItem className="border border-[#D1D5DB] first:rounded-l-[4px] last:rounded-r-[4px]">
                                <PaginationPrevious href="#" />
                                {/* <ChevronLeft className="w-[20px]"/> */}
                            </PaginationItem>
                            <PaginationItem className="border-y border-r border-[#D1D5DB]">
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem className="border-y border-r border-[#D1D5DB]">
                                <PaginationLink href="#">2</PaginationLink>
                            </PaginationItem>
                            <PaginationItem className="border-y border-r border-[#D1D5DB]">
                                <PaginationLink href="#">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem className="border-y border-r border-[#D1D5DB]">
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem className="border-y border-[#D1D5DB]">
                                <PaginationLink href="#">100</PaginationLink>
                            </PaginationItem>
                            <PaginationItem className="border border-[#D1D5DB] first:rounded-l-[4px] last:rounded-r-[4px]">
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>

            </div>

        </div>
    );
};

export default CustomTable;