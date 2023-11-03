import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'

import { Button, Checkbox, Input, Select, SelectItem } from '@nextui-org/react'

import { PlanMejoraService } from '@/api/PlanMejora/PlanMejoraService'
import { semesters, years, status } from '@/utils/data_improvement_plans'
import { planItem } from '@/types/PlanMejora'

import DynamicInput from './DynamicInput'
import CloseIcon from '@/components/Icons/CloseIcon'
import SaveIcon from '@/components/Icons/SaveIcon'

export default function ImprovementPlanEditForm({
	params, plan
}: {
	params: { id: string; code: string }
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	plan: any
}) {
	const router = useRouter()
	const [isSelected, setIsSelected] = useState(false)

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
	}, [plan])

	const getPlanItemsToSend = (data: planItem[]) =>
		data.map((item) => (item.id > 1384914000000 ? { description: item.description } : item))

	// ===
	const handleChange = (ev: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = ev.target
		setFormData({ ...formData, [name]: value })
	}

	const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
		ev.preventDefault()

		const { year, semester, ...remainingPlan } = formData

		const newPlan = {
			...remainingPlan,
			name: formData.name,
			code: formData.code,
			opportunity_for_improvement: formData.opportunity_for_improvement,
			semester_execution: `${year}-${semester}`,
			advance: Number(formData.advance),
			duration: Number(formData.duration),
			efficacy_evaluation: isSelected,
			standard_id: formData.standard_id,
			plan_status_id: Number(formData.plan_status_id),
			problems_opportunities: getPlanItemsToSend(formData.problems_opportunities),
			root_causes: getPlanItemsToSend(formData.root_causes),
			improvement_actions: getPlanItemsToSend(formData.improvement_actions),
			resources: getPlanItemsToSend(formData.resources),
			goals: getPlanItemsToSend(formData.goals),
			responsibles: getPlanItemsToSend(formData.responsibles),
			observations: getPlanItemsToSend(formData.observations),
			sources: getPlanItemsToSend(formData.sources)
		}

		// TODO: Check backend (problems_opportunities - improvement_actions)
		// console.log(newPlan)

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

	const handleInputValues = (planField: string, value: planItem[]) => {
		setFormData({ ...formData, [planField]: value })
	}

	return (
		<form onSubmit={handleSubmit}>
			<h1 className='uppercase text-lg font-bold mb-7'>Formulario de plan de mejora</h1>

			<Input
				isRequired
				id='name'
				name='name'
				value={formData.name}
				onChange={handleChange}
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
				value={formData.code}
				onChange={handleChange}
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
				defaultValues={formData.problems_opportunities}
			/>

			<DynamicInput
				identifier='root_causes'
				label='Causa/Raíz'
				onChange={handleInputValues}
				defaultValues={formData.root_causes}
			/>

			<Input
				isRequired
				id='opportunity_for_improvement'
				name='opportunity_for_improvement'
				value={formData.opportunity_for_improvement}
				onChange={handleChange}
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
				defaultValues={formData.improvement_actions}
			/>

			<div className='mb-3 flex gap-5'>
				<Select
					isRequired
					id='year'
					name='year'
					selectedKeys={[formData.year]}
					onChange={handleChange}
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
					selectedKeys={[formData.semester]}
					onChange={handleChange}
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
				value={formData.duration.toString()}
				onChange={handleChange}
				className='max-w-xs mb-3'
				label='Duración (meses)'
				min={1}
				max={12}
				size='sm'
				type='number'
				variant='underlined'
			/>

			<DynamicInput
				identifier='resources'
				label='Recursos'
				onChange={handleInputValues}
				defaultValues={formData.resources}
			/>
			<DynamicInput
				identifier='goals'
				label='Metas'
				onChange={handleInputValues}
				defaultValues={formData.goals}
			/>
			<DynamicInput
				identifier='responsibles'
				label='Responsables'
				onChange={handleInputValues}
				defaultValues={formData.responsibles}
			/>
			<DynamicInput
				identifier='observations'
				label='Observaciones'
				onChange={handleInputValues}
				defaultValues={formData.observations}
			/>

			<Select
				isRequired
				id='plan_status_id'
				name='plan_status_id'
				selectedKeys={[`${formData.plan_status_id}`]}
				onChange={handleChange}
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

			<DynamicInput
				identifier='sources'
				label='Fuentes'
				onChange={handleInputValues}
				defaultValues={formData.sources}
			/>

			<Input
				isRequired
				id='advance'
				name='advance'
				value={formData.advance.toString()}
				onChange={handleChange}
				type='number'
				label='Avance'
				className='max-w-xs mb-3'
				min={0}
				max={100}
				variant='underlined'
			/>

			<div className='flex gap-2 mb-3 pt-2'>
				<label className='text-default-900 text-sm'>Eficacia</label>
				<Checkbox name='efficacy_evaluation' isSelected={isSelected} onValueChange={setIsSelected}>
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
