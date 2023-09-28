import React from 'react'

export default function AutLayout({
	children
}: {
  children: React.ReactNode
}) {
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