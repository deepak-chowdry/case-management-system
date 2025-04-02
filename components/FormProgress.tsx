import { CheckIcon } from "lucide-react"

interface FormProgressProps {
    currentStep: number
    totalSteps: number
}

export function FormProgress({ currentStep, totalSteps }: FormProgressProps) {
    const steps = Array.from({ length: totalSteps }, (_, i) => i + 1)

    return (
        <div className="relative">
            <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                    <div key={step} className="flex items-center justify-between">
                        <div className="relative flex flex-col items-center bg-white">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 bg-white z-10 
                                    ${step < currentStep
                                        ? "bg-zinc-800 border-zinc-800 text-white"
                                        : step === currentStep
                                            ? "border-zinc-500 text-zinc-500"
                                            : "border-gray-300 text-gray-300"
                                    }`}
                            >
                                {step < currentStep ? <CheckIcon className="w-5 h-5" /> : <span>{step}</span>}
                            </div>
                            <span
                                className={`mt-2 text-sm
                                    ${step === currentStep ? "text-zinc-500" : step < currentStep ? "text-zinc-800" : "text-gray-400"}`}
                            >
                                {step === 1 ? "Case Details" : step === 2 ? "Case Files" : "Review & Submit"}
                            </span>
                        </div>

                        {/* Conditionally render line after first two steps */}
                        {index < steps.length - 1 && (
                            <div className="h-px w-36 bg-gray-200 -translate-y-3 translate-x-5 hidden md:flex" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
