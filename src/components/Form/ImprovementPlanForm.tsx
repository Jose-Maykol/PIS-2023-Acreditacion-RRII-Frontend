import { Button, Input } from '@nextui-org/react'
import { useFormik } from 'formik'
import * as yup from 'yup'

type ImprovementPlanFormProps = {
	standardId: string
}

const validationSchema = yup.object({
	name: yup.string().trim().required('Nombre de plan necesario'),
	code: yup
		.string()
		.required('Código del plan necesario')
		.trim()
		.matches(/^OM\d{2}-\d{2}-20\d{2}$/, 'El codigo debe tener el formato OMXX-YY-ZZZZ')
})

export default function ImprovementPlanForm({ standardId }: ImprovementPlanFormProps) {
	const formik = useFormik({
		initialValues: {
			code: '',
			name: '',
			opportunity_for_improvement: '',
			semester_execution: '',
			advance: 0,
			duration: 0,
			efficacy_evaluation: false,
			standard_id: Number(standardId),
			plan_status_id: null,
			sources: [
				{
					description: ''
				}
			],
			problems_opportunities: [
				{
					description: ''
				},
				{
					description: ''
				}
			],
			root_causes: [
				{
					description: ''
				},
				{
					description: ''
				}
			],
			improvement_actions: [
				{
					description: ''
				},
				{
					description: ''
				}
			],
			resources: [
				{
					description: ''
				},
				{
					description: ''
				}
			],
			goals: [
				{
					description: ''
				},
				{
					description: ''
				}
			],
			responsibles: [
				{
					description: ''
				},
				{
					description: ''
				}
			],
			observations: [
				{
					description: ''
				},
				{
					description: ''
				}
			]
		},
		validationSchema,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2))
		}
	})

	return (
		<div>
			<form onSubmit={formik.handleSubmit}>
				<h1 className='uppercase text-lg font-bold mb-7'>Formulario de plan de mejora</h1>

				<Input
					isRequired
					id='name'
					label='Nombre del Plan de Mejora'
					name='name'
					size='sm'
					type='text'
					variant='underlined'
					value={formik.values.name}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					isInvalid={formik.touched.name && Boolean(formik.errors.name)}
					errorMessage={formik.touched.name && formik.errors.name}
				/>

				<Input
					isRequired
					className='mt-3'
					id='code'
					label='Código'
					name='code'
					placeholder='OMXX-YY-ZZZZ'
					size='sm'
					type='text'
					variant='underlined'
					value={formik.values.code}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					isInvalid={formik.touched.code && Boolean(formik.errors.code)}
					errorMessage={formik.touched.code && formik.errors.code}
				/>

				<Button color='primary' type='submit' className='mt-7'>
					Guardar
				</Button>
			</form>
		</div>
	)
}
