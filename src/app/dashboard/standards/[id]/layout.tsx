import React from 'react'
import ContentWrapper from '@/components/atoms/ContentWrapper/ContentWrapper'
import HeaderStandards from '@/components/molecules/Header/HeaderStandards'
import TabStandard from '@/components/atoms/Tabs/TabStandard'

export default function StandardsIdPage({ params, children }: { params: { id: string }, children: React.ReactNode }) {
	const { id } = params

	return (
		<div className='h-full'>
			<ContentWrapper className='bg-lightBlue-600 p-4 h-full max-h-[580px]'>
				<HeaderStandards id={id}/>
			</ContentWrapper>
			<ContentWrapper className='bg-white p-2 h-[600px] m-auto rounded-md'>
				<TabStandard id={id} children={children}/>
			</ContentWrapper>
		</div>
	)
}