'use client'

import React, { useEffect, useMemo, useState } from 'react'
import SideBar from '@/components/SideBar/SideBar'
import Header from '@/components/Header/Header'
import { StandardService } from '@/api/Estandar/standardService'
import { PartialStandard } from '@/types/Standard'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true)
	const [standards, setStandards] = useState<PartialStandard[]>([])

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
		loadStandards()
	}, [loadStandards])

	return (
		<div className='flex w-screen h-screen overflow-x-hidden'>
			<SideBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} standards = {standards}/>
			<div className={'grow'}>
				<Header />
				<main className='h-screen max-h-96'>
					{children}
				</main>
			</div>
		</div>
	)
}