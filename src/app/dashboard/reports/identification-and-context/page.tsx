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
import { useFormik } from 'formik'
import { useState } from 'react'

export default function IdentificationContextReportPage() {
	const [currentStep, setCurrentStep] = useState<number>(1)

	const formik = useFormik({
		initialValues: {
			address_headquarters: 'Dirección de prueba',
			region_province_district: {
				region: 'Región 1',
				province: 'Provincia 1',
				district: 'Distrito 1'
			},
			institutional_telephone: '123-456-789',
			web_page: 'http://www.ejemplo.com',
			date_resolution: '2023-11-30',
			highest_authority_institution: 'Autoridad Institucional',
			highest_authority_institution_email: 'autoridad@example.com',
			highest_authority_institution_telephone: '987-654-321',
			licensing_resolution: 'Resolución de Licencia',
			academic_level: 'Nivel Académico',
			cui: 12345678,
			grade_denomination: 'Denominación de Grado',
			title_denomination: 'Denominación de Título',
			authorized_offer: 'Oferta Autorizada',
			highest_authority_study_program: 'Autoridad del Programa de Estudio',
			highest_authority_study_program_email: 'autoridad_programa@example.com',
			highest_authority_study_program_telephone: '555-123-456',
			members_quality_committee: [
				{
					name: 'Nombre1',
					lastname: 'Apellido1',
					position: 'Cargo1',
					email: 'miembro1@example.com',
					telephone: '111-222-333'
				},
				{
					name: 'Nombre2',
					lastname: 'Apellido2',
					position: 'Cargo2',
					email: 'miembro2@example.com',
					telephone: '444-555-666'
				}
			],
			interest_groups_study_program: [
				{
					interested: 'Interesado1',
					main_requirement_study_program: 'Requisito1',
					type: 'Tipo1'
				},
				{
					interested: 'Interesado2',
					main_requirement_study_program: 'Requisito2',
					type: 'Tipo2'
				}
			]
		},
		onSubmit: (values) => {
			alert(JSON.stringify(values))
		}
	})

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

					<form onSubmit={formik.handleSubmit}>
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
									type='submit'
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
					</form>
				</div>
			</ContentWrapper>
		</div>
	)
}
