'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"



function DashboardNavigation() {

    const pathname = usePathname();
    const router = useRouter()

    const handleCaptureClick = () => {
        router.push('/dashboard/capture')
    }

    return (
        <nav className="bg-navTeal py-5 px-3 flex items-center justify-between">
            <div className="flex gap-8">

                <Link href={'/dashboard/biodata'} className={`text-[16px] leading-6 text-white cursor-pointer ${pathname.includes('/dashboard/biodata') ? 'text-white font-bold ' : 'text-white font-light'}`}>
                    Staff & Student Data
                </Link>

                <Link href={'/dashboard/captured'} className={`text-[16px] leading-6 text-white cursor-pointer ${pathname.includes('/dashboard/captured') ? 'font-bold text-white' : 'font-light text-white'}`}>
                    Successfully captured
                </Link>
            </div>

            <Button className='bg-white text-mainGreen text-[16px] font-bold py-6' onClick={handleCaptureClick} >Capture Biometrics</Button>
        </nav>
    )
}

export default DashboardNavigation