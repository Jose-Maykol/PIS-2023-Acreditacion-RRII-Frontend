'use client'

import './globals.css'
import React from 'react'
import type { Metadata } from 'next'
import { Providers } from './providers'

export const metadata: Metadata = {
	title: 'Sistema de Gestión de Calidad',
	description: 'Sistema de Gestión de Calidad'
}

export default function RootLayout({ children }: { children: React.ReactNode}) {
	return (
		<html lang='en'>
			<body>
				<Providers>
					<main>
						{children}
					</main>
				</Providers>
			</body>
		</html>
	)
}
