'use client'

import { useEffect, useMemo, useState } from 'react'
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import BookMarkIcon from '@/components/Icons/BookMarkIcon'
import { PlanMejoraService } from '@/api/PlanMejora/planMejoraService'
import { useYearSemesterStore } from '@/store/useYearSemesterStore'
import ImprovementPlansTable from '@/components/Table/ImprovementPlansTable'
import { ImprovementPlans } from '@/types/PlanMejora'


export default function DashboardPage() {
	const [myImprovementPlans, setMyImprovementPlans] = useState<ImprovementPlans[]>([])
	const { year, semester } = useYearSemesterStore()

	const loadMyImprovementPlans = useMemo(() => {
		return (year: number, semester: 'A' | 'B') => {
			PlanMejoraService.readUser(year, semester).then((res) => {
				setMyImprovementPlans(res.data)
			}).catch(console.log)
		}
	}, [])
	useEffect(() => {
		if (year && semester) {
			loadMyImprovementPlans(year, semester)
		}
	}, [year, semester, loadMyImprovementPlans])

	return (
		<div className='h-full'>
			<ContentWrapper className='bg-lightBlue-600 p-5 h-[300px]'>
				<div className='flex items-center gap-2 pt-16 pl-6'>
					<BookMarkIcon width={40} height={40} fill='fill-white' variant='line' />
					<div className='text-white'>
						<h1 className='text-2xl font-bold'>Mis planes de mejora</h1>
						<p className='text-base'>Aqui se muestran los planes de mejora que creaste y modificaste</p>
					</div>
				</div>
			</ContentWrapper>
			<ContentWrapper className='bg-white h-[670px] -top-24 w-[96%] m-auto rounded-md py-5 px-10'>
				<div className='flex w-full mb-5'>
					<h2 className='text-2xl font-semibold'>Lista de Planes de Mejora Creados</h2>
				</div>
				<ImprovementPlansTable improvementPlans={myImprovementPlans} setImprovementPlans={setMyImprovementPlans}/>
			</ContentWrapper>
		</div>
	)
}