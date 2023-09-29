import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
	title: 'Sistema de Gestión de Calidad',
	description: 'Sistema de Gestión de Calidad'
}

export default function DashboardLayout({ children }: { children: React.ReactNode}) {
	return (
		<div className='flex flex-row'>
			<section>{children}</section>
		</div>
	)
}