
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


function LoginTemplate() {
    return (
        <main className="w-screen h-screen flex items-center justify-center">
            <div className="w-[40%] h-[504px] bg-mainTeal flex items-center justify-center rounded-[8px]">
                <div className="w-full">
                    <h1 className="text-center text-3xl font-bold" >
                        Data Center
                    </h1>

                    <div className="bg-white p-6 w-[70%] mx-auto mt-6 rounded-[8px]">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="username" className="font-bold">Username</Label>
                            <Input type="text" id="username" placeholder="Username" className="py-6" />
                        </div>

                        <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                            <Label htmlFor="password" className="font-bold">Password</Label>
                            <Input type="password" id="password" placeholder="Password" className="py-6" />
                        </div>

                        <div className="flex items-center justify-between mt-6">
                            <Button className="py-6 bg-mainGreen cursor-pointer text-white"> Sign In </Button>

                            <span className="cursor-pointer text-mainGreen text-sm font-bold">Forgot password</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default LoginTemplate