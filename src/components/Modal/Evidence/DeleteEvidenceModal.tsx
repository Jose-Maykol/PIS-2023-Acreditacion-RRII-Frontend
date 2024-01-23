/* eslint-disable @typescript-eslint/no-explicit-any */
import { EvidenceService } from '@/api/Evidence/EvidenceService'
import { Button } from '@nextui-org/react'
import { ReactNode } from 'react'
import { useToast } from '@/hooks/toastProvider'
import CustomModal from '../CustomModal'

interface DeleteEvidenceModalProps {
	id: string
	type: string
	openModal: boolean
	onCloseModal: () => void
	onReload: () => void
}

export default function DeleteEvidenceModal({ id, type, openModal, onCloseModal, onReload } : DeleteEvidenceModalProps) {
	const { showToast, updateToast } = useToast()
	const handleCloseModal = () => {
		onCloseModal()
		onReload()
	}

	const handleSubmitChanges = async () => {
		const notification = showToast('Procesando...')

		if (type === 'evidence') {
			await EvidenceService.deleteEvidence(id).then((res) => {
				if (res.status === 1) {
					updateToast(notification, res.message, 'success')
				} else {
					updateToast(notification, res.message, 'error')
				}
			})
		} else {
			await EvidenceService.deleteFolder(id).then((res) => {
				if (res.status === 1) {
					updateToast(notification, res.message, 'success')
				} else {
					updateToast(notification, res.message, 'error')
				}
			})
		}
		handleCloseModal()
	}

	const header: ReactNode = (
		<h2 className='flex flex-col gap-1 text-lightBlue-600 uppercase'>
			Eliminar
		</h2>
	)

	const body: ReactNode = (
		<div className='h-full max-h-[96%]'>
			<p>¿Está seguro que desea eliminar {type === 'evidence' ? 'este archivo' : 'esta carpeta'} de evidencia?</p>
		</div>
	)

	return (
		<>
			<CustomModal
				isOpen={openModal}
				size='xl'
				onClose={handleCloseModal}
				header={header}
				body={body}
				footer={
					<>
						<Button color='danger' variant='flat' onPress={handleCloseModal}>
							Cancelar
						</Button>
						<Button className='bg-lightBlue-600 text-white' variant='solid' onPress={handleSubmitChanges}>
							Guardar
						</Button>
					</>
				}
			/>
		</>
	)
}
