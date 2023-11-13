'use client'
import React, { useState } from 'react'
import Alert from './alert'

type Toast = {
    variant :'Success' | 'Warning' | 'Danger' | 'Info' | 'Neutral';
    text : string;
}
export default function useAlert() {
	const [list, setAlerts] = useState<Toast[]>([])
	const createToast = (options:Toast) => {
		setAlerts([...list, options])
		setTimeout(() => {
			setAlerts((l) => l.slice(1))
		}, 5000)
	}
	const alerts = (
		<div className='fixed w-full mx-auto bottom-0 '>
			{list.map((t) => (
				<Alert variant={t.variant}> {t.text} </Alert>
			))}
		</div>
	)
	return {
		alerts,
		createToast
	}
}