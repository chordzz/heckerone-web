
import axiosInstance, { handleApiError, handleApiSuccess } from "./axios";

export const getFacultiesList = async () => {
    try {
        const response = await axiosInstance.get('/accounts/options/faculties');
        return handleApiSuccess(response);
    } catch (error) {
        return handleApiError(error);
    }
}

export const getDepartmentsList = async ({ faculty }: { faculty: string }) => {
    try {
        const response = await axiosInstance.get(`/accounts/options/departments?faculty=${encodeURIComponent(faculty)}`);
        return handleApiSuccess(response);
    } catch (error) {
        return handleApiError(error);
    }
}

export const getSessionsList = async () => {
    try {
        const response = await axiosInstance.get('/accounts/options/sessions');
        return handleApiSuccess(response);
    } catch (error) {
        return handleApiError(error);
    }
}