'use client'

import CustomTable from "@/components/common/table/custom-table";
import { Button } from "@/components/ui/button";
import { useState } from "react";


function CapturedPageTemplate() {
    const [ mode, setMode ] = useState('students')
    return(
        <main className="content-wrapper bg-[#FAFAFA] py-5 h-full">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">
                    Successfully captured
                </h1>
                <Button variant={'outline'} className='border border-[#3F3F46] text-mainGrayText text-[16px] font-bold py-6'>Export Data</Button>
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

            <CustomTable mode={mode} />



        </main>
    )
}

export default CapturedPageTemplate