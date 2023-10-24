'use client'

import { useEffect, useState } from 'react'

import { PlanMejoraService } from '@/api/PlanMejora/planMejoraService'
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import { Button, Chip, ChipProps } from '@nextui-org/react'

const statusOptions = new Map([
	[1, 'planificado'],
	[2, 'en desarrollo'],
	[3, 'completado'],
	[4, 'postergado'],
	[5, 'anulado']
])

const statusColorMap: Record<string, ChipProps['color']> = {
	1: 'secondary',
	2: 'primary',
	3: 'success',
	4: 'warning',
	5: 'danger'
}

interface ImprovementPlanDetailsPageProps {
	params: {
		code: string
	}
}

type ImprovementPlan = {
	advance: number
	code: string
	duration: number
	name: string
	plan_status_id: number
	standard_id: number
	semester_execution: string
	efficacy_evaluation: boolean
}

export default function ImprovementPlanDetailsPage({ params }: ImprovementPlanDetailsPageProps) {
	const [plan, setPlan] = useState<ImprovementPlan>({
		advance: 0,
		code: '',
		duration: 0,
		name: '',
		plan_status_id: 0,
		standard_id: 0,
		semester_execution: '',
		efficacy_evaluation: false
	})

	useEffect(() => {
		PlanMejoraService.readByPlan(params.code)
			.then((res) => {
				console.log(res.data.data)
				setPlan(res.data.data)
			})
			.catch(console.log)
	}, [])

	return (
		<ContentWrapper className='bg-white h-[670px] w-[96%] m-auto rounded-md py-5 px-10'>
			<div className='flex justify-between items-center mb-3'>
				<h1 className='uppercase text-lg font-bold'>Detalles de plan de mejora</h1>
				<Button color='primary' variant='ghost'>
					Descargar
				</Button>
			</div>
			<hr />

			<div className='flex justify-between items-center px-2 py-3'>
				<div>
					<div className='flex gap-3 items-center'>
						<h1 className='uppercase text-xl font-bold'>{plan.name}</h1>
						<Chip size='sm' color={statusColorMap[plan.plan_status_id]} variant='flat'>
							<span className='capitalize'>{statusOptions.get(plan.plan_status_id)}</span>
						</Chip>
					</div>
					<h2 className='text-sm'>{plan.code}</h2>
				</div>
				<div className='flex flex-col justify-center items-center'>
					<h1 className='uppercase text-sm font-bold'>Avance</h1>
					<p className='text-2xl'>{plan.advance}%</p>
				</div>
			</div>
			<hr />

			<div className='grid grid-cols-4 gap-4 px-2 py-3'>
				<div className='col-span-1'>
					<h1 className='uppercase text-sm font-bold'>Estándar</h1>
					<h2 className='text-sm'>{plan.standard_id}</h2>
				</div>
				<div className='col-span-1'>
					<h1 className='uppercase text-sm font-bold'>Semestre</h1>
					<h2 className='text-sm'>{plan.semester_execution}</h2>
				</div>
				<div className='col-span-1'>
					<h1 className='uppercase text-sm font-bold'>Duración</h1>
					<h2 className='text-sm'>{plan.duration} {plan.duration === 1 ? 'mes' : 'meses'}</h2>
				</div>
				<div className='col-span-1'>
					<h1 className='uppercase text-sm font-bold'>Evaluación Eficacia</h1>
					<h2 className='text-sm'>{plan.efficacy_evaluation ? 'Si' : 'No'}</h2>
				</div>
			</div>
			<hr />
		</ContentWrapper>
	)
}
