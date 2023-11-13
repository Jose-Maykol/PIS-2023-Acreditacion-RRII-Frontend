'use client'

import { useState } from 'react'
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import StandardTable from '@/components/Table/StandardTable'
import AssignmentModal from '@/components/Modal/StandardManagement/AssignmentModal'

const page = () => {
	return (
		<ContentWrapper className='bg-white h-[670px] -top-24 w-[96%] m-auto rounded-md py-5 px-10'>
			<div className='flex w-full mb-5'>
				<h2 className='text-2xl font-semibold'>Encargados de estándares del sistema</h2>
			</div>
			<StandardTable />
		</ContentWrapper>
	)
}

export default page