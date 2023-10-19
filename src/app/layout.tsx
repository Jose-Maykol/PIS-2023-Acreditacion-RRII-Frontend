// 'use client'

import './globals.css'
import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Providers } from './providers'

export const metadata: Metadata = {
	title: 'Sistema de Gestión de Calidad',
	description: 'Sistema de Gestión de Calidad'
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en'>
			<body>
				<Providers>
					<main>{children}</main>
				</Providers>
			</body>
		</html>
	)
}
