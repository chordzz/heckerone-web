'use client'

import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import useFilter from "@/hooks/useFilter";
// import useStudents from "@/hooks/useStudents";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useStudents } from "@/contexts/studentsContext";
import { useStaff } from "@/contexts/staffContext";


type FilterListProps = {
    mode: string;
}

function FilterList({ mode }: FilterListProps) {
    const {
        faculties,
        departments,
        sessions,
        setFaculty: reqSetFaculty
    } = useFilter()

    // Get setters and current values from useStudents
    const {
        biometric_status,
        gender,
        mode_of_entry,
        year,
        entry_session,
        faculty,
        department,
        programme_type,
        setBiometricStatus,
        setGender,
        setModeOfEntry,
        setYear,
        setEntrySession,
        setFaculty,
        setDepartment,
        setProgrammeType,
        // refetch
    } = useStudents();

    const {
        setBiometricStatus: setStaffBiometricStatus,
        setGender: setStaffGender,
        setFaculty: setStaffFaculty,
        setDepartment: setStaffDepartment,
        biometric_status: staffBiometricStatus,
        gender: staffGender,
        faculty: staffFaculty,
        department: staffDepartment,
    } = useStaff()

    const [localFilters, setLocalFilters] = useState(() => {
        if (mode === 'students') {
            return {
                biometric_status: biometric_status || 'Any',
                gender: gender || 'Any',
                mode_of_entry: mode_of_entry || 'Any',
                year: String(year) === '0' ? 'Any' : String(year),
                entry_session: entry_session || 'Any',
                faculty: faculty || 'Any',
                department: department || 'Any',
                programme_type: programme_type || 'Any',
            };
        } else if (mode === 'staff') {
            return {
                biometric_status: staffBiometricStatus || 'Any',
                gender: staffGender || 'Any',
                mode_of_entry: 'Any',
                year: 'Any',
                entry_session: 'Any',
                faculty: staffFaculty || 'Any',
                department: staffDepartment || 'Any',
                programme_type: 'Any',
            };
        } else {
            return {
                biometric_status: 'Any',
                gender: 'Any',
                mode_of_entry: 'Any',
                year: 'Any',
                entry_session: 'Any',
                faculty: 'Any',
                department: 'Any',
                programme_type: 'Any',
            };
        }
    });

    // Update local filter value
    const handleFilterValueChange = (
        value: string,
        filterType: string
    ) => {
        setLocalFilters(prev => ({
            ...prev,
            [filterType]: value
        }));

        if (filterType === 'faculty') {
            reqSetFaculty(value);
        }
    };

    // Map filter config to local state
    const studentFilters = [
        {
            label: 'Biometric Status',
            key: 'biometric_status',
            value: localFilters.biometric_status,
            options: ['Any', 'Available', 'Unavailable'],
        },
        {
            label: 'Gender',
            key: 'gender',
            value: localFilters.gender,
            options: ['Any', 'Male', 'Female'],
        },
        {
            label: 'Mode of Entry',
            key: 'mode_of_entry',
            value: localFilters.mode_of_entry,
            options: ['Any', 'Direct', 'UTME'],
        },
        {
            label: 'Year',
            key: 'year',
            value: localFilters.year,
            options: [1, 2, 3, 4, 5, 6],
        },
        {
            label: 'Entry Session',
            key: 'entry_session',
            value: localFilters.entry_session,
            options: sessions,
        },
        {
            label: 'Faculty',
            key: 'faculty',
            value: localFilters.faculty,
            options: faculties,
        },
        {
            label: 'Department',
            key: 'department',
            value: localFilters.department,
            options: departments,
        },
        {
            label: 'Programme Type',
            key: 'programme_type',
            value: localFilters.programme_type,
            options: ['Any', 'Undergraduate', 'Postgraduate'],
        }
    ];

    const staffFilters = [
        {
            label: 'Biometric Status',
            key: 'biometric_status',
            value: localFilters.biometric_status,
            options: ['Any', 'Available', 'Unavailable'],
        },
        {
            label: 'Gender',
            key: 'gender',
            value: localFilters.gender,
            options: ['Any', 'Male', 'Female'],
        },
        {
            label: 'Faculty',
            key: 'faculty',
            value: localFilters.faculty,
            options: faculties,
        },
        {
            label: 'Department',
            key: 'department',
            value: localFilters.department,
            options: departments,
        },
    ];

    // Apply filters to global state (triggers refetch)
    const handleApply = () => {
        if (mode === 'students') {
            setBiometricStatus(localFilters.biometric_status === 'Any' ? '' : localFilters.biometric_status);
            setGender(localFilters.gender === 'Any' ? '' : localFilters.gender);
            setModeOfEntry(localFilters.mode_of_entry === 'Any' ? '' : localFilters.mode_of_entry);
            setYear(localFilters.year === 'Any' ? 0 : Number(localFilters.year));
            setEntrySession(localFilters.entry_session === 'Any' ? '' : localFilters.entry_session);
            setFaculty(localFilters.faculty === 'Any' ? '' : localFilters.faculty);
            setDepartment(localFilters.department === 'Any' ? '' : localFilters.department);
            setProgrammeType(localFilters.programme_type === 'Any' ? '' : localFilters.programme_type);
        } else if (mode === 'staff') {
            setStaffBiometricStatus(localFilters.biometric_status === 'Any' ? '' : localFilters.biometric_status);
            setStaffGender(localFilters.gender === 'Any' ? '' : localFilters.gender);
            setStaffFaculty(localFilters.faculty === 'Any' ? '' : localFilters.faculty);
            setStaffDepartment(localFilters.department === 'Any' ? '' : localFilters.department);
        }
    };

    // Reset all filters
    const handleReset = () => {
        setLocalFilters({
            biometric_status: 'Any',
            gender: 'Any',
            mode_of_entry: 'Any',
            year: 'Any',
            entry_session: 'Any',
            faculty: 'Any',
            department: 'Any',
            programme_type: 'Any',
        });

        if (mode === 'students') {
            setBiometricStatus('');
            setGender('');
            setModeOfEntry('');
            setYear(0);
            setEntrySession('');
            setFaculty('');
            setDepartment('');
            setProgrammeType('');
        } else if (mode === 'staff') {
            setStaffBiometricStatus('');
            setStaffGender('');
            setStaffFaculty('');
            setStaffDepartment('');
        }
        // refetch()
    };

    useEffect(() => {
        if (faculty) {
            reqSetFaculty(faculty);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (mode === 'students') {
            setLocalFilters({
                biometric_status: biometric_status || 'Any',
                gender: gender || 'Any',
                mode_of_entry: mode_of_entry || 'Any',
                year: String(year) === '0' ? 'Any' : String(year),
                entry_session: entry_session || 'Any',
                faculty: faculty || 'Any',
                department: department || 'Any',
                programme_type: programme_type || 'Any',
            });
        } else if (mode === 'staff') {
            setLocalFilters({
                biometric_status: staffBiometricStatus || 'Any',
                gender: staffGender || 'Any',
                mode_of_entry: 'Any',
                year: 'Any',
                entry_session: 'Any',
                faculty: staffFaculty || 'Any',
                department: staffDepartment || 'Any',
                programme_type: 'Any',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode]);

    return (
        <div className="flex flex-col">
            {(mode === 'students' ? studentFilters : staffFilters).map((filter, idx) => (
            <Popover key={`${idx}-${filter.label}`}>
                <PopoverTrigger  
                    className="text-left"
                    disabled={
                        filter.key === 'department' &&
                        (!localFilters.faculty || !reqSetFaculty)
                    }
                >
                    <div className="py-5 px-3 flex justify-between items-center hover:bg-[#F4F4F5] cursor-pointer" key={`${idx}-${filter.label}`}>
                        <span className="w-[50%] text-[#0F172A] text-sm leading-[150%]">
                        {filter.label}
                        </span>
                        <div className="w-[48%] flex items-center</div> gap-1">
                        <span className="text-[#71717A] text-xs font-light w-[85%] text-right capitalize">
                            {
                            !filter.value
                                ? 'Any'
                                : String(filter.value).length > 13
                                ? `${String(filter.value).slice(0, 13)}...`
                                : String(filter.value)
                            }
                        </span>
                        <ChevronRight className="text-black" />
                        </div>
                    </div>
                </PopoverTrigger>
                <PopoverContent side="right">
                    <RadioGroup
                        defaultValue="Any"
                        value={filter.value}
                        onValueChange={(e) => handleFilterValueChange(e, filter.key)}
                    >
                        {filter?.options?.map((option, idx) => (
                        <div className="flex items-center space-x-2" key={`option-${filter.label}-${idx}`}>
                            <RadioGroupItem
                            value={String(option)}
                            id={`option-${filter.label}-${idx}`}
                            className="data-[state=checked]:border-green-500"
                            />
                            <Label htmlFor={`option-${filter.label}-${idx}`} className="capitalize">{option}</Label>
                        </div>
                        ))}
                    </RadioGroup>
                </PopoverContent>
            </Popover>
            ))}

            <div className="py-5 px-3 flex justify-end items-center border-t border-[#E7E5E4] gap-4">
            <button
                className="text-[#1F2A37] text-xs font-medium cursor-pointer hover:scale-105"
                onClick={handleReset}
            >
                Reset All
            </button>
            <button
                className="text-white bg-[#0D9488] text-xs font-medium py-2 px-4 rounded-[8px] cursor-pointer hover:scale-105"
                onClick={handleApply}
            >
                Apply
            </button>
            </div>
        </div>
    );
}

export default FilterList;

// const [biometricStatus, setBiometricStatus] = useState<string>('any');
    // const [gender, setGender] = useState<string>('any');
    // const [modeOfEntry, setModeOfEntry] = useState<string>('any');
    // const [year, setYear] = useState<string>('any');
    // const [entrySession, setEntrySession] = useState<string>('any');
    // const [faculty, setFaculty] = useState<string>('faculty of science');
    // const [department, setDepartment] = useState<string>('any');
    // const [programmeType, setProgrammeType] = useState<string>('any');