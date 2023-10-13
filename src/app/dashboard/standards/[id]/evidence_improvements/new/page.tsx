'use client'

import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import ImprovementPlanForm from '@/components/Form/ImprovementPlanForm'

type NewImprovementPlanPageProps = {
	params: {
		standardId: string
	}
}

export default function NewImprovementPlanPage({ params }: NewImprovementPlanPageProps) {
	return (
		<ContentWrapper className='bg-white h-[670px] w-[96%] m-auto rounded-md py-5 px-10'>
			<ImprovementPlanForm standardId={params.standardId} />
		</ContentWrapper>
	)
}
