/* eslint-disable multiline-ternary */
import EvidencesTable from '@/components/Table/EvidencesTable'
import CustomModal from '../CustomModal'
import { useState } from 'react'
import UploadEvidenceModal from './UploadEvidenceModal'

const ImprovementEvidencesModal = ({
	openModal,
	onCloseModal,
	id,
	planId
}: {
	openModal: boolean
	onCloseModal: () => void
	id: string
	planId: string
}) => {
	// const [showModal, setShowModal] = useState<boolean>(false)
	// const [reload, setReload] = useState<boolean>(false)

	return (
		<CustomModal
			isOpen={openModal}
			classNames={{
				base: 'h-[90%]',
				header: 'p-2 border-b-[2px] border-gray-200',
				body: 'h-[55%] py-2'
			}}
			size='5xl'
			onClose={() => onCloseModal()}
			header={<h2 className='flex flex-col gap-1 ml-4 text-lightBlue-600 uppercase'>Evidencias del Plan de Mejora</h2>}
			body={
				<>
					<EvidencesTable
						id={id}
						typeEvidence='3'
						plandId={planId}
					/>
					{/* {showModal && (
						<UploadEvidenceModal
							id={id}
							typeEvidence='3'
							path='/'
							openModal={showModal}
							onCloseModal={() => setShowModal(false)}
							onReload={() => setReload(true)}
							planId={planId}
						/>
					)} */}
				</>
			}
		/>
	)
}

export default ImprovementEvidencesModal
