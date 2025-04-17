import { Button } from "@/components/ui/button"
// import Image from "next/image"

// import image from '@/../public/images/image.png'
// import ellipse from '@/../public/images/ellipse-capture.png'
// import { Dispatch, SetStateAction } from "react"
import { useRouter } from "next/navigation"


// type CaptureFingerprintType = {
//     setStep: Dispatch<SetStateAction<string>>
// }

const hand = [
    {
        title: 'Left Little',
        name: 'left_little',
        percentage: `${Math.floor(Math.random() * 100)}%`
    },
    {
        title: 'Left Ring',
        name: 'left_ring',
        percentage: `${Math.floor(Math.random() * 100)}%`
    },
    {
        title: 'Left Middle',
        name: 'left_middle',
        percentage: `${Math.floor(Math.random() * 100)}%`
    },
    {
        title: 'Left Index',
        name: 'left_index',
        percentage: `${Math.floor(Math.random() * 100)}%`
    },
    {
        title: 'Left Thumb',
        name: 'left_thumb',
        percentage: `${Math.floor(Math.random() * 100)}%`
    },
    {
        title: 'Right Thumb',
        name: 'right_thumb',
        percentage: `${Math.floor(Math.random() * 100)}%`
    },
    {
        title: 'Right Index',
        name: 'right_index',
        percentage: `${Math.floor(Math.random() * 100)}%`
    },
    {
        title: 'Right Middle',
        name: 'right_middle',
        percentage: `${Math.floor(Math.random() * 100)}%`
    },
    {
        title: 'Right Ring',
        name: 'right_ring',
        percentage: `${Math.floor(Math.random() * 100)}%`
    },
    {
        title: 'Right Little',
        name: 'right_little',
        percentage: `${Math.floor(Math.random() * 100)}%`
    },
]

// function CaptureFingerprintTemplate({ setStep }: CaptureFingerprintType) {
function CaptureFingerprintTemplate() {

    const router = useRouter()
    
    const handleNext = () => {
        router.push('/dashboard/capture')
        // setStep('fingerprint')
    }

    const handlePrev = () => {
        router.push('/dashboard/capture')
    }

    return (
        <div className="h-full bg-[#F9FAFB] flex items-center justify-center">
            <div className="w-[80%] text-center">
                <div className="w-[70%] mx-auto">
                    <h1 className="font-bold text-black text-3xl">Capture Fingerprint</h1>
                    <p className="text-[#71717A] text-[16px] mt-1">Capture all fingerprints.</p>
                </div>


                <div className="mt-3 flex flex-col justify-center items-center h-fit">
                    <div className="flex flex-col items-center w-full">
                        <div className="flex justify-between gap-5 items-center w-full">
                            <div className="flex gap-4">
                                {hand.filter(finger => finger.name.includes('left') && !finger.name.includes('thumb')).map((finger) => (
                                    <div key={finger.name} className="text-center">
                                        <span className="text-[#3F3F46] text-sm">{finger.title}</span>
                                        <div className="w-[90px] h-[125px] border border-green-400"></div>
                                        <span style={{ color: parseInt(finger.percentage) > 80 ? '#15803D' : parseInt(finger.percentage) > 50 ? '#CA8A04' : '#DC2626' }}>{finger.percentage}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-4">
                                {hand.filter(finger => finger.name.includes('right') && !finger.name.includes('thumb')).map((finger) => (
                                    <div key={finger.name} className="text-center">
                                        <span className="text-[#3F3F46] text-sm">{finger.title}</span>
                                        <div className="w-[90px] h-[125px] border border-green-400"></div>
                                        <span style={{ color: parseInt(finger.percentage) > 80 ? '#15803D' : parseInt(finger.percentage) > 50 ? '#CA8A04' : '#DC2626' }}>{finger.percentage}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-center gap-4 items-center mt-4">
                            {hand.filter(finger => finger.name.includes('thumb')).map((finger) => (
                                <div key={finger.name} className="text-center">
                                    <span className="text-[#3F3F46] text-sm">{finger.title}</span>
                                    <div className="w-[90px] h-[125px] border border-green-400"></div>
                                    <span style={{ color: parseInt(finger.percentage) > 80 ? '#15803D' : parseInt(finger.percentage) > 50 ? '#CA8A04' : '#DC2626' }}>{finger.percentage}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Button className="mt-2">Capture Photo</Button>
                </div>

                
                <div className="flex justify-center gap-4 mt-5">
                    <Button disabled className="w-[20%] cursor-pointer" onClick={handlePrev}>Prev</Button>
                    <Button className="bg-mainGreen w-[20%] cursor-pointer" onClick={handleNext} >Next</Button>
                </div>

            </div>

        </div>
    )
}

export default CaptureFingerprintTemplate