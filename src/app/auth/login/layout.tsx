import React from 'react'

export default function AutLayout({ children }: {children: React.ReactNode}) {
	return (
		<main>
			<section className='min-w-full min-h-screen w-screen h-screen bg-blueGray-800'>
				{children}
			</section>
		</main>
	)
}