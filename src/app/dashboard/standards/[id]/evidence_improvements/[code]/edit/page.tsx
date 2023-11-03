'use client'

import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import ImprovementPlanEditForm from '@/components/Form/ImprovementPlanForm/Edit/ImprovementPlanEditForm'

export default function ImprovementPlanEditPage({
	params
}: {
	params: {
		code: string
		id: string
	}
}) {
	return (
		<ContentWrapper className='bg-white h-[670px] w-[96%] m-auto rounded-md py-5 px-10'>
			<ImprovementPlanEditForm params={params} />
		</ContentWrapper>
	)
}
