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
		<ContentWrapper className='bg-white w-[96%] m-auto rounded-md'>
			<div className='px-5 py-8'>
				<ImprovementPlanForm standardId={params.id} />
			</div>
		</ContentWrapper>
	)
}
