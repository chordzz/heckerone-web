'use client'

import { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import {  Search, SlidersVertical, X } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { DataTable } from "./data-table";
import { columnsStudent, columnsStaff } from "./columns";
// import { biodataStudents, biodataStaffs } from "@/lib/data";
import FilterList from "./filter-list";
// import useStudents from "@/hooks/useStudents";
// import useStaff from "@/hooks/useStaff";
import CustomPagination from "./custom-pagination";
import TableListStatus from "./table-list-status";
import { useStudents } from "@/contexts/studentsContext";
import { useStaff } from "@/contexts/staffContext";


type CustomTableType = {
    mode: string
}

function CustomTable({ mode }: CustomTableType) {

    const [filterOpen, setFilterOpen] = useState(false)

    const { 
        students, 
        total_entries,
        next_page,
        previous_page,
        page,
        page_size,
        setPage,
        search,
        setSearch,
    } = useStudents()

    const { 
        staff, 
        total_entries: staff_total_entries,
        next_page: staff_next_page,
        previous_page: staff_previous_page,
        page: staff_page,
        page_size: staff_page_size,
        setPage: setStaffPage,
        search: staff_search,
        setSearch: setStaffSearch
    } = useStaff()

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        if (mode === 'students') {
            setSearch(e.target.value)
        } else if (mode === 'staff') {
            setStaffSearch(e.target.value)
        }
    }

    // Calculate total pages and page numbers based on mode
    const totalPages = mode === 'students'
        ? Math.ceil((total_entries || 0) / (page_size || 1))
        : Math.ceil((staff_total_entries || 0) / (staff_page_size || 1));

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    // console.log(page, page_size, pageNumbers)

    return (
        <div className="bg-white rounded-[8px] max-h-[776px]">
            <div className="p-4 flex justify-between items-center">
                <div className="text-black  flex flex-col gap-1">
                    <span className="uppercase font-medium text-sm">Total Entries</span>
                    <span className="text-2xl font-bold">
                        {mode === 'students'
                            ? total_entries || 0
                            : staff_total_entries || 0
                        }
                    </span>
                </div>

                <div className="flex items-center gap-10" >
                    <Popover open={filterOpen} onOpenChange={setFilterOpen}>
                        
                        <PopoverTrigger>
                            <div className="text-[#6B7280] text-sm font-medium flex items-center gap-2 cursor-pointer">
                                <SlidersVertical />
                                <span>Filter List</span>
                            </div>
                        </PopoverTrigger>

                        <PopoverContent avoidCollisions collisionPadding={50} side="left" align="center" className="p-0 w-[260px] overflow-y-auto max-h-[80vh]">

                            {/* <div className=""> */}
                                <div className="py-5 px-3 border-b border-[#E7E5E4] text-[16px] leading-[150%] font-bold flex justify-between items-center">
                                    <span className="">Filter list</span>
                                    <X className="cursor-pointer" onClick={() => setFilterOpen(false)}/>
                                </div>

                                <FilterList mode={mode} />

                            {/* </div> */}

                        </PopoverContent>
                    </Popover>
                    <div className="relative w-[384px] max-w-[384px] text-[#6B7280] space-x-2 ">
                        <Search className="absolute w-[16px] top-2.5 left-3"/>
                        <Input type="text" placeholder="Search" className="bg-[#F9FAFB] border border-[#D1D5DB] rounded-[8px] py-5 px-4 pl-10 text-sm" value={mode === 'students' ? search : staff_search} onChange={handleSearch}/>
                    </div>
                </div>

            </div>

            {
                mode === 'students'
                    ? <DataTable columns={columnsStudent} data={students ?? []} />
                    : <DataTable columns={columnsStaff} data={staff ?? []} />
            }

            <div className="p-4 flex justify-between items-center mt-10">
                {mode === 'students' ? (
                    <TableListStatus
                        total_entries={total_entries}
                        page={page}
                        page_size={page_size}
                    />
                ) : (
                    <TableListStatus
                        total_entries={staff_total_entries}
                        page={staff_page}
                        page_size={staff_page_size}
                    />
                )}

                <div>
                    {
                        mode === 'students' ? 
                            <CustomPagination 
                                // totalEntries={total_entries} 
                                // pageSize={page_size} 
                                page={page} 
                                setPage={setPage} 
                                next_page={next_page} 
                                previous_page={previous_page}
                                pageNumbers={pageNumbers}
                            />
                            :
                            <CustomPagination 
                                // totalEntries={staff_total_entries} 
                                // pageSize={staff_page_size} 
                                page={staff_page} 
                                setPage={setStaffPage} 
                                next_page={staff_next_page} 
                                previous_page={staff_previous_page}
                                pageNumbers={pageNumbers}
                            />
                    }
                </div>

            </div>

        </div>
    );
};

export default CustomTable;