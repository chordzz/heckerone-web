'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";


function Dashboard() {
    const router = useRouter()

    useEffect(() => {
        router.push('/dashboard/biodata')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <main>
            
        </main>
    )
}

export default Dashboard;