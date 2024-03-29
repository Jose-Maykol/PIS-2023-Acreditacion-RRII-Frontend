'use client'

import React, { useState, useEffect } from 'react'

import { Tabs, Tab } from '@nextui-org/react'
import { useRouter, usePathname } from 'next/navigation'
import { useNarrativeStore } from '@/store/useNarrativeStore'
import { useToast } from '@/hooks/toastProvider'

export default function TabStandard({ id, children }: { id: string; children: React.ReactNode }) {
	const { push } = useRouter()
	const pathname = usePathname()

	const [selected, setSelected] = useState('narrative')
	const { isEditingNarrative } = useNarrativeStore()
	const { showToast, updateToast } = useToast()

	useEffect(() => {
		setSelected(pathname.split('/')[4] || 'narrative')
	}, [pathname, id])

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
		if (isEditingNarrative) {
			const notification = showToast('verificando...')
			updateToast(notification, 'No es posible realizar esta acción mientras la narrativa este siendo editada', 'info')
			return
		}

		push(`/dashboard/standards/${id}/${value}`)
	}

	return (
		<div className='flex h-full w-full flex-col absolute -top-12 -left-1 -right-'>
			<Tabs
				aria-label='Dynamic tabs'
				items={tabs}
				variant='light'
				classNames={{
					// base: 'group-data-[disabled=true]: text-white text-md uppercase font-bold',
					tab: 'rounded-t-xl rounded-b-none h-11',
					tabContent: 'group-data-[selected=true]:text-blue-600 text-white text-md uppercase font-bold',
					cursor: 'bg-gray-100 rounded-t-xl rounded-b-none',
					panel: 'absolute top-[42px] bg-gray-100 flex p-10 w-[101%]'
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
