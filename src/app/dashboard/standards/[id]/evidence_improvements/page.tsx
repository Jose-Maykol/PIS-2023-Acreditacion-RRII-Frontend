'use client'

import { PlanMejoraService } from '@/api/PlanMejora/PlanMejoraService'
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
	const initializeStandardsOptions = (plans: Array<ImprovementPlans>) => {
		const uniqueStandards = new Set()

		return plans
			.filter((plan) => {
				if (!uniqueStandards.has(plan.nro_standard)) {
					uniqueStandards.add(plan.nro_standard)
					return true
				}
				return false
			})
			.map((plan) => ({
				label: `Estándar ${plan.nro_standard}`,
				uid: plan.nro_standard.toString()
			}))
	}

	const [improvementPlans, setImpmrovementPlans] = useState<ImprovementPlans[]>([])

	useEffect(() => {
		PlanMejoraService.readByStandard(params.id)
			.then((res) => {
				setImpmrovementPlans(res.data.data)
			})
			.catch(console.log)
	}, [])

	const standardsOptions = initializeStandardsOptions(improvementPlans)

	return (
		<ContentWrapper className='bg-white h-[670px] w-[96%] m-auto rounded-md py-5 px-10'>
			<ImprovementPlansTable
				id={params.id}
				improvementPlans={improvementPlans}
				setImprovementPlans={setImpmrovementPlans}
				standardsOptions={standardsOptions}
			/>
		</ContentWrapper>
	)
}
