import React from 'react'
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import HeaderStandards from '@/components/Header/HeaderStandards'
import TabStandard from '@/components/Tabs/TabStandard'

export default function StandardsIdPage({ params, children }: { params: { id: string }, children: React.ReactNode }) {
	const { id } = params

	return (
		<div className='h-full bg-gray mb-5'>
			<ContentWrapper className='bg-lightBlue-600 pb-20 pmax-h-[580px]'>
				<HeaderStandards id={id}/>
			</ContentWrapper>
			<ContentWrapper className='bg-white p-2 h-[600px] m-auto rounded-md'>
				<TabStandard id={id} children={children}/>
			</ContentWrapper>
		</div>
	)
}