'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";


function Dashboard() {
    const router = useRouter()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        router.push('/dashboard/biodata')
    }, [])
    
    return(
        <main>
            
        </main>
    )
}

export default Dashboard;