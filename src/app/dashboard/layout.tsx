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
import { NarrativeService } from '@/api/Narrative/narrativeService'
import { useNarrativeStore } from '@/store/useNarrativeStore'
import { useQuery, useQueryClient } from 'react-query'
import { useToast } from '@/hooks/toastProvider'
import { usePathname } from 'next/navigation'

// export const metadata: Metadata = {
// 	title: 'Sistema de Gestión de Calidad',
// 	description: 'Sistema de Gestión de Calidad'
// }

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const { setPermissions, role, permissions } = usePermissionsStore()
	const [standards, setStandards] = useState<PartialStandard[]>([])
	const { year, semester } = useYearSemesterStore()
	const queryClient = useQueryClient()
	const { narrativeBlockedId, setNarrativeBlockedId, unlockNarrative, setIsEditingNarrative, isNarrativeBlock } = useNarrativeStore()
	const { showToast, updateToast } = useToast()
	const pathname = usePathname()


	useInactivityMonitor()

	useEffect(() => {
		if (year && semester) {
			BaseService.configure(year, semester)
		}
		if (narrativeBlockedId || pathname.split('/')[4] !== 'narrative') {
			NarrativeService.unlockNarrative(String(narrativeBlockedId)).then((res) => {
				console.log('res de blockNarrative', res.data)
				const notification = showToast('Procesando...')
				updateToast(notification, 'Narrativa liberada', 'info')
				setNarrativeBlockedId(null)
				unlockNarrative(false)
				setIsEditingNarrative(false)
			}).catch((err: any) => {
				console.log('err de blockNarrative', err)
			})
		}
	}, [year, semester, queryClient, isNarrativeBlock])

	useQuery(
		['standards', year, semester],
		StandardService.getPartial, {
			onSuccess(data) {
				setStandards(data.data)
			},
			staleTime: Infinity,
			enabled: !!year && !!semester
		}
	)

	useQuery(
		['dateSemester', year, semester],
		DateSemesterService.getInfo, {
			onSuccess(data) {
				const id = data.data[0].id
				const closingDate = data.data[0].closing_date
				const isClosed = data.data[0].is_closed
				useYearSemesterStore.getState().setId(id)
				useYearSemesterStore.getState().setIsClosed(isClosed)
				useYearSemesterStore.getState().setClosingDate(closingDate)
				console.log(isClosed || (new Date(closingDate) < new Date()))
				if ((isClosed || (new Date(closingDate) < new Date())) === true) {
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
				} else {
					if (role === 'administrador') {
						setPermissions({
							createStandard: true,
							readStandard: true,
							updateStandard: true,
							deleteStandard: true,
							createPlan: true,
							readPlan: true,
							updatePlan: true,
							deletePlan: true,
							createEvidence: true,
							readEvidence: true,
							updateEvidence: true,
							deleteEvidence: true,
							createUser: true,
							readUser: true,
							updateUser: true,
							deleteUser: true
						})
					} else if (role === 'docente') {
						setPermissions({
							createStandard: false,
							readStandard: true,
							updateStandard: false,
							deleteStandard: false,
							createPlan: true,
							readPlan: true,
							updatePlan: true,
							deletePlan: true,
							createEvidence: true,
							readEvidence: true,
							updateEvidence: true,
							deleteEvidence: true,
							createUser: false,
							readUser: true,
							updateUser: false,
							deleteUser: false
						})
					}
				}
				console.log('permisos', permissions)
			},
			staleTime: Infinity,
			enabled: !!year && !!semester
		}
	)

	return (
		<div className='flex w-screen h-screen overflow-x-hidden'>
			<SideBar standards={standards} role={role}/>
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