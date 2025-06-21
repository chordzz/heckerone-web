

import { StudentListParamsType } from "../types/studentTypes";
import axiosInstance, { handleApiError, handleApiSuccess } from "./axios";


export const getStudentsList = async ({ params }: {params: StudentListParamsType}) => {

    const {
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
    } = params

    try {
        
        const queryParams = [
            search ? `search=${encodeURIComponent(search)}` : '',
            biometric_status ? `biometric_status=${encodeURIComponent(biometric_status)}` : '',
            gender ? `gender=${encodeURIComponent(gender)}` : '',
            mode_of_entry ? `mode_of_entry=${encodeURIComponent(mode_of_entry)}` : '',
            year ? `year=${encodeURIComponent(year)}` : '',
            entry_session ? `entry_session=${encodeURIComponent(entry_session)}` : '',
            faculty ? `faculty=${encodeURIComponent(faculty)}` : '',
            department ? `department=${encodeURIComponent(department)}` : '',
            programme_type ? `programme_type=${encodeURIComponent(programme_type)}` : '',
            export_type ? `export=${encodeURIComponent(export_type)}` : '',
            page > 0 ? `page=${page}` : '',
            page_size > 0 ? `page_size=${page_size}` : ''
        ].filter(Boolean).join('&');  
        const response = await axiosInstance.get(`/accounts/students?${queryParams}`)
        
        return handleApiSuccess(response)
    } catch(error) {
        return handleApiError(error)
    }
}


export const getStudentById = async ({ id }: { id: string }) => {
    try {
        const response = await axiosInstance.get(`/account/students/${id}`)

        return handleApiSuccess(response)
    } catch(error) {
        return handleApiError(error)
    }
}


export const uploadStudents = async ({ fileUpload }: { fileUpload: FormData }) => {
    try {
        const response = await axiosInstance.post(
            '/accounts/students/',
            fileUpload
        )
        return handleApiSuccess(response)
    } catch(error) {
        return handleApiError(error)
    }
}



