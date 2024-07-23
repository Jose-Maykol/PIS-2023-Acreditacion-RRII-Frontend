import React from 'react'
import EmptyEvidenceIcon from '../Icons/EmptyEvidenceIcon'

interface Props {
    description: string
}
export function EmptyEvidenceData ({ description }: Props) {
	return (
		<div className='flex flex-col items-center justify-center max-h-[445px] h-[445px]'>
			<EmptyEvidenceIcon width = {180} height = {180}/>
			<p className='uppercase text-center text-md text-bold mt-8'>{description}</p>
		</div>
	)
}