/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader
} from '@nextui-org/react'

interface EditSemesterModalProps {
	isOpen: boolean
	onOpenChange: (isOpen: boolean) => void
}

export default function EditSemesterModal({ isOpen, onOpenChange }: EditSemesterModalProps) {
	const [dateValue, setDateValue] = useState('')
	const [isValid, setIsValid] = useState<boolean | null >(null)

	const validateDate = (value:string) => {
		// valida la fecha en formato dd/mm/yyyy
		return /^\d{2}\/\d{2}\/\d{4}$/.test(value)
	}

	const handleDateValue = (value: string): void => {
		setDateValue(value)
		setIsValid(validateDate(value))
	}

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			className='w-[500px]'
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className='flex flex-col gap-1 text-lightBlue-600 uppercase'>Editar semestre</ModalHeader>
						<ModalBody>
							<div className='flex flex-row items-center'>
								<Input
									autoFocus
									label='Fecha de cierre'
									placeholder='dd/mm/yyyy'
									variant='bordered'
									color={isValid ? 'default' : 'danger'}
									isInvalid={!isValid}
									errorMessage={isValid ? '' : 'Fecha invalida'}
									onValueChange={handleDateValue}
								/>
							</div>
						</ModalBody>
						<ModalFooter>
							<Button
								color='danger'
								variant='flat'
								onPress={() => {
									onClose()
									setIsValid(true)
								}}
							>
								Cancelar
							</Button>
							<Button
								color='primary'
								isDisabled={!isValid}
								onPress={() => {
									// handleSubmit()
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