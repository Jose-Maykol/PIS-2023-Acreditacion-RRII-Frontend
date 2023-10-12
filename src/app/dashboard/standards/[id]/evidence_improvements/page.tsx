'use client'

import { PlanMejoraService } from '@/api/PlanMejora/planMejoraService'
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import ImprovementPlansTable from '@/components/Table/ImprovementPlansTable'
import { useEffect, useState } from 'react'

type EvidenceImprovementsPageParams = {
	params: {
		id: string
	}
}

export default function EvidenceImprovementsPage({ params }: EvidenceImprovementsPageParams) {
	const [improvementPlans, setImpmrovementPlans] = useState([])

	useEffect(() => {
		PlanMejoraService.read()
			.then((res) => {
				setImpmrovementPlans(res.data.data)
			})
			.catch(console.log)
	}, [])

	return (
		<ContentWrapper className='bg-white h-[670px] w-[96%] m-auto rounded-md py-5 px-10'>
			<ImprovementPlansTable id={params.id} improvementPlans={improvementPlans}/>
		</ContentWrapper>
	)
}
