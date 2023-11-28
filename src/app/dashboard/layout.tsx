'use client'

import React, { useEffect, useMemo, useState } from 'react'
import SideBar from '@/components/SideBar/SideBar'
import Header from '@/components/Header/Header'
import { PartialStandard } from '@/types/Standard'
import { Metadata } from 'next'
import { useYearSemesterStore } from '@/store/useYearSemesterStore'
import { BaseService } from '@/api/Base/BaseService'
import { StandardService } from '@/api/Estandar/StandardService'
import { usePermissionsStore } from '@/store/usePermissionsStore'


// export const metadata: Metadata = {
// 	title: 'Sistema de Gestión de Calidad',
// 	description: 'Sistema de Gestión de Calidad'
// }

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true)
	const { role } = usePermissionsStore()
	const [standards, setStandards] = useState<PartialStandard[]>([])
	const { year, semester } = useYearSemesterStore()
	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen)
	}

	const loadStandards = useMemo(() => {
		return () => {
			StandardService.getPartial().then((res) => {
				setStandards(res.data)
			})
		}
	}, [])

	useEffect(() => {
		if (year && semester) {
			BaseService.configure(year, semester)
			loadStandards()
		}
	}, [year, semester, loadStandards])

	return (
		<div className='flex w-screen h-screen overflow-x-hidden'>
			<SideBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} standards={standards} role={role}/>
			<div className={'flex-grow h-screen max-h-screen flex flex-col'}>
				<Header />
				<main className='flex-1 no-scrollbar bg-gray-100'>
					{children}
				</main>
			</div>
		</div>
	)
}