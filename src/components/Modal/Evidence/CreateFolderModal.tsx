/* eslint-disable @typescript-eslint/no-explicit-any */
import { EvidenceService } from '@/api/Evidence/EvidenceService'
import { Button, Input } from '@nextui-org/react'
import { useState, useMemo, ReactNode } from 'react'
import { useToast } from '@/hooks/toastProvider'
import CustomModal from '../CustomModal'

interface CreateFolderModalProps {
	id: number
	typeEvidence: number
	path: string
	openModal: boolean
	onCloseModal: () => void
	onReload: () => void
}

export default function CreateFolderModal({ id, typeEvidence, path, openModal, onCloseModal, onReload } : CreateFolderModalProps) {
	const [folderName, setFolderName] = useState<string>('')
	const { showToast, updateToast } = useToast()

	const validateFolderName = (folderName: string) => folderName.match(/^[A-Za-z0-9.\-_ ]{1,100}$/)

	const isInvalid = useMemo(() => {
		if (folderName === '') return false

		return Boolean(validateFolderName(folderName))
	}, [folderName])

	const handleCloseModal = () => {
		onCloseModal()
		onReload()
	}

	const handleSubmitChanges = async () => {
		const notification = showToast('Procesando...')
		await EvidenceService.createFolder({
			name: folderName,
			standard_id: id,
			evidence_type_id: typeEvidence,
			path
		}).then((res) => {
			if (res.status === 1) {
				updateToast(notification, res.message, 'success')
			} else {
				updateToast(notification, res.message, 'error')
			}
		})
		handleCloseModal()
	}

	const header: ReactNode = (
		<h2 className='flex flex-col gap-1 text-lightBlue-600 uppercase'>
			Crear carpeta
		</h2>
	)

	const body: ReactNode = (
		<div className='h-full max-h-[96%]'>
			<Input
				autoFocus
				defaultValue='Carpeta sin título'
				variant='bordered'
				isInvalid={isInvalid}
				color={isInvalid ? 'danger' : 'success'}
				errorMessage={isInvalid && 'Ingresa un nombre de carpeta válido'}
				onValueChange={setFolderName}
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
