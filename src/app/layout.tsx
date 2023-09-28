'use client'

import './globals.css'
import React from 'react'
import type { Metadata } from 'next'
import { Providers } from './providers'
import SideBar from '@/components/SideBar/SideBar'
import { usePathname } from 'next/navigation'

export const metadata: Metadata = {
	title: 'Sistema de Gestión de Calidad',
	description: 'Sistema de Gestión de Calidad'
}

export default function RootLayout({ children }: { children: React.ReactNode}) {
	const pathname = usePathname()
	return (
		<html lang='en'>
			<body>
				<Providers>
					{pathname === '/auth/login' ? null : <SideBar />}
					<main>
						{children}
					</main>
				</Providers>
			</body>
		</html>
	)
}
