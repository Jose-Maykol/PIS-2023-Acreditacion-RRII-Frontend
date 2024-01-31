/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable indent */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
'use client'

import { useRouter } from 'next/navigation'
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
import {
	validationSchemaPart1,
	validationSchemaPart2,
	validationSchemaPart3,
	validationSchemaPart4
} from './FormValidation'
import showToast from './toastHelper'
import { InterestedGroup, QualityMember } from '@/types/Reports'
import { ReportService } from '@/api/Report/ReportService'

export default function IdentificationContextReportPage() {
	const router = useRouter()
	const [currentStep, setCurrentStep] = useState<number>(1)
	const [submitClicked, setSubmitClicked] = useState(false)

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const validationSchema = () => {
		if (currentStep === 1) {
			return validationSchemaPart1
		} else if (currentStep === 2) {
			return validationSchemaPart2
		} else if (currentStep === 3) {
			return validationSchemaPart3
		} else if (currentStep === 4) {
			return validationSchemaPart4
		}
	}

	const formik = useFormik({
		initialValues: {
			name_institution: '',
			address_headquarters: '',
			region: '',
			province: '',
			district: '',
			institutional_telephone: '',
			web_page: '',
			date_resolution: '',
			highest_authority_institution: '',
			highest_authority_institution_email: '',
			highest_authority_institution_telephone: '',
			resolution_authorizes_institution: '',
			resolution_authorizing_offering_program: '',
			academic_level: '',
			cui: '',
			grade_denomination: '',
			title_denomination: '',
			authorized_offer: '',
			highest_authority_study_program: '',
			highest_authority_study_program_email: '',
			highest_authority_study_program_telephone: '',
			members_quality_committee: [],
			interest_groups_study_program: []
		},
		validationSchema,
		onSubmit: (values) => {
			const {
				region,
				province,
				district,
				cui,
				members_quality_committee,
				interest_groups_study_program,
				...rest
			} = values

			const identificationContextReport = {
				...rest,
				cui: parseInt(cui),
				region_province_district: {
					region,
					province,
					district
				},
				members_quality_committee: members_quality_committee.map((member: QualityMember) => {
					const { id, ...memberWithoutId } = member
					return memberWithoutId
				}),
				interest_groups_study_program: interest_groups_study_program.map(
					(group: InterestedGroup) => {
						const { id, ...groupWithoutId } = group
						return groupWithoutId
					}
				)
			}
			console.log(identificationContextReport)

			if (submitClicked) {
				ReportService.createContextIdentificationReport(identificationContextReport)
					.then((res) => {
						console.log(res)
						if (res.status === 201) {
							setSubmitClicked(false)
							showToast('success', 'Reporte creado con éxito')
							router.push('/dashboard/admin')
						}
					})
					.catch((error) => {
						console.log(error)
						setSubmitClicked(false)
						showToast('error', 'Ocurrió un problema, intentar nuevamente')
					})
			}
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
				return <InstitutionFields formik={formik} />
			case 2:
				return <StudyProgramFields formik={formik} />
			case 3:
				return (
					<QualityCommitteeFields
						formik={formik}
						qualityMembersCommittee={formik.values.members_quality_committee}
					/>
				)
			case 4:
				return (
					<InterestedGroupsFields
						formik={formik}
						interestedGroups={formik.values.interest_groups_study_program}
					/>
				)
			default:
				return null
		}
	}

	const handleValidateFields = () => {
		formik.submitForm()
		if (formik.isValid) {
			handleNext()
			formik.setTouched({})
		} else {
			showToast('error', 'Completar los campos requeridos')
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
									onClick={handleValidateFields}
								>
									Siguiente
								</Button>
							)}
							{currentStep === 4 && (
								<Button
									color='primary'
									endContent={<AngleDoubleRightIcon width={15} height={15} fill='fill-blue-300' />}
									type='submit'
									onClick={() => setSubmitClicked(true)}
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
