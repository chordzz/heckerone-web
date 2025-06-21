

import axiosInstance, { handleApiError, handleApiSuccess } from "./axios";
import { loginDetailsType } from "../types/userTypes";


export const userLogin = async (loginDetails: loginDetailsType) => {
    try {
        const response = await axiosInstance.post(
            '/auth/login',
            loginDetails
        )
        return handleApiSuccess(response)
    } catch(error) {
        throw await handleApiError(error)
    }
}