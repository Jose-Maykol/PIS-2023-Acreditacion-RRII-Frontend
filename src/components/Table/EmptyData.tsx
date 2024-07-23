import React from 'react'
import EmptyDataIcon from '../Icons/EmptyDataIcon'
interface Props {
    description: string
}
export function EmptyData ({ description }: Props) {
	return (
		<div className='flex flex-col items-center justify-center max-h-[445px] h-[445px]'>
			<EmptyDataIcon width = {180} height = {180}/>
			<p className='uppercase text-center text-md text-bold mt-8'>{description}</p>
		</div>
	)
}