'use client'

import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import ImprovementPlanForm from '@/components/Form/ImprovementPlanForm/New/ImprovementPlanForm'

type NewImprovementPlanPageProps = {
	params: {
		id: string
	}
}

export default function NewImprovementPlanPage({ params }: NewImprovementPlanPageProps) {
	return (
		<ContentWrapper className='bg-white w-[96%] m-auto rounded-md py-5 px-10'>
			<ImprovementPlanForm standardId={params.id} />
		</ContentWrapper>
	)
}
