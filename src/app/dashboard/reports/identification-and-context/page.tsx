/* eslint-disable indent */
/* eslint-disable multiline-ternary */
'use client'

import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import InstitutionFields from '@/components/Form/Reports/IdentificationContextReport/InstitutionFields'
import InterestedGroupsFields from '@/components/Form/Reports/IdentificationContextReport/InterestedGroupsFields/InterestedGroupsFields'
import QualityCommitteeFields from '@/components/Form/Reports/IdentificationContextReport/QualityCommitteeFields/QualityCommitteeFields'
import StudyProgramFields from '@/components/Form/Reports/IdentificationContextReport/StudyProgramFields'
import AngleDoubleRightIcon from '@/components/Icons/AngleDoubleRightIcon'
import ArrowIcon from '@/components/Icons/ArrowIcon'
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

	const renderFormStep = () => {
		switch (currentStep) {
			case 1:
				return <InstitutionFields />
			case 2:
				return <StudyProgramFields />
			case 3:
				return <QualityCommitteeFields />
			case 4:
				return <InterestedGroupsFields />
			default:
				return null
		}
	}

	return (
		<div
			className='h-full py-10 px-20 '
			style={{ background: 'linear-gradient(to bottom, #F5F6F7 50%, #3982C2 50%)' }}
		>
			<h1 className='text-center text-xl font-extrabold uppercase mb-7'>
				Reporte de identificación y contexto
			</h1>

			<IdentificationContextProgress currentStep={currentStep} steps={steps} />

			<ContentWrapper className='bg-white rounded-md my-10'>
				<div className='py-10 px-20'>
					<h1 className='text-md font-extrabold uppercase mb-3'>
						{steps[currentStep - 1].description}
					</h1>

					{renderFormStep()}

					<div className='mt-10 flex flex-row-reverse items-center gap-3'>
						{currentStep < steps.length && (
							<Button
								color='primary'
								endContent={<AngleDoubleRightIcon width={15} height={15} fill='fill-white' />}
								onClick={handleNext}
							>
								Siguiente
							</Button>
						)}
						{currentStep === 4 && (
							<Button
								color='primary'
								endContent={<AngleDoubleRightIcon width={15} height={15} fill='fill-blue-300' />}
								onClick={() => alert('Subiendo reporte')}
							>
								Subir
							</Button>
						)}
						{currentStep > 1 && (
							<Button
								color='primary'
								variant='ghost'
								startContent={<ArrowIcon width={15} height={15} fill='fill-blue-300' />}
								onClick={handlePrev}
							>
								Volver
							</Button>
						)}
					</div>
				</div>
			</ContentWrapper>
		</div>
	)
}
