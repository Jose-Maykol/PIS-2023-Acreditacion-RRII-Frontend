'use client'
import React, { ReactNode } from 'react'
import SuccessIcon from '@/components/Icons/SuccessIcon'
import DangerIcon from '@/components/Icons/DangerIcon'
import InfoIcon from '@/components/Icons/InfoIcon'
import WarningIcon from '@/components/Icons/WarningIcon'
type AlertProps = {
    variant? : 'Success' | 'Warning' | 'Danger' | 'Info' |'Neutral';
    children : ReactNode;
}

export default function Alert({ variant = 'Success', children } : AlertProps) {
	const classVariants = {
		Success:
            'bg-green-50',
		Warning:
            'bg-warning-50',
		Danger:
            'bg-danger-50',
		Info:
			'bg-primary-50',
		Neutral:
			'bg-neutral-50'
	}
	const classVariantsLeft = {
		Success:
			'bg-success-300',
		Warning:
			'bg-warning-300',
		Danger:
			'bg-danger-300 ',
		Info:
			'bg-primary-300',
		Neutral:
			'bg-neutral-300'
	}
	return (
		<div className = {classVariants[variant] + ' b-0 max-w-lg rounded-md m-2 shadow-md inline-block  text-black p-2 pl-9 relative flex gap-2 items-center mx-auto'}>
			<div className = {classVariantsLeft[variant] + ' absolute rounded-l-md w-3.5 left-0 h-full'}></div>
			<span className='text-2xl'>
				{ variant === 'Success'
					? (<SuccessIcon width={35} height={35} fill='fill-success-300' variant='line' />)
					: variant === 'Warning'
						? (<WarningIcon width={35} height={35} fill='fill-warning-300' variant='line' />)
						: variant === 'Danger'
							? (<DangerIcon width={35} height={35} fill='fill-danger-300' variant='line' />)
							: variant === 'Info'
								? (<InfoIcon width={35} height={35} fill='fill-primary-300' variant='line' />)
								: (<SuccessIcon width={35} height={35} fill='fill-neutral-300' variant='line' />)}
			</span>
			<div className = 'ml-4'>
				<h3 className = 'text-black tex-lg font-bold'>{variant}</h3>
				{children}
			</div>
		</div>
	)
}