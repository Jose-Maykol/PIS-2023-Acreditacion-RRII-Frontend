import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { Button, Checkbox, Input, Select, SelectItem } from '@nextui-org/react'

import CloseIcon from '@/components/Icons/CloseIcon'
import SaveIcon from '@/components/Icons/SaveIcon'
import { semesters, years, status } from '@/utils/data_improvement_plans'
import DynamicInput from './DynamicInput'
import { planItem } from '@/types/PlanMejora'
import { PlanMejoraService } from '@/api/PlanMejora/PlanMejoraService'
import { useFormik } from 'formik'
import { validationSchema } from './FormValidation'

export default function ImprovementPlanForm({ standardId }: { standardId: string }) {
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
			const newPlan = {
				name: values.name,
				code: values.code,
				opportunity_for_improvement: values.opportunity_for_improvement,
				semester_execution: `${values.year}-${values.semester}`,
				advance: Number(values.advance),
				duration: Number(values.duration),
				efficacy_evaluation: isSelected,
				standard_id: Number(standardId),
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

			PlanMejoraService.create(newPlan)
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

	const handleInputValues = (identifier: string, values: planItem[]) => {
		formik.setFieldValue(identifier, values)
	}

	return (
		<form onSubmit={formik.handleSubmit}>
			<h1 className='uppercase text-lg font-bold mb-7'>Formulario de plan de mejora</h1>

			<Input
				isRequired
				id='name'
				name='name'
				value={formik.values.name}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				isInvalid={formik.touched.name && Boolean(formik.errors.name)}
				errorMessage={formik.touched.name && formik.errors.name}
				className='mb-3'
				label='Nombre del Plan de Mejora'
				size='sm'
				type='text'
				variant='underlined'
			/>

			<Input
				isRequired
				id='code'
				name='code'
				value={formik.values.code}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				isInvalid={formik.touched.code && Boolean(formik.errors.code)}
				errorMessage={formik.touched.code && formik.errors.code}
				className='mb-3'
				label='Código'
				placeholder='OMXX-YY-ZZZZ'
				size='sm'
				type='text'
				variant='underlined'
			/>

			<DynamicInput
				identifier='problems_opportunities'
				label='Problemas/Oportunidades'
				onChange={handleInputValues}
			/>

			<DynamicInput identifier='root_causes' label='Causa/Raíz' onChange={handleInputValues} />

			<Input
				isRequired
				id='opportunity_for_improvement'
				name='opportunity_for_improvement'
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
				className='mb-3'
				label='Oportunidad de mejora'
				size='sm'
				type='text'
				variant='underlined'
			/>

			<DynamicInput
				identifier='improvement_actions'
				label='Acciones de mejora'
				onChange={handleInputValues}
			/>

			<div className='mb-3 flex gap-5'>
				<Select
					isRequired
					id='year'
					name='year'
					value={formik.values.year}
					onChange={formik.handleChange}
					className='max-w-xs'
					label='Año'
					size='sm'
					variant='underlined'
				>
					{years.map((year) => (
						<SelectItem key={year.value} value={year.value}>
							{year.label}
						</SelectItem>
					))}
				</Select>
				<Select
					isRequired
					id='semester'
					name='semester'
					value={formik.values.semester}
					onChange={formik.handleChange}
					className='max-w-xs'
					label='Semestre'
					size='sm'
					variant='underlined'
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
				id='duration'
				name='duration'
				value={formik.values.duration.toString()}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				isInvalid={formik.touched.duration && Boolean(formik.errors.duration)}
				errorMessage={formik.touched.duration && formik.errors.duration}
				className='max-w-xs mb-3'
				label='Duración (meses)'
				min={1}
				max={12}
				size='sm'
				type='number'
				variant='underlined'
			/>

			<DynamicInput identifier='resources' label='Recursos' onChange={handleInputValues} />
			<DynamicInput identifier='goals' label='Metas' onChange={handleInputValues} />
			<DynamicInput identifier='responsibles' label='Responsables' onChange={handleInputValues} />
			<DynamicInput identifier='observations' label='Observaciones' onChange={handleInputValues} />

			<Select
				isRequired
				id='plan_status_id'
				name='plan_status_id'
				value={formik.values.plan_status_id}
				onChange={formik.handleChange}
				className='max-w-xs mb-3'
				label='Estado'
				size='sm'
				variant='underlined'
			>
				{status.map((stat) => (
					<SelectItem key={stat.value} value={stat.value}>
						{stat.label}
					</SelectItem>
				))}
			</Select>

			<DynamicInput identifier='sources' label='Fuentes' onChange={handleInputValues} />

			<Input
				isRequired
				id='advance'
				name='advance'
				value={formik.values.advance.toString()}
				onChange={formik.handleChange}
				type='number'
				label='Avance'
				className='max-w-xs mb-3'
				min={0}
				max={100}
				variant='underlined'
			/>

			<div className='flex gap-2 mb-3 pt-2'>
				<label className='text-default-900 text-sm'>Eficacia</label>
				<Checkbox
					name='efficacy_evaluation'
					isSelected={isSelected}
					onValueChange={setIsSelected}
					onChange={formik.handleChange}
				>
					<span className='text-sm'>{isSelected ? 'Sí' : 'No'}</span>
				</Checkbox>
			</div>

			<div className='flex gap-4 justify-end p-3'>
				<Button
					color='danger'
					className='mb-5'
					startContent={<CloseIcon width={16} height={16} fill='fill-white' />}
				>
					<Link
						className='text-white'
						href={`/dashboard/standards/${standardId}/evidence_improvements`}
					>
						Cancelar
					</Link>
				</Button>
				<Button
					color='success'
					className='text-white mb-5'
					startContent={<SaveIcon width={16} height={16} fill='fill-white' />}
					type='submit'
				>
					Guardar
				</Button>
			</div>
		</form>
	)
}
