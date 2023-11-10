'use client'
import React, { ReactNode } from 'react'
/* import error from '@img/error.svg'
import check from '@img/check.svg'
import info from '@img/info.svg'
import warning from '@img/warning.svg' */

type AlertProps = {
    variant? : 'success' | 'warning' | 'danger';
    children : ReactNode;
}

export default function Alert({ variant = 'success', children } : AlertProps) {
	const classVariants = {
		success:
            'p-4  shadow inline-block max-w-lg bg-green-300 text-green-900 rounded-md m-2',
		warning:
            'p-4  shadow inline-block max-w-lg bg-yellow-300 text-yellow-900 rounded-md m-2',
		danger:
            'p-4  shadow inline-block max-w-lg bg-red-300 text-red-900 rounded-md m-2'
	}
	return (
		<div className = {classVariants[variant] + ' flex gap-2 items-center mx-auto'}>
			<span className='text-2xl'>
{/* 				{ variant === 'success'
					? (<img src={check} alt ='check'></img>)
					: variant === 'warning'
						? (<img src={warning} alt ='warning'></img>)
						: variant === 'danger'
							? (<img src={error} alt ='error'></img>)
							: (<img src={info} alt ='info'></img>)} */}
			</span>
			{children}
		</div>
	)
}