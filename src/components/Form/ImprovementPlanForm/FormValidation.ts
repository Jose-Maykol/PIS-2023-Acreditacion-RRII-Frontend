import * as yup from 'yup'

export const validationSchema = yup.object().shape({
	name: yup.string().trim().required('Nombre de plan necesario').max(50, 'Máximo 50 caracteres'),
	code: yup
		.string()
		.required('Código del plan necesario')
		.trim()
		.matches(/^OM\d{2}-\d{2}-20\d{2}$/, 'El código debe tener el formato OMXX-YY-ZZZZ')
		.max(30, 'Máximo 20 caracteres'),
	opportunity_for_improvement: yup
		.string()
		.required('Oportunidad de mejora necesaria')
		.max(100, 'Máximo 100 caracteres'),
	year: yup.string().required('Campo requerido'),
	semester: yup.string().required('Campo requerido'),
	advance: yup.number().required('Campo requerido'),
	duration: yup.number().required('Campo requerido'),
	efficacy_evaluation: yup.boolean().required('Campo requerido'),
	plan_status_id: yup.number().positive('Diferente de 0').required('Campo requerido'),
	standard_id: yup.number().required('Campo requerido'),
	sources: yup.array().min(1, 'Campo requerido'),
	problems_opportunities: yup.array().min(1, 'Campo requerido por favor'),
	root_causes: yup.array().min(1, 'Campo requerido'),
	improvement_actions: yup.array().min(1, 'Campo requerido'),
	resources: yup.array().min(1, 'Campo requerido'),
	goals: yup.array().min(1, 'Campo requerido'),
	responsibles: yup.array().min(1, 'Campo requerido'),
	observations: yup.array().required('Campos requerido')
})
