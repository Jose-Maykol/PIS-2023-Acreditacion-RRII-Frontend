"use client"

import React, { useState } from 'react'
import SideBar from '@/components/SideBar/SideBar'
import Header from '@/components/Header/Header'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

	const [isSidebarOpen, setIsSidebarOpen] = useState(true)

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen)
	}

	return (
		<div className='flex w-screen h-screen overflow-x-hidden'>
			<SideBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
			<div className={`grow ${isSidebarOpen ? 'ml-72' : 'ml-20'}`}>
				<Header />
				<main className='h-screen'>
					{children}
				</main>
			</div>
		</div>
	)
}