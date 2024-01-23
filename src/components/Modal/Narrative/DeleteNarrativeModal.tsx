/* eslint-disable @typescript-eslint/no-explicit-any */
import { NarrativeService } from '@/api/Narrative/narrativeService'
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader
} from '@nextui-org/react'
import { useToast } from '@/hooks/toastProvider'

interface DeleteNarrativeModalProps {
	id: number
	isOpen: boolean
	onOpenChange: (isOpen: boolean) => void
	onDelete: () => void
}

export default function DeleteNarrativeModal ({ id, isOpen, onOpenChange, onDelete }: DeleteNarrativeModalProps) {
	const { showToast, updateToast } = useToast()

	const handleSubmit = async () => {
		const notification = showToast('Procesando...')
		NarrativeService.deleteNarrative(id).then((res) => {
			if (res.status === 1) {
				updateToast(notification, res.message, 'success')
			} else {
				updateToast(notification, res.message, 'error')
			}
			onDelete()
		})
	}

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className='flex flex-col gap-1'>
							Confirmación
						</ModalHeader>
						<ModalBody>
							<p>
								¿Está seguro que desea eliminar la narrativa?
							</p>
						</ModalBody>
						<ModalFooter>
							<Button
								color='danger'
								variant='flat'
								onPress={() => {
									onClose()
								}}
							>
								Cancelar
							</Button>
							<Button
								color='primary'
								onPress={() => {
									handleSubmit()
									onClose()
								}}
							>
								Aceptar
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}