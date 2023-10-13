'use client'

import { useState } from 'react'
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import StandardTable from '@/components/Table/StandardTable'
import AssignmentModal from '@/components/Modal/AssignmentModal'

const page = () => {
	const [showModal, setShowModal] = useState(false)
	const [idStandard, setIdStandard] = useState('')

	const handleOpenModal = (id: string) => {
		setShowModal(true)
		setIdStandard(id)
	}

	return (
		<ContentWrapper className='bg-white h-[670px] -top-24 w-[96%] m-auto rounded-md py-5 px-10'>
			<div className='flex w-full mb-5'>
				<h2>Encargados de estándares del sistema</h2>
			</div>
			<StandardTable onOpenModal={(id) => handleOpenModal(id)}/>
			{showModal ? <AssignmentModal idStandard={idStandard} openModal={showModal} onCloseModal={() => setShowModal(false)}/> : <></>}
		</ContentWrapper>
	)
}

export default page