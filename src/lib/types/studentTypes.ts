

export type StudentDataType = {
    user_uid: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    department: string;
    faculty: string;
    biometric_status: string;
    max_level: number;
    restored_at: string | null;
    uid: string;
    gender: string;
    status: string;
    matric_no: string;
    mode_of_entry: string;
    year: number;
    entry_session: string;
    current_programme: string;
    programme_type: string;
}

export type StudentListParamsType = {
    page: number;
    page_size: number;
    export_type: string;
    search: string;
    biometric_status: string;
    gender: string;
    mode_of_entry: string;
    year: number;
    entry_session: string;
    faculty: string;
    department: string;
    programme_type: string;
}