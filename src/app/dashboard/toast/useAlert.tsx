'use client'
import React, { useState } from 'react'
import Alert from './alert'

type Toast = {
    variant :'success' | 'warning' | 'danger';
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
		<div className='fi  xed w-full bottom-0 '>
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