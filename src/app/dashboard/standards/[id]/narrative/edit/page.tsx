'use client'

import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import EditorSkeleton from '@/components/Skeletons/EditorSkeleton'
import dynamic from 'next/dynamic'
import EvidencesNarrativeTable from '@/components/Table/EvidencesNarrativeTable'

interface EditNarrativePageParams {
  params: {
		id: number,
	}
}

export default function EditNarrativePage({ params }: EditNarrativePageParams) {
	const NarrativeEditor = dynamic(() => import('@/components/Editor/NarrativeEditor'), {
		ssr: false,
		loading: () => <EditorSkeleton />
	})

	return (
		<ContentWrapper className='bg-white h-full w-full m-auto rounded-md py-5 px-10 flex gap-5'>
			<div className='flex-1'>
				<EvidencesNarrativeTable id={String(params.id)} />
			</div>
			<div className='flex-1'>
				<NarrativeEditor id={params.id} />
			</div>
		</ContentWrapper>
	)
}