import React from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode}) {
	return (
		<div className='flex flex-row'>
			<section>{children}</section>
		</div>
	)
}