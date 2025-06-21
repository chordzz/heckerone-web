

import { StaffListParamsType } from "../types/staffTypes";
import axiosInstance, { handleApiError, handleApiSuccess } from "./axios";


export const getStaffList = async ({ params }: {params: StaffListParamsType}) => {

    const {
        page,
        page_size,
        export_type,
        search,
        biometric_status,
        gender,
        faculty,
        department,
    } = params

    try {
        
        const queryParams = [
            search ? `search=${encodeURIComponent(search)}` : '',
            biometric_status ? `biometric_status=${encodeURIComponent(biometric_status)}` : '',
            gender ? `gender=${encodeURIComponent(gender)}` : '',
            faculty ? `faculty=${encodeURIComponent(faculty)}` : '',
            department ? `department=${encodeURIComponent(department)}` : '',
            export_type ? `export_type=${encodeURIComponent(export_type)}` : '',
            page > 0 ? `page=${page}` : '',
            page_size > 0 ? `page_size=${page_size}` : ''
        ].filter(Boolean).join('&');  
        const response = await axiosInstance.get(`/accounts/staffs?${queryParams}`)
        
        return handleApiSuccess(response)
    } catch(error) {
        return handleApiError(error)
    }
}


export const getStaffById = async ({ id }: { id: string }) => {
    try {
        const response = await axiosInstance.get(`/account/staffs/${id}`)

        return handleApiSuccess(response)
    } catch(error) {
        return handleApiError(error)
    }
}


export const uploadStaff = async ({ fileUpload }: { fileUpload: FormData }) => {
    try {
        const response = await axiosInstance.post(
            '/accounts/staffs/',
            fileUpload
        )
        return handleApiSuccess(response)
    } catch(error) {
        return handleApiError(error)
    }
}



