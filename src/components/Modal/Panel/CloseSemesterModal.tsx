import DateSemesterService from '@/api/DateSemester/DateSemester'
import { useToast } from '@/hooks/toastProvider'
import { useYearSemesterStore } from '@/store/useYearSemesterStore'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'

interface CloseSemesterModalProps {
	isOpen: boolean
	onOpenChange: (isOpen: boolean) => void
}

export default function CloseSemesterModal ({ isOpen, onOpenChange }: CloseSemesterModalProps) {
	const { showToast, updateToast } = useToast()

	const handleSubmit = async () => {
		const yesterday = new Date()
		yesterday.setDate(yesterday.getDate() - 1)
		const year = yesterday.getFullYear()
		const month = String(yesterday.getMonth() + 1).padStart(2, '0')
		const day = String(yesterday.getDate()).padStart(2, '0')
		const formattedYesterday = `${year}-${month}-${day}`
		const notification = showToast('Procesando...')
		DateSemesterService.close({ closing_date: formattedYesterday }).then((res) => {
			if (res.status === 1) {
				updateToast(notification, res.message, 'success')
				useYearSemesterStore.setState({
					closingDate: formattedYesterday
				})
			} else {
				updateToast(notification, res.message, 'error')
			}
		}).catch((err) => {
			updateToast(notification, err.response.data.message, 'error')
		})
	}

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={() => {
				onOpenChange(false)
			}}
			placement='center'
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className='flex flex-col gap-1'>
              Confirmación
						</ModalHeader>
						<ModalBody>
							<p className='text-base'>¿Está seguro que desea cerrar el semestre actual?</p>
						</ModalBody>
						<ModalFooter>
							<Button
								color='danger'
								variant='flat'
								onClick={() => {
									onClose()
								}}
							>
                Cancelar
							</Button>
							<Button
								color='primary'
								onClick={() => {
									handleSubmit()
									onClose()
								}}
							>
                Cerrar semestre
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}