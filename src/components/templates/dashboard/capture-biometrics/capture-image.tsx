import { Button } from "@/components/ui/button"
import Image from "next/image"

import image from '@/../public/images/image.png'
import ellipse from '@/../public/images/ellipse-capture.png'
import { Dispatch, SetStateAction } from "react"
import { useRouter } from "next/navigation"


type CaptureImageType = {
    setStep: Dispatch<SetStateAction<string>>
}

function CaptureImageTemplate({ setStep }: CaptureImageType) {

    const router = useRouter()
    
    const handleNext = () => {
        // router.push('/dashboard/capture')
        setStep('fingerprint')
    }

    const handlePrev = () => {
        router.push('/dashboard/capture')
    }

    return (
        <div className="h-full bg-[#F9FAFB] flex items-center justify-center">
            <div className="w-[35%] text-center">
                <div className="w-[70%] mx-auto">
                    <h1 className="font-bold text-black text-3xl">Capture Image</h1>
                    <p className="text-[#71717A] text-[16px] mt-1">Position face in middle of the oval.</p>
                </div>


                <div className="relative mt-3 flex flex-col justify-center items-center">
                    <Image src={ellipse} alt="ellipse" className="absolute" />
                    <Image src={image} alt="image" />
                    <Button>Capture Photo</Button>
                </div>

                
                <div className="flex justify-between mt-5">
                    <Button disabled className="w-[45%] cursor-pointer" onClick={handlePrev}>Prev</Button>
                    <Button className="bg-mainGreen w-[45%] cursor-pointer" onClick={handleNext} >Next</Button>
                </div>

            </div>

        </div>
    )
}

export default CaptureImageTemplate