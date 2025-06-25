'use client'


import Loader from "@/components/common/loader/loader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUser } from "@/contexts/userContext"
import { userLogin } from "@/lib/api/authRequest"
import { apiErrResp } from "@/lib/types/apiResponseTypes"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"
import { toast } from "react-toastify"


function LoginTemplate() {

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const { setUser, login } = useUser()

    

    const router = useRouter()

    const loginMutation = useMutation({
        mutationKey: ['userLogin'],
        mutationFn: userLogin,
        onSuccess: () => {

            toast.success("Logged in...")
            setEmail('')
            setPassword('')
            login()
            // router.push('/dashboard/biodata')
        },
        onError: (err: apiErrResp) => {
            // console.log("Error: ", err)
            toast.error(err.error)
        }
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        loginMutation.mutate({
            email: email,
            password: password
        })
    }

    useEffect( () => {

        if (loginMutation.isSuccess) {
            const loginData = loginMutation.data?.data?.data

            localStorage.setItem('heckerOneAccessToken', loginData.access)

            const userData = {
                id: loginData.uid,
                fullName: loginData.fullname,
                accountType: loginData.account_type
            }

            setUser(userData)
            // login()

            router.push('/dashboard/biodata')
            // console.log("User logged in: ", loginData)
        }
    }, [loginMutation.isSuccess])
    
    return (
        <main className="w-screen h-screen flex items-center justify-center">
            <div className="w-[40%] h-[504px] bg-mainTeal flex items-center justify-center rounded-[8px]">
                <div className="w-full">
                    <h1 className="text-center text-3xl font-bold" >
                        Data Center
                    </h1>

                    <form onSubmit={handleSubmit} className="bg-white p-6 w-[70%] mx-auto mt-6 rounded-[8px]">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="email" className="font-bold">Email</Label>
                            <Input required type="email" id="email" placeholder="email" className="py-6" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                            <Label htmlFor="password" className="font-bold">Password</Label>
                            <Input required type="password" id="password" placeholder="Password" className="py-6" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className="flex items-center justify-between mt-6">
                            <Button disabled={loginMutation.isPending} className="py-6 bg-mainGreen cursor-pointer text-white min-w-[100px]" type="submit"> 
                                {
                                    loginMutation.isPending ? (
                                        <Loader />
                                    )
                                    : 'Sign in'
                                }
                            </Button>

                            <span className="cursor-pointer text-mainGreen text-sm font-bold">Forgot password</span>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default LoginTemplate