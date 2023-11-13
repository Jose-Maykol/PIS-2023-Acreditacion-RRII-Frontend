/* eslint-disable no-mixed-spaces-and-tabs */
'use client'
import * as React from 'react'
import useAlert from './useAlert'
export default function UsersToast() {
	const { alerts, createToast } = useAlert()
	const addAlert = () => {
		createToast({
			variant: 'Neutral',
			text: 'Mensaje generico'
		})
	}
	return (
		<div>
			<button onClick = {addAlert} className='bg-blue-500 p-2 rounded text-white m-4'>
        		Agregar alerta
			</button>
			{alerts}
		</div>
	)
}
