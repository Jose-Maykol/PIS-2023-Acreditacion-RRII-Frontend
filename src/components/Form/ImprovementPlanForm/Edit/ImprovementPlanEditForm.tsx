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
	params
}: {
	params: { id: string; code: string }
}) {
	const router = useRouter()
	const [isSelected, setIsSelected] = useState(false)

	const [plan, setPlan] = useState({
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
		PlanMejoraService.readByPlan(params.code).then((res) => {
			const { data } = res.data
			console.log(data)
			setPlan({
				...data,
				year: data.semester_execution.split('-')[0],
				semester: data.semester_execution.split('-')[1]
			})
			setIsSelected(data.efficacy_evaluation)
		})
	}, [])

	const getPlanItemsToSend = (data: planItem[]) =>
		data.map((item) => (item.id > 1384914000000 ? { description: item.description } : item))

	// ===
	const handleChange = (ev: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = ev.target
		setPlan({ ...plan, [name]: value })
	}

	const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
		ev.preventDefault()

		const { year, semester, ...remainingPlan } = plan

		const newPlan = {
			...remainingPlan,
			name: plan.name,
			code: plan.code,
			opportunity_for_improvement: plan.opportunity_for_improvement,
			semester_execution: `${year}-${semester}`,
			advance: Number(plan.advance),
			duration: Number(plan.duration),
			efficacy_evaluation: isSelected,
			standard_id: plan.standard_id,
			plan_status_id: Number(plan.plan_status_id),
			problems_opportunities: getPlanItemsToSend(plan.problems_opportunities),
			root_causes: getPlanItemsToSend(plan.root_causes),
			improvement_actions: getPlanItemsToSend(plan.improvement_actions),
			resources: getPlanItemsToSend(plan.resources),
			goals: getPlanItemsToSend(plan.goals),
			responsibles: getPlanItemsToSend(plan.responsibles),
			observations: getPlanItemsToSend(plan.observations),
			sources: getPlanItemsToSend(plan.sources)
		}

		// TODO: Check backend (problems_opportunities - improvement_actions)
		// console.log(newPlan)

		PlanMejoraService.update(plan.id, newPlan)
			.then((res) => {
				console.log(res)
				if (res.statusText === 'OK') {
					router.push(`/dashboard/standards/${plan.standard_id}/evidence_improvements`)
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}

	const handleInputValues = (planField: string, value: planItem[]) => {
		setPlan({ ...plan, [planField]: value })
	}

	return (
		<form onSubmit={handleSubmit}>
			<h1 className='uppercase text-lg font-bold mb-7'>Formulario de plan de mejora</h1>

			<Input
				isRequired
				id='name'
				name='name'
				value={plan.name}
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
				value={plan.code}
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
				defaultValues={plan.problems_opportunities}
			/>

			<DynamicInput
				identifier='root_causes'
				label='Causa/Raíz'
				onChange={handleInputValues}
				defaultValues={plan.root_causes}
			/>

			<Input
				isRequired
				id='opportunity_for_improvement'
				name='opportunity_for_improvement'
				value={plan.opportunity_for_improvement}
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
				defaultValues={plan.improvement_actions}
			/>

			<div className='mb-3 flex gap-5'>
				<Select
					isRequired
					id='year'
					name='year'
					selectedKeys={[plan.year]}
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
					selectedKeys={[plan.semester]}
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
				value={plan.duration.toString()}
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
				defaultValues={plan.resources}
			/>
			<DynamicInput
				identifier='goals'
				label='Metas'
				onChange={handleInputValues}
				defaultValues={plan.goals}
			/>
			<DynamicInput
				identifier='responsibles'
				label='Responsables'
				onChange={handleInputValues}
				defaultValues={plan.responsibles}
			/>
			<DynamicInput
				identifier='observations'
				label='Observaciones'
				onChange={handleInputValues}
				defaultValues={plan.observations}
			/>

			<Select
				isRequired
				id='plan_status_id'
				name='plan_status_id'
				selectedKeys={[`${plan.plan_status_id}`]}
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
				defaultValues={plan.sources}
			/>

			<Input
				isRequired
				id='advance'
				name='advance'
				value={plan.advance.toString()}
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
