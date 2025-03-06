'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

import avatar from '@/../public/svgs/avatar-h.svg'
import Image from "next/image"



function CaptureBiometricsPageTemplate() {
    const [searchTerm, setSearchTerm] = useState('')

    return(
        <div className="h-full bg-[#F9FAFB] flex items-center justify-center">
            <div className="w-[35%] text-center">
                <div className="w-[70%] mx-auto">
                    <h1 className="font-bold text-black text-3xl">Capture Biometrics</h1>
                    <p className="text-[#71717A] text-[16px] mt-3">Search the student/staff you want to capture their biometric details.</p>
                </div>


                <div className="mt-14 border border-[#D4D4D8] bg-white rounded-[4px] py-5 px-4 flex gap-2 items-center">
                    <Search />
                    <Input type='text' placeholder="Search by mat. no or ID" className="border-none shadow-none focus-visible:ring-0 text-[16px] text-[#71717A]" value={searchTerm} onChange={ e => setSearchTerm(e.target.value) } />
                    <Button className="bg-mainGreen text-white">Search</Button>
                </div>

                {
                    searchTerm && (
                        <div className="mt-6 text-left">
                            <span className="font-medium text-[16px] text-[#71717A] uppercase">Users Found(1)</span>
                            <div className="bg-white rounded-[12px] border border-[#E4E4E7] py-4 px-6 mt-2 flex items-center justify-between gap-4">
                                <div>
                                    <Image src={avatar} alt='avatar' />
                                </div>
                                <div className="grow">
                                    <h4 className="font-medium text-[16px] text-[#0F172A] ">Victoria Oreoluwa, <span className="text-[#71717A] text-sm">female</span></h4>
                                    <p className="text-sm text-[#44403C]">Mat. No: 240102013</p>
                                    <p className="text-sm text-[#44403C]">B.Sc in English Language</p>
                                </div>
                                <div className="bg-[#FDE8E8] py-0.5 px-2.5 text-[#9B1C1C] font-medium text-xs rounded-[6px]">
                                    No biometric data 
                                </div>
                            </div>
                        </div>
                    )
                }

                <Button className="mt-14" disabled>Select & Begin Capture</Button>
            </div>

        </div>
    )
}

export default CaptureBiometricsPageTemplate