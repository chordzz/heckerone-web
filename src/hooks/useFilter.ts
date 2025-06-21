'use client'

import { getDepartmentsList, getFacultiesList, getSessionsList } from "@/lib/api/filterRequests";
import { getAuthStatus } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";




export default function useFilter() {

    const [ faculties, setFaculties ] = useState<string[] | null>(null);
    const [ departments, setDepartments ] = useState<string[] | null>(null);
    const [ sessions, setSessions ] = useState<string[] | null>(null);

    const [ faculty, setFaculty ] = useState<string>("");
    // const [ department, setDepartment ] = useState<string>("");
    // const [ session, setSession ] = useState<string>("");


    const { data: facultiesData, isError, error } = useQuery({
        queryKey: ['get_faculties'],
        queryFn: getFacultiesList,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        // enabled: getAuthStatus(),
    })

    const { data: departmentsData } = useQuery({
        queryKey: ['get_departments', faculty],
        queryFn: () => getDepartmentsList({ faculty }),
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        // enabled: getAuthStatus() && !!faculty,
        enabled: !!faculty,
    })

    const { data: sessionsData } = useQuery({
        queryKey: ['get_sessions'],
        queryFn: () => getSessionsList(),
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        // enabled: getAuthStatus(),
    })

    useEffect(() => {
        if (facultiesData) {
            setFaculties(facultiesData.data?.data);
        }
    }, [ facultiesData ])

    useEffect(() => {
        if (departmentsData) {
            setDepartments(departmentsData.data?.data);
        }
    }, [ departmentsData ])

    useEffect(() => {
        if (sessionsData) {
            setSessions(sessionsData.data?.data);
        }
    }, [ sessionsData ])

    useEffect(() => {
        if (isError) {
            console.log(error)
        }
    }, [ isError, error ])

    return {
        faculties,
        departments,
        sessions,
        faculty,
        // department,
        // session,
        setFaculties,
        setDepartments,
        setSessions,
        setFaculty,
        // setDepartment,  
    }
}