import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import { Button, Checkbox, Input, Select, SelectItem, Slider } from '@nextui-org/react'

import { PlanMejoraService } from '@/api/PlanMejora/PlanMejoraService'
import { semesters, years, status } from '@/utils/data_improvement_plans'
import { planItem } from '@/types/PlanMejora'

import DynamicInput from './DynamicInput'
import CloseIcon from '@/components/Icons/CloseIcon'
import SaveIcon from '@/components/Icons/SaveIcon'
import { validationSchema } from '../FormValidation'
import { useFormik } from 'formik'

export default function ImprovementPlanEditForm({
	params,
	plan
}: {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	plan: any
	params: { id: string; code: string }
}) {
	const router = useRouter()
	const [isSelected, setIsSelected] = useState(false)
	const [advanceValue, setAdvanceValue] = useState(0)

	const [formData, setFormData] = useState({
		id: 0,
		code: '',
		name: '',
		opportunity_for_improvement: '',
		semester_execution: '',
		advance: 0,
		duration: 1,
		efficacy_evaluation: false,
		standard_id: Number(params.id),
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
	})

	useEffect(() => {
		setFormData(plan)
		setIsSelected(plan.efficacy_evaluation)
		setAdvanceValue(plan.advance / 100)
	}, [plan])

	const getPlanItemsToSend = (data: planItem[]) =>
		data.map((item) => (item.id > 1384914000000 ? { description: item.description } : item))

	const formik = useFormik({
		initialValues: formData,
		validationSchema,
		enableReinitialize: true,
		onSubmit: (values) => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { year, semester, ...remainingPlan } = formData

			const newPlan = {
				...remainingPlan,
				name: values.name,
				code: values.code,
				opportunity_for_improvement: values.opportunity_for_improvement,
				semester_execution: `${values.year}-${values.semester}`,
				advance: advanceValue * 100,
				duration: Number(values.duration),
				efficacy_evaluation: isSelected,
				standard_id: values.standard_id,
				plan_status_id: Number(values.plan_status_id),
				problems_opportunities: getPlanItemsToSend(values.problems_opportunities),
				root_causes: getPlanItemsToSend(values.root_causes),
				improvement_actions: getPlanItemsToSend(values.improvement_actions),
				resources: getPlanItemsToSend(values.resources),
				goals: getPlanItemsToSend(values.goals),
				responsibles: getPlanItemsToSend(values.responsibles),
				observations: getPlanItemsToSend(values.observations),
				sources: getPlanItemsToSend(values.sources)
			}

			// console.log(newPlan)
			// TODO: Check backend (problems_opportunities - improvement_actions)

			PlanMejoraService.update(formData.id, newPlan)
				.then((res) => {
					console.log(res)
					if (res.statusText === 'OK') {
						router.push(`/dashboard/standards/${formData.standard_id}/evidence_improvements`)
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
				label='Nombre del Plan de Mejora:'
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
				label='Código:'
				placeholder='OMXX-YY-ZZZZ'
				size='sm'
				type='text'
				variant='underlined'
			/>

			<DynamicInput
				identifier='problems_opportunities'
				label='Problemas/Oportunidades:'
				onChange={handleInputValues}
				defaultValues={formData.problems_opportunities}
			/>

			<DynamicInput
				identifier='root_causes'
				label='Causa/Raíz:'
				onChange={handleInputValues}
				defaultValues={formData.root_causes}
			/>

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
				label='Oportunidad de mejora:'
				size='sm'
				type='text'
				variant='underlined'
			/>

			<DynamicInput
				identifier='improvement_actions'
				label='Acciones de mejora:'
				onChange={handleInputValues}
				defaultValues={formData.improvement_actions}
			/>

			<div className='mb-3 flex gap-5'>
				<Select
					isRequired
					id='year'
					name='year'
					selectedKeys={[formik.values.year]}
					onChange={formik.handleChange}
					className='max-w-xs'
					label='Año:'
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
					selectedKeys={[formik.values.semester]}
					onChange={formik.handleChange}
					className='max-w-xs'
					label='Semestre:'
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
				label='Duración (meses):'
				min={1}
				max={12}
				size='sm'
				type='number'
				variant='underlined'
			/>

			<DynamicInput
				identifier='resources'
				label='Recursos:'
				onChange={handleInputValues}
				defaultValues={formData.resources}
			/>
			<DynamicInput
				identifier='goals'
				label='Metas:'
				onChange={handleInputValues}
				defaultValues={formData.goals}
			/>
			<DynamicInput
				identifier='responsibles'
				label='Responsables:'
				onChange={handleInputValues}
				defaultValues={formData.responsibles}
			/>
			<DynamicInput
				identifier='observations'
				label='Observaciones:'
				onChange={handleInputValues}
				defaultValues={formData.observations}
			/>

			<Select
				isRequired
				id='plan_status_id'
				name='plan_status_id'
				selectedKeys={[`${formik.values.plan_status_id}`]}
				onChange={formik.handleChange}
				className='max-w-xs mb-3'
				label='Estado:'
				size='sm'
				variant='underlined'
			>
				{status.map((stat) => (
					<SelectItem key={stat.value} value={stat.value}>
						{stat.label}
					</SelectItem>
				))}
			</Select>

			<DynamicInput
				identifier='sources'
				label='Fuentes:'
				onChange={handleInputValues}
				defaultValues={formData.sources}
			/>

			<Slider
				label='Avance:'
				id='advance'
				name='advance'
				value={advanceValue}
				onChange={setAdvanceValue}
				showTooltip={true}
				step={0.01}
				formatOptions={{ style: 'percent' }}
				maxValue={1}
				minValue={0}
				defaultValue={advanceValue}
				className='max-w-md'
				classNames={{ label: 'text-default-600' }}
			/>

			<div className='flex gap-2 mb-3 pt-2 items-center'>
				<label className='text-default-600 text-sm'>Eficacia:</label>
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
						href={`/dashboard/standards/${params.id}/evidence_improvements`}
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
