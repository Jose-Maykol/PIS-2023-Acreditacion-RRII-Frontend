'use client'

import { PlanMejoraService } from '@/api/PlanMejora/PlanMejoraService'
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import CloseIcon from '@/components/Icons/CloseIcon'
import SaveIcon from '@/components/Icons/SaveIcon'
import { ImprovementPlan } from '@/types/PlanMejora'
import { semesters, years, status } from '@/utils/data_improvement_plans'
import { Button, Checkbox, Input, Select, SelectItem } from '@nextui-org/react'
import Link from 'next/link'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

interface ImprovementPlanEditPageProps {
	params: {
		code: string
		id: string
	}
}

export default function ImprovementPlanEditPage({ params }: ImprovementPlanEditPageProps) {
	const [isSelected, setIsSelected] = useState(false)

	const [plan, setPlan] = useState<ImprovementPlan>({
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
		observations: []
	})

	useEffect(() => {
		PlanMejoraService.readByPlan(params.code).then((res) => {
			setPlan(res.data.data)
			setIsSelected(res.data.data.efficacy_evaluation)
		})
	}, [])

	// ===
	const handleChange = (ev: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = ev.target
		setPlan({ ...plan, [name]: value })
	}

	const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
		ev.preventDefault()
		console.log('Submitting')
	}

	return (
		<ContentWrapper className='bg-white h-[670px] w-[96%] m-auto rounded-md py-5 px-10'>
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

				<div className='mb-3 flex gap-5'>
					<Select
						isRequired
						id='year'
						name='year'
						selectedKeys={[plan.semester_execution.split('-')[0]]}
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
						selectedKeys={[plan.semester_execution.split('-')[1]]}
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
					<Checkbox
						name='efficacy_evaluation'
						isSelected={isSelected}
						onValueChange={setIsSelected}
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
		</ContentWrapper>
	)
}
