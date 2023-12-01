'use client'

import { PlanMejoraService } from '@/api/PlanMejora/PlanMejoraService'
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import ImprovementPlanEditForm from '@/components/Form/ImprovementPlanForm/Edit/ImprovementPlanEditForm'
import { useEffect, useState } from 'react'

export default function ImprovementPlanEditPage({
	params
}: {
	params: {
		code: string
		id: string
	}
}) {
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
			setPlan({
				...data,
				year: data.semester_execution.split('-')[0],
				semester: data.semester_execution.split('-')[1]
			})
		})
	}, [])

	return (
		<ContentWrapper className='bg-white w-[96%] m-auto rounded-md'>
			<div className='px-5 py-8'>
				<ImprovementPlanEditForm params={params} plan={plan} />
			</div>
		</ContentWrapper>
	)
}
