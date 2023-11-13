import * as yup from 'yup'

export const validationSchema = yup.object().shape({
	name: yup.string().trim().required('Nombre de plan necesario'),
	code: yup
		.string()
		.required('Código del plan necesario')
		.trim()
		.matches(/^OM\d{2}-\d{2}-20\d{2}$/, 'El código debe tener el formato OMXX-YY-ZZZZ'),
	opportunity_for_improvement: yup.string().required('Oportunidad de mejora necesaria')
})