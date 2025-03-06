'use client'

import { useState } from "react";
import CustomTable from "@/components/common/table/custom-table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import upload from '@/../public/svgs/upload.svg'
import Image from "next/image";
import { Search } from "lucide-react";


function BiodataPageTemplate() {
    const [ mode, setMode ] = useState('students')
    const [openImportDialog, setOpenImportDialog] = useState(false)

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
                    <div className="border-dotted border-2 border-[#E5E7EB] rounded-[8px] flex items-center justify-center w-full h-[228px] bg-[#F9FAFB]">
                        <div className="text-center">
                            <div className="flex flex-col items-center gap-1">
                                <Image src={upload} alt="upload" />
                                <p className="text-[#71717A] text-sm"><span className="font-bold">Click to upload</span> or drag and drop</p>
                                <p className="text-[#71717A] text-xs">Supported files: <span className="font-bold">.xlx</span> Max. File Size: <span className="font-bold">30MB</span></p>
                            </div>

                            <Button className="bg-mainGreen my-5">
                                <Search />
                                <span>Browse File</span>
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <CustomTable mode={mode} />



        </main>
    )
}

export default BiodataPageTemplate