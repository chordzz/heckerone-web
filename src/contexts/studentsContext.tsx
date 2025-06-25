'use client'

import { getStudentsList } from "@/lib/api/studentRequests";
import { StudentDataType } from "@/lib/types/studentTypes";
import { getAuthStatus } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useUser } from "./userContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


type StudentsContextType = {
    students: StudentDataType[];
    setStudents: React.Dispatch<React.SetStateAction<StudentDataType[]>>;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    page_size: number;
    export_type: string;
    setExportType: React.Dispatch<React.SetStateAction<string>>;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    biometric_status: string;
    setBiometricStatus: React.Dispatch<React.SetStateAction<string>>;
    gender: string;
    setGender: React.Dispatch<React.SetStateAction<string>>;
    mode_of_entry: string;
    setModeOfEntry: React.Dispatch<React.SetStateAction<string>>;
    year: number;
    setYear: React.Dispatch<React.SetStateAction<number>>;
    entry_session: string;
    setEntrySession: React.Dispatch<React.SetStateAction<string>>;
    faculty: string;
    setFaculty: React.Dispatch<React.SetStateAction<string>>;
    department: string;
    setDepartment: React.Dispatch<React.SetStateAction<string>>;
    programme_type: string;
    setProgrammeType: React.Dispatch<React.SetStateAction<string>>;
    total_entries: number;
    setTotalEntries: React.Dispatch<React.SetStateAction<number>>;
    next_page: number | null;
    setNextPage: React.Dispatch<React.SetStateAction<number | null>>;
    previous_page: number | null;
    setPreviousPage: React.Dispatch<React.SetStateAction<number | null>>;
    refetch: () => void;
};

export const StudentsContext = createContext({} as StudentsContextType)

export const StudentsContextProvider = ({ children }: { children: React.ReactNode }) => {

    const router = useRouter()
    const { isLoaded, loggedIn } = useUser()

    const [ students, setStudents ] = useState<StudentDataType[]>([])

    const [page, setPage] = useState<number>(1);
    const [page_size] = useState<number>(15);
    const [export_type, setExportType] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [biometric_status, setBiometricStatus] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [mode_of_entry, setModeOfEntry] = useState<string>("");
    const [year, setYear] = useState<number>(0);
    const [entry_session, setEntrySession] = useState<string>("");
    const [faculty, setFaculty] = useState<string>("");
    const [department, setDepartment] = useState<string>("");
    const [programme_type, setProgrammeType] = useState<string>("");

    const [ total_entries, setTotalEntries ] = useState<number>(0);
    const [ next_page, setNextPage ] = useState<number | null>(0);
    const [ previous_page, setPreviousPage ] = useState<number | null>(0);

    const { data, refetch, isError, error } = useQuery({
        queryKey: ['get_students', page, page_size, export_type, search, biometric_status, gender, mode_of_entry, year, entry_session, faculty, department, programme_type, total_entries, next_page, previous_page],
        queryFn: () =>
            getStudentsList({
                params: {
                    page,
                    page_size,
                    export_type,
                    search,
                    biometric_status,
                    gender,
                    mode_of_entry,
                    year,
                    entry_session,
                    faculty,
                    department,
                    programme_type,
                }
            }),
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        enabled: getAuthStatus() || (isLoaded && loggedIn),
    })

    useEffect(() => {
        if (data) {
            // console.log("Students data: ", data.data?.data?.results)
            setStudents(data.data?.data?.results)
            setTotalEntries(data.data?.data?.count)
            setNextPage(data.data?.data?.next);
            setPreviousPage(data.data?.data?.previous);
        }
    }, [ data ])

    useEffect(() => {
        if (isError && error) {
            // console.error("Error fetching students data: ", error);
            const err = error as { status?: number };
            if (err?.status === 401) {
                toast.error("Unauthorized access. Please log in again.");
                localStorage.removeItem('heckerOneAccessToken');
                // localStorage.removeItem('heckerOneUserLoggedIn');
                localStorage.setItem('heckerOneUserLoggedIn', 'false');
                router.push('/');
            }
            else if (err?.status === 404) {
                toast.error("No students found.");
            } else {
                toast.error("An error occurred while fetching students data.");
            }
        }
    }, [ isError, error ])
    

    // const { data } = useQuery({
    //     queryKey: ['get_students'],
    //     queryFn: getStudentsList,
    //     refetchOnWindowFocus: false,
    //     refetchOnMount: true,
    //     enabled: getAuthStatus(),
    // })

    // useEffect(() => {
    //     if (data) {
    //         // console.log("Students data: ", data.data?.data?.results)
    //         setStudents(data.data?.data?.results)
    //     }
    // }, [ data ])

    const values = useMemo(() => {
        return {
            students,
            setStudents,
            page,
            setPage,
            page_size,
            export_type,
            setExportType,
            search,
            setSearch,
            biometric_status,
            setBiometricStatus,
            gender,
            setGender,
            mode_of_entry,
            setModeOfEntry,
            year,
            setYear,
            entry_session,
            setEntrySession,
            faculty,
            setFaculty,
            department,
            setDepartment,
            programme_type,
            setProgrammeType,
            total_entries,
            setTotalEntries,
            next_page,
            setNextPage,
            previous_page,
            setPreviousPage,
            refetch
        }
    }, [
        students,
        page,
        page_size,
        export_type,
        search,
        biometric_status,
        gender,
        mode_of_entry,
        year,
        entry_session,
        faculty,
        department,
        programme_type,
        total_entries,
        next_page,
        previous_page,
        refetch
    ])
    return (
        <StudentsContext.Provider value={values}>
            {children}
        </StudentsContext.Provider>
    )
}
export const useStudents = () => {
    const context = useContext(StudentsContext)

    if (!context) {
        throw new Error("useStudent must be used within StudentContextProvider")
    }
    return context
}
