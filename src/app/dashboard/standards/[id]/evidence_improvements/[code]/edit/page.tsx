'use client'

import { PlanMejoraService } from '@/api/PlanMejora/PlanMejoraService'
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import { ImprovementPlan } from '@/types/PlanMejora'
import { useEffect, useState } from 'react'

interface ImprovementPlanEditPageProps {
	params: {
		code: string
		id: string
	}
}

export default function ImprovementPlanEditPage({ params }: ImprovementPlanEditPageProps) {
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
		})
	}, [])

	return (
		<ContentWrapper className='bg-white h-[670px] w-[96%] m-auto rounded-md py-5 px-10'>
			<h1>Hello</h1>
		</ContentWrapper>
	)
}
