'use client'

import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import NarrativeEditor from '@/components/Editor/NarrativeEditor'

interface EditNarrativePageParams {
  params: {
		id: number
	}
}

export default function EditNarrativePage({ params }: EditNarrativePageParams) {
	return (
		<ContentWrapper className='bg-white h-full w-full m-auto rounded-md py-5 px-10'>
			<NarrativeEditor id={params.id} />
		</ContentWrapper>
	)
}