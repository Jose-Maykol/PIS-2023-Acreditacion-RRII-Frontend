'use client'

import React, { useEffect, useState } from 'react'
import SideBar from '@/components/SideBar/SideBar'
import Header from '@/components/Header/Header'
import { PartialStandard } from '@/types/Standard'
import { useYearSemesterStore } from '@/store/useYearSemesterStore'
import { BaseService } from '@/api/Base/BaseService'
import { StandardService } from '@/api/Estandar/StandardService'
import { usePermissionsStore } from '@/store/usePermissionsStore'
import DateSemesterService from '@/api/DateSemester/DateSemester'
import useInactivityMonitor from '@/hooks/useInactivityMonitor'
import InactivityModal from '@/components/Modal/Auth/InactivityModal'

import { useQuery, useQueryClient } from 'react-query'
import { QueryStatus } from '@/types/common'
import { StandardPartialAPIResponse } from '@/types/api'

// export const metadata: Metadata = {
// 	title: 'Sistema de Gestión de Calidad',
// 	description: 'Sistema de Gestión de Calidad'
// }

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const { setPermissions, role } = usePermissionsStore()
	const [standards, setStandards] = useState<PartialStandard[]>([])
	const { year, semester, setId, setIsClosed, setClosingDate } = useYearSemesterStore()
	const queryClient = useQueryClient()

	useInactivityMonitor()

	useEffect(() => {
		setStandards([])
		queryClient.invalidateQueries(['standards', year, semester])
		if (year && semester) {
			BaseService.configure(year, semester)
		}
	}, [year, semester, queryClient])

	const query = useQuery<StandardPartialAPIResponse>(
		['standards', year, semester],
		StandardService.getPartial, {
			onSuccess(data) {
				setStandards(data.data || [])
			},
			staleTime: Infinity,
			enabled: !!year && !!semester
		}
	)

	const queryStandardStatus: QueryStatus<StandardPartialAPIResponse> = {
		isIdle: query.isIdle,
		isFetching: query.isFetching,
		isLoading: query.isLoading,
		isSuccess: query.isSuccess,
		isError: query.isError,
		error: query.error
	}

	useQuery(
		['dateSemester', year, semester],
		DateSemesterService.getInfo, {
			onSuccess(data) {
				const id = data.data.id
				const closingDate = data.data.closing_date
				const isClosed = data.data.is_closed
				setId(id)
				setIsClosed(isClosed)
				setClosingDate(closingDate)
				if (new Date(closingDate) < new Date()) {
					setPermissions({
						createStandard: false,
						readStandard: false,
						updateStandard: false,
						deleteStandard: false,
						createPlan: false,
						readPlan: false,
						updatePlan: false,
						deletePlan: false,
						createEvidence: false,
						readEvidence: false,
						updateEvidence: false,
						deleteEvidence: false,
						createUser: false,
						readUser: false,
						updateUser: false,
						deleteUser: false
					})
				}
			},
			staleTime: Infinity,
			enabled: !!year && !!semester
		}
	)

	return (
		<div className='flex w-screen h-screen overflow-x-hidden'>
			<SideBar standards={standards} queryStandardStatus={queryStandardStatus} role={role}/>
			<div className={'flex-grow h-screen max-h-screen flex flex-col'}>
				<Header />
				<main className='flex-1 no-scrollbar bg-gray-100'>
					{children}
				</main>
			</div>
			<InactivityModal />
		</div>
	)
}