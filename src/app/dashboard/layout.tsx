'use client'

import React, { useEffect, useMemo, useState } from 'react'
import SideBar from '@/components/SideBar/SideBar'
import Header from '@/components/Header/Header'
import { StandardService } from '@/api/Estandar/standardService'
import { PartialStandard } from '@/types/Standard'
import { Metadata } from 'next'
import { useYearSemesterStore } from '@/store/useYearSemesterStore'

export const metadata: Metadata = {
	title: 'Sistema de Gestión de Calidad',
	description: 'Sistema de Gestión de Calidad'
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true)
	const [standards, setStandards] = useState<PartialStandard[]>([])
	const { year, semester } = useYearSemesterStore()
	console.log('year', year)
	console.log('semester', semester)
	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen)
	}

	const loadStandards = useMemo(() => {
		return (year: number, semester: 'A' | 'B') => {
			StandardService.getPartial(year, semester).then((res) => {
				setStandards(res.data)
			})
		}
	}, [])

	useEffect(() => {
		if (year && semester) {
			loadStandards(year, semester)
		}
	}, [year, semester, loadStandards])

	return (
		<div className='flex w-screen h-screen overflow-x-hidden'>
			<SideBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} standards = {standards}/>
			<div className={'flex-grow h-screen max-h-screen flex flex-col'}>
				<Header />
				<main className='h-screen overflow-y-auto no-scrollbar'>
					{children}
				</main>
			</div>
		</div>
	)
}