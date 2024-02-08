'use client'

import { useRouter } from 'next/navigation'

import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import { useFormik } from 'formik'
import { validationSchema } from './FormValidation'
import { FacultyStaffPart1Fields } from '@/components/Form/Reports/FacultyStaffReport/FacultyStaffPart1Fields'
import { FacultyStaffPart2Fields } from '@/components/Form/Reports/FacultyStaffReport/FacultyStaffPart2Fields'
import { FacultyStaffPart3Fields } from '@/components/Form/Reports/FacultyStaffReport/FacultyStaffPart3Fields'
import { Button } from '@nextui-org/react'
import CloseIcon from '@/components/Icons/CloseIcon'
import { ReportService } from '@/api/Report/ReportService'
import showToast from '../identification-and-context/toastHelper'
import { useEffect, useState } from 'react'
import SaveIcon from '@/components/Icons/SaveIcon'

export default function AnnualReportPage() {
	const router = useRouter()

	const [isEditing, setIsEditing] = useState(false)
	const [initialValues, setInitialValues] = useState({
		number_extraordinary_professor: 0,
		number_ordinary_professor_main: 0,
		number_ordinary_professor_associate: 0,
		number_ordinary_professor_assistant: 0,
		number_contractor_professor: 0,
		ordinary_professor_exclusive_dedication: 0,
		ordinary_professor_fulltime: 0,
		ordinary_professor_parttime: 0,
		contractor_professor_fulltime: 0,
		contractor_professor_parttime: 0,
		distinguished_researcher: 0,
		researcher_level_i: 0,
		researcher_level_ii: 0,
		researcher_level_iii: 0,
		researcher_level_iv: 0,
		researcher_level_v: 0,
		researcher_level_vi: 0,
		researcher_level_vii: 0,
		number_publications_indexed: 0,
		intellectual_property_indecopi: 0,
		number_research_project_inexecution: 0,
		number_research_project_completed: 0,
		number_professor_inperson_academic_movility: 0,
		number_professor_virtual_academic_movility: 0,
		number_vacancies: 0,
		number_applicants: 0,
		number_admitted_candidates: 0,
		number_enrolled_students: 0,
		number_graduates: 0,
		number_alumni: 0,
		number_degree_recipients: 0
	})

	useEffect(() => {
		ReportService.readFacultyStaff()
			.then((res) => {
				if (res.data.data.length !== 0) {
					setInitialValues(res.data.data[0])
					setIsEditing(true)
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	const formik = useFormik({
		initialValues,
		validationSchema,
		enableReinitialize: true,
		onSubmit: (values) => {
			const facultyStaffData = {
				...values,
				number_contractor_professor:
					values.contractor_professor_fulltime + values.contractor_professor_parttime
			}

			if (isEditing) {
				ReportService.updateFacultyStaff(facultyStaffData)
					.then((res) => {
						if (res.status === 200) {
							showToast('success', 'Datos del Personal actualizados con éxito')
							router.back()
						}
					})
					.catch((error) => {
						console.log(error)
						showToast('error', 'Ocurrió un problema, intentar nuevamente')
					})
			} else {
				ReportService.createFacultyStaff(facultyStaffData)
					.then((res) => {
						if (res.status === 201) {
							showToast('success', 'Datos del Personal guardados con éxito')
							router.back()
						}
					})
					.catch((error) => {
						console.log(error)
						showToast('error', 'Ocurrió un problema, intentar nuevamente')
					})
			}
		}
	})

	return (
		<div
			className='h-full py-10 px-20 '
			style={{ background: 'linear-gradient(to bottom, #F5F6F7 50%, #3982C2 50%)' }}
		>
			<h1 className='text-center text-xl font-extrabold uppercase'>Reporte Anual RRII</h1>

			<ContentWrapper className='bg-white rounded-md my-3'>
				<div className='py-10 px-10'>
					<h1 className='text-md font-extrabold uppercase'>Datos del Personal Docente</h1>
				</div>

				<form onSubmit={formik.handleSubmit}>
					<FacultyStaffPart1Fields formik={formik} />
					<FacultyStaffPart2Fields formik={formik} />
					<FacultyStaffPart3Fields formik={formik} />

					<div className='flex gap-4 justify-end p-3'>
						<Button
							color='danger'
							startContent={<CloseIcon width={16} height={16} fill='fill-white' />}
							onClick={() => router.back()}
						>
							Cancelar
						</Button>
						<Button
							color='primary'
							endContent={<SaveIcon width={15} height={15} fill='fill-blue-300' />}
							type='submit'
						>
							Guardar
						</Button>
					</div>
				</form>
			</ContentWrapper>
		</div>
	)
}
