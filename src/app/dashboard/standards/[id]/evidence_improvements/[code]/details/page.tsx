/* eslint-disable multiline-ternary */
'use client'

import { useEffect, useState } from 'react'

import { PlanMejoraService } from '@/api/PlanMejora/PlanMejoraService'
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import { Button, Chip, ChipProps, Divider } from '@nextui-org/react'
import { planItem } from '@/types/PlanMejora'
import EyeIcon from '@/components/Icons/EyeIcon'
import ImprovementEvidencesModal from '@/components/Modal/Evidence/ImprovementEvidencesModal'

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

export default function ImprovementPlanDetailsPage({ params }: ImprovementPlanDetailsPageProps) {
	const [showModal, setShowModal] = useState<boolean>(false)

	const [plan, setPlan] = useState({
		advance: 0,
		code: '',
		duration: 0,
		name: '',
		plan_status_id: 0,
		standard_id: 0,
		semester_execution: '',
		efficacy_evaluation: false,
		opportunity_for_improvement: '',
		problems_opportunities: [],
		root_causes: [],
		goals: [],
		improvement_actions: [],
		observations: [],
		resources: [],
		responsibles: [],
		sources: []
	})

	useEffect(() => {
		PlanMejoraService.readByPlan(params.code)
			.then((res) => {
				setPlan(res.data.data)
			})
			.catch(console.log)
	}, [])

	return (
		<ContentWrapper className='bg-white w-[96%] m-auto rounded-md'>
			<div className='px-5 py-8'>
				<div className='flex justify-between items-center mb-3'>
					<h1 className='uppercase text-lg font-bold'>Detalles de plan de mejora</h1>
					<div className='flex'>
						<Button
							color='primary'
							startContent={<EyeIcon width={16} height={16} fill='fill-white' />}
							onClick={() => setShowModal(true)}
						>
							Ver Evidencias
						</Button>
						<Button color='primary' variant='ghost' className='ml-3'>
							Descargar
						</Button>
						{showModal ? (
							<ImprovementEvidencesModal
								openModal={showModal}
								onCloseModal={() => setShowModal(false)}
								id={plan.standard_id.toString()}
								planId={params.code}
							/>
						) : null}
					</div>
				</div>

				<Divider className='my-1' />

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
						<p className='text-2xl font-bold'>{plan.advance}%</p>
					</div>
				</div>

				<Divider className='my-1' />

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
						<h2 className='text-sm'>
							{plan.duration} {plan.duration === 1 ? 'mes' : 'meses'}
						</h2>
					</div>
					<div className='col-span-1'>
						<h1 className='uppercase text-sm font-bold'>Evaluación Eficacia</h1>
						<h2 className='text-sm'>{plan.efficacy_evaluation ? 'Si' : 'No'}</h2>
					</div>
				</div>

				<Divider className='mt-2 mb-4' />

				<div className='mb-4'>
					<h1 className='uppercase text-sm font-bold'>Oportunidades de Mejora</h1>
					<h2 className='text-sm border rounded-lg py-2 pr-2 pl-4 mt-2'>
						{plan.opportunity_for_improvement}
					</h2>
				</div>

				<PlanItemList itemList={plan.problems_opportunities} label='Problema/Oportunidad' />
				<PlanItemList itemList={plan.root_causes} label='Causa Raíz' />
				<PlanItemList itemList={plan.improvement_actions} label='Acciones de mejora' />
				<PlanItemList itemList={plan.resources} label='Recursos' />
				<PlanItemList itemList={plan.goals} label='Metas' />
				<PlanItemList itemList={plan.responsibles} label='Responsables' />
				<PlanItemList itemList={plan.observations} label='Observaciones' />
				<PlanItemList itemList={plan.sources} label='Fuentes' />
			</div>
		</ContentWrapper>
	)
}

type PlanItemListProps = {
	itemList: planItem[]
	label: string
}

function PlanItemList({ itemList, label }: PlanItemListProps) {
	return (
		<div className='mt-4'>
			<h1 className='uppercase text-sm font-bold'>{label}</h1>
			<div className='border-1 rounded-lg pt-2 pb-1 px-1 mt-2'>
				{itemList.length > 0 ? (
					itemList.map((item: planItem) => (
						<li key={item.id} className='ml-3 text-sm mb-1'>
							{item.description}
						</li>
					))
				) : (
					<p className='italic'>Campo por completar</p>
				)}
			</div>
		</div>
	)
}
