/* eslint-disable no-useless-escape */
import * as yup from 'yup'

export const validationSchemaPart1 = yup.object().shape({
	name: yup.string().trim().required('Campo requerido'),
	region: yup.string().trim().required('Campo requerido'),
	province: yup.string().trim().required('Campo requerido'),
	district: yup.string().trim().required('Campo requerido'),
	address_headquarters: yup.string().trim().required('Campo requerido'),
	institutional_telephone: yup
		.string()
		.trim()
		.required('Campo requerido')
		.matches(/^[0-9()\s.-]+$/, 'Agregar un número telefónico válido'),
	web_page: yup
		.string()
		.trim()
		.required('Campo requerido')
		.matches(
			/^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/,
			'Ingresar un URL válido como https://www.google.com'
		),
	licensing_resolution: yup.string().trim().required('Campo requerido'),
	date_resolution: yup
		.string()
		.trim()
		.required('Campo requerido')
		.matches(
			/^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
			'Ingresar una fecha con el formato YYYY-MM-DD'
		),
	highest_authority_institution: yup.string().trim().required('Campo requerido'),
	highest_authority_institution_email: yup
		.string()
		.trim()
		.required('Campo requerido')
		.matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/, 'Agregar un email válido'),
	highest_authority_institution_telephone: yup
		.string()
		.trim()
		.required('Campo requerido')
		.matches(/^[0-9()\s.-]+$/, 'Agregar un número telefónico válido')
})

export const validationSchemaPart2 = yup.object().shape({
	licensing_resolution2: yup.string().trim().required('Campo requerido'),
	academic_level: yup.string().trim().required('Campo requerido'),
	cui: yup.string().trim().required('Campo requerido'),
	grade_denomination: yup.string().trim().required('Campo requerido'),
	title_denomination: yup.string().trim().required('Campo requerido'),
	authorized_offer: yup.string().trim().required('Campo requerido'),
	highest_authority_study_program: yup.string().trim().required('Campo requerido'),
	highest_authority_study_program_email: yup
		.string()
		.trim()
		.required('Campo requerido')
		.matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/, 'Agregar un email válido'),
	highest_authority_study_program_telephone: yup
		.string()
		.trim()
		.required('Campo requerido')
		.matches(/^[0-9()\s.-]+$/, 'Agregar un número telefónico válido')
})

export const validationSchemaPart3 = yup.object().shape({
	members_quality_committee: yup.array().min(1, 'Agregar miembros de cómite de calidad')
})

export const validationSchemaPart4 = yup.object().shape({
	interest_groups_study_program: yup.array().min(1, 'Agregar grupos de interés')
})

