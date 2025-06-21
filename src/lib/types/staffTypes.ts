

export type StaffDataType = {
    user_uid: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    department: string;
    faculty: string;
    biometric_status: string;
    restored_at: string | null;
    uid: string;
    gender: string;
    status: string;
    title: string;
    staff_id: string;
    designation: string;
}

export type StaffListParamsType = {
    page: number;
    page_size: number;
    export_type: string;
    search: string;
    biometric_status: string;
    gender: string;
    faculty: string;
    department: string;
}