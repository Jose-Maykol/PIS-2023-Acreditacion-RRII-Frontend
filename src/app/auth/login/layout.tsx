import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
	title: 'Sistema de Gestión de Calidad',
	description: 'Sistema de Gestión de Calidad'
}

export default function AutLayout({ children }: { children: ReactNode}) {
	return (
		<main>
			<section className='relative py-40 min-h-screen w-screen h-screen'>
				<div
					className='absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full'
				/>
				{children}
			</section>
		</main>
	)
}