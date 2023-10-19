'use client'

import { useState } from 'react'
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import StandardTable from '@/components/Table/StandardTable'
import AssignmentModal from '@/components/Modal/StandardManagement/AssignmentModal'

const page = () => {
	const [showModal, setShowModal] = useState<boolean>(false)
	const [idStandard, setIdStandard] = useState<string>('')
	const [reload, setReload] = useState<boolean>(false)

	const handleOpenModal = (id: string) => {
		setShowModal(true)
		setIdStandard(id)
	}

	return (
		<ContentWrapper className='bg-white h-[670px] -top-24 w-[96%] m-auto rounded-md py-5 px-10'>
			<div className='flex w-full mb-5'>
				<h2>Encargados de estándares del sistema</h2>
			</div>
			<StandardTable reload={reload} onReload={() => setReload(false)} onOpenModal={(id) => handleOpenModal(id)}/>
			{showModal ? <AssignmentModal idStandard={idStandard} openModal={showModal} onCloseModal={() => setShowModal(false)} onReload={() => setReload(true)}/> : <></>}
		</ContentWrapper>
	)
}

export default page