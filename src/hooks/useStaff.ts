'use client'

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getStaffList } from "@/lib/api/staffRequests";
import { getAuthStatus } from "@/lib/utils";
import { StaffDataType } from "@/lib/types/staffTypes";



export default function useStaff() {

    const [staff, setStaff] = useState<StaffDataType[]>([]); // Adjust type as needed


    const [page, setPage] = useState<number>(1);
    const [page_size, setPageSize] = useState<number>(15);
    const [export_type, setExportType] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [biometric_status, setBiometricStatus] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [faculty, setFaculty] = useState<string>("");
    const [department, setDepartment] = useState<string>("");

    const [ total_entries, setTotalEntries ] = useState<number>(0);
    const [ next_page, setNextPage ] = useState<number | null>(0);
    const [ previous_page, setPreviousPage ] = useState<number | null>(0);

    const { data } = useQuery({
        queryKey: ['get_students', page, page_size, export_type, search, biometric_status, gender, faculty, department, total_entries, next_page, previous_page],
        queryFn: () =>
            getStaffList({
                params: {
                    page,
                    page_size,
                    export_type,
                    search,
                    biometric_status,
                    gender,
                    faculty,
                    department,
                }
            }),
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        enabled: getAuthStatus(),
    })

    useEffect(() => {
        if (data) {
            // console.log("Students data: ", data.data?.data?.results)
            setStaff(data.data?.data?.results)
            setTotalEntries(data.data?.data?.total_entries)
            setNextPage(data.data?.data?.next);
            setPreviousPage(data.data?.data?.previous);
        }
    }, [ data ])

    return {
        staff,
        next_page,
        previous_page,
        total_entries,
        page,
        page_size,
        setPage,
    };
}