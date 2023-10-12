'use client'

import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import UserTable from '@/components/Table/UserTable'

export default function EvidenceResultsPage() {
	return (
		<ContentWrapper className='bg-white h-[670px] w-[96%] m-auto rounded-md py-5 px-10'>
			<div className='flex w-full mb-5'>
				<h2>Evidencia de Resultados</h2>
			</div>
			<UserTable />
		</ContentWrapper>
	)
}