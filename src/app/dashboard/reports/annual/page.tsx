'use client'

import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import { useFormik } from 'formik'
import { validationSchema } from './FormValidation'
import { FacultyStaffPart1Fields } from '@/components/Form/Reports/FacultyStaffReport/FacultyStaffPart1Fields'
import { FacultyStaffPart2Fields } from '@/components/Form/Reports/FacultyStaffReport/FacultyStaffPart2Fields'

export default function AnnualReportPage() {
	// const formik = useFormik({
	// 	initialValues: {
	// 		number_extraordinary_professor: 0,
	// 		number_ordinary_professor_main: 0,
	// 		number_ordinary_professor_associate: 0,
	// 		number_ordinary_professor_assistant: 0,
	// 		number_contractor_professor: 0,
	// 		ordinary_professor_exclusive_dedication: 0,
	// 		ordinary_professor_fulltime: 0,
	// 		ordinary_professor_parttime: 0,
	// 		contractor_professor_fulltime: 0,
	// 		contractor_professor_parttime: 0,
	// 		distinguished_researcher: 0,
	// 		researcher_level_i: 0,
	// 		researcher_level_ii: 0,
	// 		researcher_level_iii: 0,
	// 		researcher_level_iv: 0,
	// 		researcher_level_v: 0,
	// 		researcher_level_vi: 0,
	// 		researcher_level_vii: 0,
	// 		number_publications_indexed: 0,
	// 		intellectual_property_indecopi: 0,
	// 		number_research_project_inexecution: 0,
	// 		number_research_project_completed: 0,
	// 		number_professor_inperson_academic_movility: 0,
	// 		number_professor_virtual_academic_movility: 0,
	// 		number_vacancies: 0,
	// 		number_applicants: 0,
	// 		number_admitted_candidates: 0,
	// 		number_enrolled_students: 0,
	// 		number_graduates: 0,
	// 		number_alumni: 0,
	// 		number_degree_recipients: 0
	// 	},
	// 	validationSchema
	// })

	return (
		<div
			className='h-full py-10 px-20 '
			style={{ background: 'linear-gradient(to bottom, #F5F6F7 50%, #3982C2 50%)' }}
		>
			<h1 className='text-center text-xl font-extrabold uppercase mb-3'>Reporte Anual RRII</h1>

			<ContentWrapper className='bg-white rounded-md my-10'>
				<div className='py-10 px-10'>
					<h1 className='text-md font-extrabold uppercase'>Datos del Personal Docente</h1>
				</div>

				<form>
					<FacultyStaffPart1Fields />
					<FacultyStaffPart2Fields />
				</form>
			</ContentWrapper>
		</div>
	)
}
