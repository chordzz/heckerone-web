"use client"

import { StaffDataType } from "@/lib/types/staffTypes"
import { StudentDataType } from "@/lib/types/studentTypes"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export type BiodataStudent = {
    matric_no: string
    first_name: string
    middle_name: string
    biometrics_status: string
    gender: string
    mode_of_entry: string
    current_programme: string
    year: string
    entry_session: string
    status: string
    faculty: string
    department: string
    max_level: string
    programme_type: string
}

export const columnsStudent: ColumnDef<StudentDataType>[] = [
    {
        id: "sn",
        header: "S/N",
        cell: ({row}) => {
            return (
                Number(row.id) + 1
            )
        },
    },
    {
        accessorKey: "matric_no",
        header: "MATRIC",
    },
    {
        accessorKey: "first_name",
        header: "FIRST NAME",
    },
    {
        accessorKey: "middle_name",
        header: "MIDDLE NAME",
    },
    {
        accessorKey: "biometrics_status",
        header: "BIOMETRIC STATUS",
        cell: ({ row }) => {
            if (row.original.biometric_status === 'Available') {
                return (
                    <div className="rounded-[6px] text-xs font-bold py-2 px-3 text-[#03543F] bg-[#DEF7EC] w-fit">
                        <span>Available</span>
                    </div>
                )
            } else if (row.original.biometric_status === 'Unavailable') {
                return (
                    <div className="rounded-[6px] text-xs font-bold py-2 px-3 text-[#9B1C1C] bg-[#FDE8E8] w-fit">
                        <span>Unavailable</span>
                    </div>
                )
            }
        },
    },
    {
        accessorKey: "gender",
        header: "GENDER",
    },
    {
        accessorKey: "mode_of_entry",
        header: "MODE OF ENTRY",
    },
    {
        accessorKey: "current_programme",
        header: "CURRENT PROGRAMME",
    },
    {
        accessorKey: "year",
        header: "YEAR",
    },
    {
        accessorKey: "entry_session",
        header: "ENTRY SESSION",
    },
    {
        accessorKey: "status",
        header: "STATUS",
    },
    {
        accessorKey: "faculty",
        header: "FACULTY",
    },
    {
        accessorKey: "department",
        header: "DEPARTMENT",
    },
    {
        accessorKey: "max_level",
        header: "MAX LEVEL",
    },
    {
        accessorKey: "programme_type",
        header: "PROGRAMME TYPE",
    },
]


export type BiodataStaff = {
    staff_id: string
    title: string
    first_name: string
    last_name: string
    middle_name: string
    biometric_status: string
    gender: string
    designation: string
    status: string
    faculty: string
    department: string
}

export const columnsStaff: ColumnDef<StaffDataType>[] = [
    {
        id: "sn",
        header: "S/N",
        cell: ({ row }) => {
            return (
                Number(row.id) + 1
            )
        },
    },
    {
        accessorKey: "staff_id",
        header: "STAFF ID",
    },
    {
        accessorKey: "title",
        header: "TITLE",
    },
    {
        accessorKey: "first_name",
        header: "FIRST NAME",
    },
    {
        accessorKey: "last_name",
        header: "LAST NAME",
    },
    {
        accessorKey: "middle_name",
        header: "MIDDLE NAME",
    },
    {
        accessorKey: "biometric_status",
        header: "BIOMETRIC STATUS",
        cell: ({ row }) => {
            if (row.original.biometric_status === 'Available') {
                return (
                    <div className="rounded-[6px] text-xs font-bold py-2 px-3 text-[#03543F] bg-[#DEF7EC] w-fit">
                        <span>Available</span>
                    </div>
                )
            } else if (row.original.biometric_status === 'Unavailable') {
                return (
                    <div className="rounded-[6px] text-xs font-bold py-2 px-3 text-[#9B1C1C] bg-[#FDE8E8] w-fit">
                        <span>Unavailable</span>
                    </div>
                )
            }
        },
    },
    {
        accessorKey: "gender",
        header: "GENDER",
    },
    {
        accessorKey: "designation",
        header: "DESIGNATION",
    },
    {
        accessorKey: "status",
        header: "STATUS",
    },
    {
        accessorKey: "faculty",
        header: "FACULTY",
    },
    {
        accessorKey: "department",
        header: "DEPARTMENT",
    },
]
