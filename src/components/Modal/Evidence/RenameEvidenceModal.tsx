/* eslint-disable @typescript-eslint/no-explicit-any */
import { EvidenceService } from '@/api/Evidence/EvidenceService'
import { Evidence } from '@/types/Evidences'
import { Button, Input } from '@nextui-org/react'
import { useState, useMemo, ReactNode } from 'react'
import { useToast } from '@/hooks/toastProvider'
import CustomModal from '../CustomModal'
import _ from 'lodash'

interface RenameEvidenceModalProps {
	evidence: Evidence
	openModal: boolean
	onCloseModal: () => void
	onReload: () => void
}

export default function RenameEvidenceModal({ evidence, openModal, onCloseModal, onReload } : RenameEvidenceModalProps) {
	const [newNameEvidence, setNewNameEvidence] = useState<string>(evidence.name)
	const { showToast, updateToast } = useToast()

	const validateNewNameEvidence = (newNameEvidence: string) => /^[A-Za-zñÑ][A-Za-z0-9ñÑ.\-_ ]{0,59}$/i.test(newNameEvidence)

	const isInvalid = useMemo(() => {
		if (newNameEvidence === '') return true

		return !validateNewNameEvidence(newNameEvidence)
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
			Cambiar nombre
		</h2>
	)

	const body: ReactNode = (
		<div className='h-full max-h-[96%]'>
			<Input
				autoFocus
				radius='sm'
				variant='bordered'
				value={newNameEvidence}
				isInvalid={isInvalid}
				color={isInvalid ? 'danger' : 'default'}
				errorMessage={isInvalid && 'Ingresa un nombre válido'}
				onValueChange={setNewNameEvidence}
			/>
			<div className='flex justify-end mt-2 mx-1'>
				<p className='text-default-600 text-sm'>{newNameEvidence.length}/60</p>
			</div>
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
						<Button className='bg-lightBlue-600 text-white' variant='solid' onPress={handleSubmitChanges} isDisabled={isInvalid || _.isEqual(newNameEvidence, evidence.name)}>
							Aceptar
						</Button>
					</>
				}
			/>
		</>
	)
}
