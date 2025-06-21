// 'use client'

// import { useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { getStudentsList } from "@/lib/api/studentRequests";
// import { getAuthStatus } from "@/lib/utils";
// import { StudentDataType } from "@/lib/types/studentTypes";



// export default function useStudents() {

//     const [students, setStudents] = useState<StudentDataType[]>([]); // Adjust type as needed


//     const [page, setPage] = useState<number>(1);
//     const [page_size] = useState<number>(15);
//     const [export_type, setExportType] = useState<string>("");
//     const [search, setSearch] = useState<string>("");
//     const [biometric_status, setBiometricStatus] = useState<string>("");
//     const [gender, setGender] = useState<string>("");
//     const [mode_of_entry, setModeOfEntry] = useState<string>("");
//     const [year, setYear] = useState<number>(0);
//     const [entry_session, setEntrySession] = useState<string>("");
//     const [faculty, setFaculty] = useState<string>("");
//     const [department, setDepartment] = useState<string>("");
//     const [programme_type, setProgrammeType] = useState<string>("");

//     const [ total_entries, setTotalEntries ] = useState<number>(0);
//     const [ next_page, setNextPage ] = useState<number | null>(0);
//     const [ previous_page, setPreviousPage ] = useState<number | null>(0);

//     const { data } = useQuery({
//         queryKey: ['get_students', page, page_size, export_type, search, biometric_status, gender, mode_of_entry, year, entry_session, faculty, department, programme_type, total_entries, next_page, previous_page],
//         queryFn: () =>
//             getStudentsList({
//                 params: {
//                     page,
//                     page_size,
//                     export_type,
//                     search,
//                     biometric_status,
//                     gender,
//                     mode_of_entry,
//                     year,
//                     entry_session,
//                     faculty,
//                     department,
//                     programme_type,
//                 }
//             }),
//         refetchOnWindowFocus: false,
//         refetchOnMount: true,
//         enabled: getAuthStatus(),
//     })

//     useEffect(() => {
//         if (data) {
//             // console.log("Students data: ", data.data?.data?.results)
//             setStudents(data.data?.data?.results)
//             setTotalEntries(data.data?.data?.total_entries)
//             setNextPage(data.data?.data?.next);
//             setPreviousPage(data.data?.data?.previous);
//         }
//     }, [ data ])

//     return {
//         students,
//         next_page,
//         previous_page,
//         total_entries,
//         page,
//         page_size,
//         setPage,

//         biometric_status,
//         setBiometricStatus,
//         faculty,
//         setFaculty,
//         department,
//         setDepartment,
//         search,
//         setSearch,
//         programme_type,
//         setProgrammeType,
//         year,
//         setYear,
//         mode_of_entry,
//         setModeOfEntry,
//         entry_session,
//         setEntrySession,
//         gender,
//         setGender,
//     };
// }