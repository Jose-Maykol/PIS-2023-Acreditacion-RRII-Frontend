import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
	title: 'Sistema de Gestión de Calidad',
	description: 'Sistema de Gestión de Calidad'
}

export default function AutLayout({ children }: { children: ReactNode}) {
	return (
		<main>
			<section className='min-w-full min-h-screen w-screen h-screen bg-blueGray-800'>
				{children}
			</section>
		</main>
	)
}