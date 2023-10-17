'use client'

import React, { useState } from 'react'

import { Tabs, Tab } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

export default function TabStandard({ id, children }: { id: string; children: React.ReactNode }) {
	const { push } = useRouter()
	const [selected, setSelected] = useState('narrative')

	const tabs = [
		{
			id: 'narrative',
			label: 'narrativas'
		},
		{
			id: 'evidence_planning',
			label: 'evidencia de planificacion'
		},
		{
			id: 'evidence_results',
			label: 'evidencia de resultados'
		},
		{
			id: 'evidence_improvements',
			label: 'evidencia de mejoras'
		}
	]

	const handleClick = (value: string) => {
		push(`/dashboard/standards/${id}/${value}`)
		setSelected(value)
	}

	return (
		<div className='flex h-full w-full flex-col absolute -top-12 -left-1 -right-'>
			<Tabs
				aria-label='Dynamic tabs'
				items={tabs}
				variant='light'
				classNames={{
					tab: 'rounded-t-xl rounded-b-none h-11',
					tabContent: 'group-data-[selected=true]:text-blue-600 text-white text-md uppercase',
					cursor: 'bg-gray-100 rounded-t-xl rounded-b-none',
					panel: 'absolute top-[42px] bg-gray-100 h-full p-10 w-full'
				}}
				selectedKey={selected}
				onSelectionChange={(key) => handleClick(key.toString())}
			>
				{(item) => (
					<Tab key={item.id} title={item.label}>
						{children}
					</Tab>
				)}
			</Tabs>
		</div>
	)
}
