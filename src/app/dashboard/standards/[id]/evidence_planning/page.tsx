'use client'

import ContentWrapper from '@/components/atoms/ContentWrapper/ContentWrapper'
import UserTable from '@/components/molecules/Tables/UserTable'

export default function EvidencePlanningPage() {
	return (
		<ContentWrapper className='bg-white h-[670px] w-[96%] m-auto rounded-md py-5 px-10'>
			<div className='flex w-full mb-5'>
				<h2>Evidencia de Planificacion</h2>
			</div>
			<UserTable />
		</ContentWrapper>
	)
}