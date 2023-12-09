/* eslint-disable indent */
/* eslint-disable multiline-ternary */
'use client'

import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import AngleDoubleRightIcon from '@/components/Icons/AngleDoubleRightIcon'
import ArrowIcon from '@/components/Icons/ArrowIcon'
import IdentificationContextProgress from '@/components/Report/IdentificationContextProgress/IdentificationContextProgress'
import { steps } from '@/utils/reports'
import { Button, Input } from '@nextui-org/react'
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
				return <InterestGroupsFields />
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

const InstitutionFields = () => {
	return (
		<div>
			<div className='flex flex-col mb-4'>
				<label className='text-default-600 text-sm ml-1'>Nombre:</label>
				<Input id='name' name='name' size='sm' type='text' />
			</div>
			<div className='flex flex-col mb-4'>
				<label className='text-default-600 text-sm ml-1'>Región/Provincia/Distrito:</label>
				<Input id='region' name='region' size='sm' type='text' />
			</div>
			<div className='flex flex-col mb-4'>
				<label className='text-default-600 text-sm ml-1'>Teléfono Institucional:</label>
				<Input id='phone' name='phone' size='sm' type='text' />
			</div>
			<div className='flex flex-col mb-4'>
				<label className='text-default-600 text-sm ml-1'>Página Web:</label>
				<Input id='website' name='website' size='sm' type='text' />
			</div>
			<div className='flex flex-col mb-4'>
				<label className='text-default-600 text-sm ml-1'>Resolución de Licenciamiento:</label>
				<Input id='resolution' name='resolution' size='sm' type='text' />
			</div>
			<div className='flex flex-col mb-4'>
				<label className='text-default-600 text-sm ml-1'>Fecha de Resolución:</label>
				<Input id='resolution-date' name='resolution-date' size='sm' type='text' />
			</div>
			<div className='flex flex-col mb-4'>
				<label className='text-default-600 text-sm ml-1'>
					Apellidos y Nombres de la máxima autoridad de la IE:
				</label>
				<Input id='ei-representant' name='ei-representant' size='sm' type='text' />
			</div>
			<div className='flex flex-col mb-4'>
				<label className='text-default-600 text-sm ml-1'>Correo Electrónico:</label>
				<Input id='email' name='email' size='sm' type='email' />
			</div>
			<div className='flex flex-col mb-4'>
				<label className='text-default-600 text-sm ml-1'>Teléfono:</label>
				<Input id='phone' name='phone' size='sm' type='phone' />
			</div>
		</div>
	)
}

const StudyProgramFields = () => {
	return (
		<div>
			<div className='flex flex-col mb-3'>
				<label className='text-default-600 text-sm ml-1'>Resolución de lincenciamiento:</label>
				<Input id='discharge' name='discharge' size='sm' type='text' />
			</div>
			<div className='flex flex-col mb-3'>
				<label className='text-default-600 text-sm ml-1'>Nivel Académico:</label>
				<Input id='academic-level' name='academic-level' size='sm' type='text' />
			</div>
			<div className='flex flex-col mb-3'>
				<label className='text-default-600 text-sm ml-1'>CUI:</label>
				<Input id='cui' name='cui' size='sm' type='text' />
			</div>
			<div className='flex flex-col mb-3'>
				<label className='text-default-600 text-sm ml-1'>Denominación de Grado:</label>
				<Input id='grade' name='grade' size='sm' type='text' />
			</div>
			<div className='flex flex-col mb-3'>
				<label className='text-default-600 text-sm ml-1'>Denominación de Título:</label>
				<Input id='title' name='title' size='sm' type='text' />
			</div>
			<div className='flex flex-col mb-3'>
				<label className='text-default-600 text-sm ml-1'>Oferta Autorizada:</label>
				<Input id='offer' name='offer' size='sm' type='text' />
			</div>
			<div className='flex flex-col mb-3'>
				<label className='text-default-600 text-sm ml-1'>
					Apellidos y Nombres de la máxima autoridad o responsable del programa de estudio:
				</label>
				<Input id='responsible' name='responsible' size='sm' type='text' />
			</div>
			<div className='flex flex-col mb-3'>
				<label className='text-default-600 text-sm ml-1'>Correo Electrónico:</label>
				<Input id='email' name='email' size='sm' type='email' />
			</div>
			<div className='flex flex-col mb-3'>
				<label className='text-default-600 text-sm ml-1'>Teléfono:</label>
				<Input id='phone' name='phone' size='sm' type='text' />
			</div>
		</div>
	)
}

const QualityCommitteeFields = () => {
	return (
		<div>
			<div className='flex flex-col mb-3'>
				<label className='text-default-600 text-sm ml-1'>Apellidos:</label>
				<Input id='name' name='name' size='sm' type='text' />
			</div>
		</div>
	)
}

const InterestGroupsFields = () => {
	return (
		<div>
			<div className='flex flex-col mb-3'>
				<label className='text-default-600 text-sm ml-1'>Interesado:</label>
				<Input id='name' name='name' size='sm' type='text' />
			</div>
		</div>
	)
}
