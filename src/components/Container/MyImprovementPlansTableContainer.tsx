import { PlanMejoraService } from '@/api/PlanMejora/PlanMejoraService'
import { useYearSemesterStore } from '@/store/useYearSemesterStore'
import { ImprovementPlans } from '@/types/ImprovementPlan'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useQuery } from 'react-query'


export default function MyImprovementPlansTableContainer() {
	const [myImprovementPlans, setMyImprovementPlans] = useState<ImprovementPlans[]>([])
	const { year, semester } = useYearSemesterStore()
	const ImprovementPlansTable = dynamic(() => import('@/components/Table/ImprovementPlansTable'), {
		ssr: false
	})

	const { data, isLoading } = useQuery(
		['myImprovementPlans', year, semester],
		() => {
			if (year !== null && semester !== null) {
				return PlanMejoraService.readUser(year, semester)
			}
		}, {
			onSuccess(data) {
				setMyImprovementPlans(data.data)
			},
			staleTime: Infinity,
			enabled: !!year && !!semester
		}
	)

	return (
		<ImprovementPlansTable improvementPlans={myImprovementPlans} setImprovementPlans={setMyImprovementPlans}/>
	)
}