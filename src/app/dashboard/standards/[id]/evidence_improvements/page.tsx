'use client'

import { PlanMejoraService } from '@/api/PlanMejora/planMejoraService'
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import ImprovementPlansTable from '@/components/Table/ImprovementPlansTable'
import { useEffect } from 'react'

type EvidenceImprovementsPageParams = {
	params: {
		id: string
	}
}

export default function EvidenceImprovementsPage({ params }: EvidenceImprovementsPageParams) {
	useEffect(() => {
		PlanMejoraService.read().then(console.log).catch(console.log)
	}, [])

	return (
		<ContentWrapper className='bg-white h-[670px] w-[96%] m-auto rounded-md py-5 px-10'>
			<ImprovementPlansTable id={params.id} />
		</ContentWrapper>
	)
}
