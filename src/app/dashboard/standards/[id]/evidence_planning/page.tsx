'use client'

import { useState } from 'react'
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import EvidencesTable from '@/components/Table/EvidencesTable'
import UploadEvidenceModal from '@/components/Modal/Evidence/UploadEvidenceModal'

type EvidencePlanningPageParams = {
	params: {
		id: string
	}
}

export default function EvidencePlanningPage({ params }: EvidencePlanningPageParams) {
	const [showModal, setShowModal] = useState<boolean>(false)
	const [idStandard, setIdStandard] = useState<string>(params.id)
	const [reload, setReload] = useState<boolean>(false)

	const handleOpenModal = (id: string) => {
		setShowModal(true)
		setIdStandard(id)
	}

	return (
		<ContentWrapper className='bg-white h-[670px] w-[96%] m-auto rounded-md py-5 px-10'>
			<div className='flex w-full mb-5'>
				<h2>Evidencia de Planificacion</h2>
			</div>
			<EvidencesTable id={idStandard} typeEvidence='1' reload={reload} onReload={() => setReload(false)} onOpenModal={(id) => handleOpenModal(id)}/>
			{showModal ? <UploadEvidenceModal id={idStandard} typeEvidence='1' path='/' openModal={showModal} onCloseModal={() => setShowModal(false)} onReload={() => setReload(true)}/> : <></>}

		</ContentWrapper>
	)
}