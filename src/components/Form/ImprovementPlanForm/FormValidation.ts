import * as yup from 'yup'

export const validationSchema = yup.object().shape({
	name: yup.string().trim().required('Nombre de plan necesario'),
	code: yup
		.string()
		.required('Código del plan necesario')
		.trim()
		.matches(/^OM\d{2}-\d{2}-20\d{2}$/, 'El código debe tener el formato OMXX-YY-ZZZZ'),
	opportunity_for_improvement: yup.string().required('Oportunidad de mejora necesaria'),
	semester_execution: yup.string().required('Semester Execution'), // TODO
	advance: yup.number().required('Advance'), // TODO
	duration: yup.number().required('Campo requerido'), // TODO
	efficacy_evaluation: yup.boolean().required('Efficacy'), // TODO
	plan_status_id: yup.number().required('Status ID'), // TODO
	standard_id: yup.number().required('Campo requerido'), // TODO
	sources: yup.array().min(1, 'Campo requerido'),
	problems_opportunities: yup.array().min(1, 'Campo requerido por favor'),
	root_causes: yup.array().min(1, 'Campo requerido'),
	improvement_actions: yup.array().min(1, 'Campo requerido'),
	resources: yup.array().min(1, 'Campo requerido'),
	goals: yup.array().min(1, 'Campo requerido'),
	responsibles: yup.array().min(1, 'Campo requerido'),
	observations: yup.array().required('Campos requerido')
})
