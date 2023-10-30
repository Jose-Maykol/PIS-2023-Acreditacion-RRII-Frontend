'use client'

import { PlanMejoraService } from '@/api/PlanMejora/planMejoraService'
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import ImprovementPlansTable from '@/components/Table/ImprovementPlansTable'
import { ImprovementPlans } from '@/types/PlanMejora'
import { useEffect, useState } from 'react'

type EvidenceImprovementsPageProps = {
	params: {
		id: string
	}
}

export default function EvidenceImprovementsPage({ params }: EvidenceImprovementsPageProps) {
	const [improvementPlans, setImpmrovementPlans] = useState<ImprovementPlans[]>([])

	useEffect(() => {
		PlanMejoraService.readByStandard(params.id)
			.then((res) => {
				setImpmrovementPlans(res.data.data)
			})
			.catch(console.log)
	}, [])

	console.log('Rendering PMs', params.id)

	return (
		<ContentWrapper className='bg-white h-[670px] w-[96%] m-auto rounded-md py-5 px-10'>
			<ImprovementPlansTable
				id={params.id}
				improvementPlans={improvementPlans}
				setImprovementPlans={setImpmrovementPlans}
			/>
		</ContentWrapper>
	)
}
