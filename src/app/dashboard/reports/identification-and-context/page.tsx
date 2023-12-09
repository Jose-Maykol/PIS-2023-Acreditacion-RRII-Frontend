/* eslint-disable multiline-ternary */
'use client'

import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import IdentificationContextProgress from '@/components/Report/IdentificationContextProgress/IdentificationContextProgress'
import { steps } from '@/utils/reports'
import { Button } from '@nextui-org/react'
import { useState } from 'react'

export default function IdentificationContextReportPage() {
	const [currentStep, setCurrentStep] = useState<number>(1)

	const handleNext = () => {
		if (currentStep < steps.length) {
			setCurrentStep((prevStep) => prevStep + 1)
		}
	}

	const handlePrev = () => {
		if (currentStep > 1) {
			setCurrentStep((prevStep) => prevStep - 1)
		}
	}

	return (
		<div className='h-full py-10 px-20 bg-slategray-100'>
			<h1 className='text-center text-xl font-extrabold uppercase mb-7'>
				Reporte de identificación y contexto
			</h1>

			<IdentificationContextProgress currentStep={currentStep} steps={steps} />

			<ContentWrapper className='bg-white w-full m-auto rounded-md my-10 p-5'>
				<div>
					<h1 className='text-md font-extrabold uppercase mb-3'>
						{steps[currentStep - 1].description}
					</h1>
					{currentStep > 1 && (
						<Button color='default' onClick={handlePrev}>
							Volver
						</Button>
					)}
					{currentStep < steps.length && (
						<Button color='primary' onClick={handleNext}>
							Siguiente
						</Button>
					)}
				</div>
			</ContentWrapper>
		</div>
	)
}
