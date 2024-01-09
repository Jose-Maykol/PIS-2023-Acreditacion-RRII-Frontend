/* eslint-disable no-useless-escape */
import * as yup from 'yup'

export const validationSchema = yup.object().shape({
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
	// responsibles: yup.array().min(1, 'Campo requerido'),
	// observations: yup.array().required('Campos requerido')
})
