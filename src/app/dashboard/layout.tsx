'use client'

import React, { useEffect, useState } from 'react'
import SideBar from '@/components/SideBar/SideBar'
import Header from '@/components/Header/Header'
import { StandardService } from '@/api/Estandar/standardService'
import { Standard } from '@/types/Standard'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true)
	const [standards, setStandards] = useState<Standard[]>([])

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen)
	}

	useEffect(() => {
		StandardService.getPartial().then((res) => {
			setStandards(res.data)
		})
	}, [])

	return (
		<div className='flex w-screen h-screen overflow-x-hidden'>
			<SideBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} standards = {standards}/>
			<div className={`grow ${isSidebarOpen ? 'ml-[210px]' : 'ml-[60px]'}`}>
				<Header />
				<main className='h-screen'>
					{children}
				</main>
			</div>
		</div>
	)
}