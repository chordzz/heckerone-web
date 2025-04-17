'use client'

import { useState } from "react";
import CaptureImageTemplate from "@/components/templates/dashboard/capture-biometrics/capture-image";
import CaptureFingerprintTemplate from "@/components/templates/dashboard/capture-biometrics/capture-fingerprint";


function CaptureBiometricsPage() {
    const [ step, setStep ] = useState('image')


    switch (step) {
        case 'image':
            return (
                <CaptureImageTemplate setStep={setStep} />
            )
        case 'fingerprint':
            return <CaptureFingerprintTemplate />
            // return <CaptureFingerprintTemplate setStep={setStep} />
        default:
            break;
    }
}

export default CaptureBiometricsPage