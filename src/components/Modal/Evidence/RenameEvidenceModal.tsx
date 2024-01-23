/* eslint-disable @typescript-eslint/no-explicit-any */
import { EvidenceService } from '@/api/Evidence/EvidenceService'
import { Evidence } from '@/types/Evidences'
import { Button, Input } from '@nextui-org/react'
import { useState, useMemo, ReactNode } from 'react'
import { useToast } from '@/hooks/toastProvider'
import CustomModal from '../CustomModal'

interface RenameEvidenceModalProps {
	evidence: Evidence
	openModal: boolean
	onCloseModal: () => void
	onReload: () => void
}
export default function RenameEvidenceModal({ evidence, openModal, onCloseModal, onReload } : RenameEvidenceModalProps) {
	const [newNameEvidence, setNewNameEvidence] = useState<string>(evidence.name)
	const { showToast, updateToast } = useToast()
	const validateNewNameEvidence = (newNameEvidence: string) => newNameEvidence.match(/^[A-Za-z0-9.\-_ ]{1,100}$/)

	const isInvalid = useMemo(() => {
		if (newNameEvidence === '') return false

		return Boolean(validateNewNameEvidence(newNameEvidence))
	}, [newNameEvidence])

	const handleCloseModal = () => {
		setNewNameEvidence('')
		onCloseModal()
		onReload()
	}

	const handleSubmitChanges = async () => {
		const notification = showToast('Procesando...')
		if (evidence.type === 'evidence') {
			await EvidenceService.renameEvidence(evidence.id.split('-')[1], {
				new_filename: newNameEvidence
			}).then((res) => {
				if (res.status === 1) {
					updateToast(notification, res.message, 'success')
				} else {
					updateToast(notification, res.message, 'error')
				}
			})
		} else {
			await EvidenceService.renameFolder(evidence.id.split('-')[1], {
				new_name: newNameEvidence
			}).then((res) => {
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
			Cambiar nombre de {evidence.type === 'evidence' ? 'archivo' : 'carpeta'}
		</h2>
	)

	const body: ReactNode = (
		<div className='h-full max-h-[96%]'>
			<Input
				autoFocus
				variant='bordered'
				value={newNameEvidence}
				isInvalid={isInvalid}
				color={isInvalid ? 'danger' : 'success'}
				errorMessage={isInvalid && 'Ingresa un nombre válido'}
				onValueChange={setNewNameEvidence}
			/>
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
