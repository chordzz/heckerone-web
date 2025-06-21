'use client'

import { getStaffList } from "@/lib/api/staffRequests";
import { StaffDataType } from "@/lib/types/staffTypes";
import { getAuthStatus } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

type StaffContextType = {
    staff: StaffDataType[];
    setStaff: React.Dispatch<React.SetStateAction<StaffDataType[]>>;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    page_size: number;
    setPageSize: React.Dispatch<React.SetStateAction<number>>;
    export_type: string;
    setExportType: React.Dispatch<React.SetStateAction<string>>;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    biometric_status: string;
    setBiometricStatus: React.Dispatch<React.SetStateAction<string>>;
    gender: string;
    setGender: React.Dispatch<React.SetStateAction<string>>;
    faculty: string;
    setFaculty: React.Dispatch<React.SetStateAction<string>>;
    department: string;
    setDepartment: React.Dispatch<React.SetStateAction<string>>;
    total_entries: number;
    setTotalEntries: React.Dispatch<React.SetStateAction<number>>;
    next_page: number | null;
    setNextPage: React.Dispatch<React.SetStateAction<number | null>>;
    previous_page: number | null;
    setPreviousPage: React.Dispatch<React.SetStateAction<number | null>>;
    refetch: () => void;
};

export const StaffContext = createContext({} as StaffContextType);

export const StaffContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [staff, setStaff] = useState<StaffDataType[]>([]);
    const [page, setPage] = useState<number>(1);
    const [page_size, setPageSize] = useState<number>(15);
    const [export_type, setExportType] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [biometric_status, setBiometricStatus] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [faculty, setFaculty] = useState<string>("");
    const [department, setDepartment] = useState<string>("");

    const [total_entries, setTotalEntries] = useState<number>(0);
    const [next_page, setNextPage] = useState<number | null>(0);
    const [previous_page, setPreviousPage] = useState<number | null>(0);

    const { data, refetch } = useQuery({
        queryKey: [
            'get_staff',
            page,
            page_size,
            export_type,
            search,
            biometric_status,
            gender,
            faculty,
            department,
            total_entries,
            next_page,
            previous_page
        ],
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
    });

    useEffect(() => {
        if (data) {
            setStaff(data.data?.data?.results);
            setTotalEntries(data.data?.data?.count);
            setNextPage(data.data?.data?.next);
            setPreviousPage(data.data?.data?.previous);
        }
    }, [data]);

    return (
        <StaffContext.Provider value={{
            staff,
            setStaff,
            page,
            setPage,
            page_size,
            setPageSize,
            export_type,
            setExportType,
            search,
            setSearch,
            biometric_status,
            setBiometricStatus,
            gender,
            setGender,
            faculty,
            setFaculty,
            department,
            setDepartment,
            total_entries,
            setTotalEntries,
            next_page,
            setNextPage,
            previous_page,
            setPreviousPage,
            refetch
        }}>
            {children}
        </StaffContext.Provider>
    );
};

export const useStaff = () => {
    const context = useContext(StaffContext);
    if (!context) {
        throw new Error("useStaff must be used within StaffContextProvider");
    }
    return context;
};