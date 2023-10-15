import { Button, Checkbox, Input, Link, Select, SelectItem } from '@nextui-org/react'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import * as yup from 'yup'
import SaveIcon from '../../Icons/SaveIcon'
import CloseIcon from '../../Icons/CloseIcon'
import DynamicInput from './DynamicInput'
import { PlanMejoraService } from '@/api/PlanMejora/planMejoraService'
import { useRouter } from 'next/navigation'

const years = [
	{ label: '2020', value: '2020' },
	{ label: '2021', value: '2021' },
	{ label: '2022', value: '2022' },
	{ label: '2023', value: '2023' },
	{ label: '2024', value: '2024' }
]

const semesters = [
	{ label: 'A', value: 'A' },
	{ label: 'B', value: 'B' }
]

const status = [
	{ label: 'Planificado', value: 1 },
	{ label: 'En desarrollo', value: 2 },
	{ label: 'Completado', value: 3 },
	{ label: 'Postergado', value: 4 },
	{ label: 'Anulado', value: 5 }
]

type ImprovementPlanFormProps = {
	standardId: string
}

export type DynamicInputGeneric = {
	description: string
}

/*
	TODO
	* Add all validations
	* Filter by standard id
	* Edit Dynamic Field
	* Delete Dynamic Field
	* Improve styles
*/
const validationSchema = yup.object({
	name: yup.string().trim().required('Nombre de plan necesario'),
	code: yup
		.string()
		.required('Código del plan necesario')
		.trim()
		.matches(/^OM\d{2}-\d{2}-20\d{2}$/, 'El código debe tener el formato OMXX-YY-ZZZZ'),
	opportunity_for_improvement: yup.string().required('Oportunidad de mejora necesaria')
})

export default function ImprovementPlanForm({ standardId }: ImprovementPlanFormProps) {
	const router = useRouter()

	const [isSelected, setIsSelected] = useState(false)

	const formik = useFormik({
		initialValues: {
			code: '',
			name: '',
			opportunity_for_improvement: '',
			semester_execution: '',
			advance: 0,
			duration: 1,
			efficacy_evaluation: false,
			standard_id: Number(standardId),
			plan_status_id: 0,
			sources: [],
			problems_opportunities: [],
			root_causes: [],
			improvement_actions: [],
			resources: [],
			goals: [],
			responsibles: [],
			observations: [],
			year: '',
			semester: ''
		},
		validationSchema,
		onSubmit: (values) => {
			const data = {
				code: values.code,
				name: values.name,
				opportunity_for_improvement: values.opportunity_for_improvement,
				semester_execution: values.semester_execution,
				advance: Number(values.advance),
				duration: Number(values.duration),
				efficacy_evaluation: Boolean(values.efficacy_evaluation),
				standard_id: Number(values.standard_id),
				plan_status_id: Number(values.plan_status_id),
				sources: values.sources,
				problems_opportunities: values.problems_opportunities,
				root_causes: values.root_causes,
				improvement_actions: values.improvement_actions,
				resources: values.resources,
				goals: values.goals,
				responsibles: values.responsibles,
				observations: values.observations
			}

			PlanMejoraService.create(data)
				.then((res) => {
					if (res.statusText === 'Created') {
						router.push(`/dashboard/standards/${standardId}/evidence_improvements`)
					}
				})
				.catch((error) => {
					console.log(error)
				})
		}
	})

	const handleChangeGeneric = (identifier: string, values: Array<DynamicInputGeneric>) => {
		formik.setFieldValue(identifier, values)
	}

	// Updating 'semester_execution' parameter
	useEffect(() => {
		const updatedSemesterExecution = `${formik.values.year}-${formik.values.semester}`
		formik.setFieldValue('semester_execution', updatedSemesterExecution)
	}, [formik.values.year, formik.values.semester])

	return (
		<div>
			<form onSubmit={formik.handleSubmit}>
				<h1 className='uppercase text-lg font-bold mb-7'>Formulario de plan de mejora</h1>

				<Input
					isRequired
					name='name'
					className='mb-3'
					label='Nombre del Plan de Mejora'
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
					className='mb-3'
					name='code'
					label='Código'
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

				<DynamicInput
					identifier='problems_opportunities'
					label='Problemas/Oportunidades'
					onChange={handleChangeGeneric}
				/>

				<DynamicInput identifier='root_causes' label='Causa/Raíz' onChange={handleChangeGeneric} />

				<Input
					isRequired
					name='opportunity_for_improvement'
					className='mb-3'
					label='Oportunidad de mejora'
					size='sm'
					type='text'
					variant='underlined'
					value={formik.values.opportunity_for_improvement}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					isInvalid={
						formik.touched.opportunity_for_improvement &&
						Boolean(formik.errors.opportunity_for_improvement)
					}
					errorMessage={
						formik.touched.opportunity_for_improvement && formik.errors.opportunity_for_improvement
					}
				/>

				<DynamicInput
					identifier='improvement_actions'
					label='Acciones de mejora'
					onChange={handleChangeGeneric}
				/>

				<div className='mb-3 flex gap-5'>
					<Select
						isRequired
						name='year'
						className='max-w-xs'
						label='Año'
						size='sm'
						variant='underlined'
						value={formik.values.year}
						onChange={formik.handleChange}
					>
						{years.map((year) => (
							<SelectItem key={year.value} value={year.value}>
								{year.label}
							</SelectItem>
						))}
					</Select>
					<Select
						isRequired
						name='semester'
						className='max-w-xs'
						label='Semestre'
						size='sm'
						variant='underlined'
						value={formik.values.semester}
						onChange={formik.handleChange}
					>
						{semesters.map((semester) => (
							<SelectItem key={semester.value} value={semester.value}>
								{semester.label}
							</SelectItem>
						))}
					</Select>
				</div>

				<Input
					isRequired
					name='duration'
					className='max-w-xs mb-3'
					label='Duración (meses)'
					type='number'
					min={1}
					max={12}
					size='sm'
					variant='underlined'
					value={formik.values.duration.toString()}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					isInvalid={formik.touched.duration && Boolean(formik.errors.duration)}
					errorMessage={formik.touched.duration && formik.errors.duration}
				/>

				<DynamicInput identifier='resources' label='Recursos' onChange={handleChangeGeneric} />

				<DynamicInput identifier='goals' label='Metas' onChange={handleChangeGeneric} />

				<DynamicInput
					identifier='responsibles'
					label='Responsables'
					onChange={handleChangeGeneric}
				/>
				<DynamicInput
					identifier='observations'
					label='Observaciones'
					onChange={handleChangeGeneric}
				/>

				<Select
					isRequired
					name='plan_status_id'
					className='max-w-xs mb-3'
					label='Estado'
					size='sm'
					variant='underlined'
					value={formik.values.plan_status_id}
					onChange={formik.handleChange}
				>
					{status.map((stat) => (
						<SelectItem key={stat.value} value={stat.value}>
							{stat.label}
						</SelectItem>
					))}
				</Select>

				<DynamicInput identifier='sources' label='Fuentes' onChange={handleChangeGeneric} />

				<Input
					isRequired
					name='advance'
					type='number'
					label='Avance'
					className='max-w-xs mb-3'
					value={formik.values.advance.toString()}
					onChange={formik.handleChange}
					min={0}
					max={100}
					variant='underlined'
				/>

				<div className='flex gap-2 mb-3 pt-2'>
					<label className='text-default-900 text-sm'>
						Eficacia<span className='text-red-600'>*</span>
					</label>
					<Checkbox
						name='efficacy_evaluation'
						isSelected={isSelected}
						onValueChange={setIsSelected}
						onChange={formik.handleChange}
					>
						{isSelected ? 'Sí' : 'No'}
					</Checkbox>
				</div>

				<div className='flex gap-4 justify-end p-3'>
					<Button
						color='success'
						className='text-white mb-5'
						startContent={<SaveIcon width={16} height={16} />}
						type='submit'
					>
						Guardar
					</Button>
					<Button
						color='danger'
						className='mb-5'
						startContent={<CloseIcon width={16} height={16} />}
					>
						<Link
							className='text-white'
							href={`/dashboard/standards/${standardId}/evidence_improvements`}
						>
							Cancelar
						</Link>
					</Button>
				</div>
			</form>
		</div>
	)
}
