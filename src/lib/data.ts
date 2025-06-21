type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}
  
export const payments: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "example@gmail.com",
    },
]


type BiodataStudent = {
    matric_no: string
    first_name: string
    middle_name: string
    biometrics_status: string
    gender: string
    mode_of_entry: string
    current_programme: string
    year: string
    entry_session: string
    status: string
    faculty: string
    department: string
    max_level: string
    programme_type: string
}

// export const biodataStudents: BiodataStudent[] = []

export const biodataStudents: BiodataStudent[] = [
    {
        matric_no: "123456",
        first_name: "John",
        middle_name: "Doe",
        biometrics_status: "available",
        gender: "male",
        mode_of_entry: "UTME",
        current_programme: "Computer Science",
        year: "3",
        entry_session: "2019/2020",
        status: "active",
        faculty: "Science",
        department: "Computer Science",
        max_level: "400",
        programme_type: "Full-time"
    },
    {
        matric_no: "654321",
        first_name: "Jane",
        middle_name: "Smith",
        biometrics_status: "unavailable",
        gender: "female",
        mode_of_entry: "Direct Entry",
        current_programme: "Biochemistry",
        year: "2",
        entry_session: "2020/2021",
        status: "active",
        faculty: "Science",
        department: "Biochemistry",
        max_level: "300",
        programme_type: "Full-time"
    },
    {
        matric_no: "112233",
        first_name: "Alice",
        middle_name: "Johnson",
        biometrics_status: "available",
        gender: "female",
        mode_of_entry: "UTME",
        current_programme: "Mathematics",
        year: "4",
        entry_session: "2018/2019",
        status: "active",
        faculty: "Science",
        department: "Mathematics",
        max_level: "400",
        programme_type: "Full-time"
    },
    {
        matric_no: "445566",
        first_name: "Bob",
        middle_name: "Brown",
        biometrics_status: "available",
        gender: "male",
        mode_of_entry: "UTME",
        current_programme: "Physics",
        year: "1",
        entry_session: "2021/2022",
        status: "active",
        faculty: "Science",
        department: "Physics",
        max_level: "400",
        programme_type: "Full-time"
    },
    {
        matric_no: "778899",
        first_name: "Charlie",
        middle_name: "Davis",
        biometrics_status: "unavailable",
        gender: "male",
        mode_of_entry: "Direct Entry",
        current_programme: "Chemistry",
        year: "2",
        entry_session: "2020/2021",
        status: "active",
        faculty: "Science",
        department: "Chemistry",
        max_level: "300",
        programme_type: "Full-time"
    }
]
  

type BiodataStaff = {
    staff_id: string
    title: string
    first_name: string
    last_name: string
    middle_name: string
    biometric_status: string
    gender: string
    designation: string
    status: string
    faculty: string
    department: string
}

// export const biodataStaffs: BiodataStaff[] = []

export const biodataStaffs: BiodataStaff[] = [
    {
        staff_id: "S12345",
        title: "Dr.",
        first_name: "Emily",
        last_name: "Clark",
        middle_name: "Rose",
        biometric_status: "available",
        gender: "female",
        designation: "Senior Lecturer",
        status: "active",
        faculty: "Science",
        department: "Biology"
    },
    {
        staff_id: "S67890",
        title: "Prof.",
        first_name: "James",
        last_name: "Smith",
        middle_name: "Edward",
        biometric_status: "available",
        gender: "male",
        designation: "Professor",
        status: "active",
        faculty: "Engineering",
        department: "Mechanical Engineering"
    },
    {
        staff_id: "S11223",
        title: "Mr.",
        first_name: "Robert",
        last_name: "Johnson",
        middle_name: "Michael",
        biometric_status: "unavailable",
        gender: "male",
        designation: "Lecturer",
        status: "active",
        faculty: "Arts",
        department: "History"
    },
    {
        staff_id: "S44556",
        title: "Mrs.",
        first_name: "Linda",
        last_name: "Williams",
        middle_name: "Anne",
        biometric_status: "available",
        gender: "female",
        designation: "Assistant Lecturer",
        status: "active",
        faculty: "Business",
        department: "Accounting"
    },
    {
        staff_id: "S77889",
        title: "Dr.",
        first_name: "David",
        last_name: "Brown",
        middle_name: "Lee",
        biometric_status: "unavailable",
        gender: "male",
        designation: "Senior Lecturer",
        status: "active",
        faculty: "Science",
        department: "Chemistry"
    }
]