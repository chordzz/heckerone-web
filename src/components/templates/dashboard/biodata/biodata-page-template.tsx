'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import CustomTable from "@/components/common/table/custom-table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { useUser } from "@/contexts/userContext";

import { Search, X } from "lucide-react";
import upload from '@/../public/svgs/upload.svg'
import { uploadStudents } from "@/lib/api/studentRequests";
import { apiErrResp } from "@/lib/types/apiResponseTypes";
import Loader from "@/components/common/loader/loader";
import { uploadStaff } from "@/lib/api/staffRequests";


function BiodataPageTemplate() {
    const [ mode, setMode ] = useState('students')
    const [openImportDialog, setOpenImportDialog] = useState(false)
    const [ uploadFile, setUploadFile ] = useState<File | undefined | null>()

    const { loggedIn, isLoaded } = useUser()

    const router = useRouter()

    const studentImportMutation = useMutation({
        mutationKey: ['studentImportData'],
        mutationFn: uploadStudents,
        onSuccess: () => {
            // console.log("onSuccess: ", data)
            setUploadFile(null)
            setOpenImportDialog(false)
            toast.success("Data imported successfully")
        },
        onError: (err: apiErrResp) => {
            toast.error(err.error)
        }
    })

    const staffImportMutation = useMutation({
        mutationKey: ['staffImportData'],
        mutationFn: uploadStaff,
        onSuccess: () => {
            // console.log("onSuccess: ", data)
            setUploadFile(null)
            setOpenImportDialog(false)
            toast.success("Data imported successfully")
        },
        onError: (err: apiErrResp) => {
            toast.error(err.error)
        }
    })



    useEffect( () => {
        if(!loggedIn && isLoaded) {
            router.push('/')
        }
    }, [loggedIn, isLoaded])

    const handleImportSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // console.log(e)
        if (uploadFile) {
            const formData = new FormData();
            formData.append('file', uploadFile);


            if (mode === 'students') {
                studentImportMutation.mutate({
                    fileUpload: formData
                })
            } else {
                staffImportMutation.mutate({
                    fileUpload: formData
                })
            }
        } else {
            alert('Please select a file to upload.');
        }
    }

    useEffect( () => {
        if(uploadFile) console.log(uploadFile)
    }, [ uploadFile ])

    return(
        <main className="content-wrapper bg-[#FAFAFA] py-5 h-full">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">
                    Staff & Student Data
                </h1>
                <Button variant={'outline'} className='border border-[#3F3F46] text-mainGrayText text-[16px] font-bold py-6 cursor-pointer' onClick={() => setOpenImportDialog(true)}>Import Data</Button>
            </div>

            <div className="flex items-center gap-6 my-6">
                <div 
                    className={`text-sm font-medium cursor-pointer ${mode === 'students' ? 'text-[#52525B]' : 'text-white rounded-[6px] py-3 px-4 bg-navTeal'}`}
                    onClick={() => setMode('staff')}
                >
                    <span>Staff accounts</span>
                </div>

                <div 
                    className={`text-sm font-medium cursor-pointer ${mode === 'students' ? 'text-white rounded-[6px] py-3 px-4 bg-navTeal' : 'text-[#52525B]'}`}
                    onClick={() => setMode('students')}
                >
                    <span>Students accounts</span>
                </div>
            </div>

            <Dialog open={openImportDialog} onOpenChange={(value) => setOpenImportDialog(value)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-medium border-b border-[#E7E5E4] pb-4">Import student & staff data</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleImportSubmit} className="border-dotted border-2 border-[#E5E7EB] rounded-[8px] flex items-center justify-center w-full h-[228px] bg-[#F9FAFB]">

                        {
                            uploadFile ? (
                                <div className="w-[90%]">
                                    <div className=" flex items-center justify-between pl-4 border-l-4 border-navTeal">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-xl font-semibold">
                                                {uploadFile.name}
                                            </span>
                                            <span className="text-sm">
                                                {uploadFile.size > 1024 * 1024 * 30
                                                    ? 'File size exceeds 30MB'
                                                    : uploadFile.size > 1024 * 1024
                                                        ? `${(uploadFile.size / (1024 * 1024)).toFixed(2)} MB`
                                                        : `${(uploadFile.size / 1024).toFixed(2)} KB`
                                                }
                                            </span>
                                        </div>
                                        <X className="text-red-500 cursor-pointer" onClick={() => setUploadFile(null)}/>
                                    </div>
                                    <Button type="submit" variant={'outline'} className='text-white text-[16px] font-bold py-6 cursor-pointer mt-6 bg-navTeal w-full'>
                                        {
                                            studentImportMutation.isPending ? (
                                                <Loader />
                                            ) : 'Submit'
                                        }
                                    </Button>
                                </div>
                            ) : (

                                <label htmlFor="uploadSheet" className="w-full h-full flex flex-col items-center justify-center cursor-pointer text-center">
                                    <input
                                        id="uploadSheet"
                                        type="file"
                                        accept=".xls,.xlsx"
                                        className="hidden"
                                        onChange={e => {
                                            const file = e.target.files?.[0];
                                            setUploadFile(file);
                                        }}
                                        // You can add onChange handler here if needed
                                    />
                                    <div className="flex flex-col items-center gap-1 pointer-events-none">
                                        <Image src={upload} alt="upload" />
                                        <p className="text-[#71717A] text-sm"><span className="font-bold">Click to upload</span></p>
                                        <p className="text-[#71717A] text-xs">
                                            Supported files: <span className="font-bold">.xls, .xlsx</span> Max. File Size: <span className="font-bold">30MB</span>
                                        </p>
                                    </div>
                                    <span className="flex items-center justify-center gap-2 bg-mainGreen my-5 px-4 py-2 rounded text-white font-medium pointer-events-none">
                                        <Search />
                                        <span>Browse File</span>
                                    </span>
                                </label>
                            )
                        }


                        {/* <div className="text-center">
                            <div className="flex flex-col items-center gap-1">
                                <Image src={upload} alt="upload" />
                                <p className="text-[#71717A] text-sm"><span className="font-bold">Click to upload</span> or drag and drop</p>
                                <p className="text-[#71717A] text-xs">Supported files: <span className="font-bold">.xlx</span> Max. File Size: <span className="font-bold">30MB</span></p>
                            </div>

                            <Button className="bg-mainGreen my-5">
                                <Search />
                                <span>Browse File</span>
                            </Button>
                        </div> */}
                    </form>
                </DialogContent>
            </Dialog>

            <CustomTable mode={mode} />

        </main>
    )
}

export default BiodataPageTemplate