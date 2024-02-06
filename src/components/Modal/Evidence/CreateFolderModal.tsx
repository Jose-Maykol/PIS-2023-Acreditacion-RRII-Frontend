/* eslint-disable @typescript-eslint/no-explicit-any */
import { EvidenceService } from '@/api/Evidence/EvidenceService'
import { Button, Input, Checkbox } from '@nextui-org/react'
import { useState, useMemo, ReactNode } from 'react'
import { useToast } from '@/hooks/toastProvider'
import CustomModal from '../CustomModal'

interface CreateFolderModalProps {
	id: number
	typeEvidence: number
	path: string
	folderId: number
	openModal: boolean
	onCloseModal: () => void
	onReload: () => void
}

export default function CreateFolderModal({ id, typeEvidence, path, folderId, openModal, onCloseModal, onReload } : CreateFolderModalProps) {
	const [folderName, setFolderName] = useState<string>('Carpeta sin titulo')
	const [isSelected, setIsSelected] = useState<boolean>(false)
	const { showToast, updateToast } = useToast()

	const validateFolderName = (folderName: string) => /^[A-Za-zñÑ][A-Za-z0-9ñÑ.\-_ ]{0,59}$/i.test(folderName)

	const isInvalid = useMemo(() => {
		if (folderName === '') return true

		return !validateFolderName(folderName)
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
			type_evidence_id: typeEvidence,
			path,
			folder_id: folderId,
			is_evidence: isSelected
		}).then((res) => {
			if (res.status === 1) {
				updateToast(notification, res.message, 'success')
			} else {
				updateToast(notification, res.message, 'error')
			}
		}).catch((err) => {
			updateToast(notification, err.response.data.message, 'error')
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
				radius='sm'
				defaultValue='Carpeta sin titulo'
				variant='bordered'
				isInvalid={isInvalid}
				color={isInvalid ? 'danger' : 'default'}
				errorMessage={isInvalid && 'Ingresa un nombre de carpeta válido'}
				onValueChange={setFolderName}
			/>
			<div className='flex justify-between mt-2 mx-1'>
				<Checkbox
					size='sm'
					radius='none'
					classNames={{
						wrapper: `border-2 ${isSelected ? 'border-lightBlue-600' : 'border-default-500'}`,
						label: 'text-default-600 text-sm'
					}}
					isSelected={isSelected}
					onValueChange={setIsSelected}
				>
					Carpeta de Evidencia
				</Checkbox>
				<p className='text-default-600 text-sm'>{folderName.length}/60</p>
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
						<Button className='bg-lightBlue-600 text-white' variant='solid' onPress={handleSubmitChanges} isDisabled={isInvalid}>
							Crear
						</Button>
					</>
				}
			/>
		</>
	)
}
