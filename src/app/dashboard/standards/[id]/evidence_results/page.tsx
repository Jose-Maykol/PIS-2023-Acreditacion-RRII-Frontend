'use client'

import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import ImprovementPlansTable from '@/components/Table/ImprovementPlansTable'

export default function EvidenceResultsPage() {
	return (
		<ContentWrapper className='bg-white h-[670px] w-[96%] m-auto rounded-md py-5 px-10'>
			<ImprovementPlansTable />
		</ContentWrapper>
	)
}
