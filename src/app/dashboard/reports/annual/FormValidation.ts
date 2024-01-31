import * as yup from 'yup'

export const validationSchema = yup.object().shape({
	number_extraordinary_professor: yup.number().required('Campo requerido'),
	number_ordinary_professor_main: yup.number().required('Campo requerido'),
	number_ordinary_professor_associate: yup.number().required('Campo requerido'),
	number_ordinary_professor_assistant: yup.number().required('Campo requerido'),
	number_contractor_professor: yup.number().required('Campo requerido'),
	ordinary_professor_exclusive_dedication: yup.number().required('Campo requerido'),
	ordinary_professor_fulltime: yup.number().required('Campo requerido'),
	ordinary_professor_parttime: yup.number().required('Campo requerido'),
	contractor_professor_fulltime: yup.number().required('Campo requerido'),
	contractor_professor_parttime: yup.number().required('Campo requerido'),
	distinguished_researcher: yup.number().required('Campo requerido'),
	researcher_level_i: yup.number().required('Campo requerido'),
	researcher_level_ii: yup.number().required('Campo requerido'),
	researcher_level_iii: yup.number().required('Campo requerido'),
	researcher_level_iv: yup.number().required('Campo requerido'),
	researcher_level_v: yup.number().required('Campo requerido'),
	researcher_level_vi: yup.number().required('Campo requerido'),
	researcher_level_vii: yup.number().required('Campo requerido'),
	number_publications_indexed: yup.number().required('Campo requerido'),
	intellectual_property_indecopi: yup.number().required('Campo requerido'),
	number_research_project_inexecution: yup.number().required('Campo requerido'),
	number_research_project_completed: yup.number().required('Campo requerido'),
	number_professor_inperson_academic_movility: yup.number().required('Campo requerido'),
	number_professor_virtual_academic_movility: yup.number().required('Campo requerido'),
	number_vacancies: yup.number().required('Campo requerido'),
	number_applicants: yup.number().required('Campo requerido'),
	number_admitted_candidates: yup.number().required('Campo requerido'),
	number_enrolled_students: yup.number().required('Campo requerido'),
	number_graduates: yup.number().required('Campo requerido'),
	number_alumni: yup.number().required('Campo requerido'),
	number_degree_recipients: yup.number().required('Campo requerido')
})
