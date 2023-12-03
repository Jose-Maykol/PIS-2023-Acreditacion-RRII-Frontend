/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Select,
	SelectItem,
	Selection
} from '@nextui-org/react'
import DateSemesterService from '@/api/DateSemester/DateSemester'
import { useToast } from '@/hooks/toastProvider'

interface EditSemesterModalProps {
	isOpen: boolean
	onOpenChange: (isOpen: boolean) => void
}

export default function CreateSemesterModal({ isOpen, onOpenChange }: EditSemesterModalProps) {
	const semesters = [{ value: 'A' }, { value: 'B' }]
	const [yearValue, setYearValue] = useState<string >('')
	const [semesterValue, setSemesterValue] = useState<Selection>(new Set([]))
	const [isValidYear, setIsValidYear] = useState<boolean | null >(null)
	const [isValidSemester, setIsValidSemester] = useState<boolean | null >(null)
	const [touchedSemester, setTouchedSemester] = useState(false)
	const { showToast, updateToast } = useToast()

	const validateYear = (value:string) => {
		return /^\d{4}$/.test(value)
	}

	const handleDateValue = (value: string): void => {
		setYearValue(value)
		setIsValidYear(validateYear(value))
	}

	const handleSemesterValue = (value: Selection): void => {
		setSemesterValue(value)
		setIsValidSemester((value as any).size > 0)
	}

	const handleSubmit = () => {
		const notification = showToast('Procesando...')
		DateSemesterService.create({
			year: parseInt(yearValue),
			semester: (semesterValue as any).values().next().value as string
		}).then((res) => {
			if (res.status === 1) {
				updateToast(notification, res.message, 'success')
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
				setYearValue('')
				setSemesterValue(new Set([]))
				setIsValidYear(null)
				setIsValidSemester(null)
				setTouchedSemester(false)
			}}
			placement='center'
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className='flex flex-col gap-1 text-lightBlue-600 uppercase'>
							Editar semestre
						</ModalHeader>
						<ModalBody>
							<Input
								autoFocus
								label='Año'
								placeholder='Ingrese el año'
								variant='bordered'
								color={!isValidYear && isValidYear !== null ? 'danger' : 'default'}
								isInvalid={!isValidYear && isValidYear !== null}
								errorMessage={!isValidYear && isValidYear !== null ? 'Año inválido' : ''}
								onValueChange={handleDateValue}
							/>
							<Select
								items={semesters}
								name='semester'
								placeholder='Semestre'
								label='Semestre'
								variant='bordered'
								size='sm'
								selectionMode='single'
								errorMessage={ semesterValue || !touchedSemester ? '' : 'Seleccione un semestre'}
								isInvalid={!(isValidSemester || !touchedSemester)}
								onSelectionChange={handleSemesterValue}
								onClose={() => setTouchedSemester(true)}
								classNames={{
									trigger: 'h-[56px]'
								}}
							>
								{(semesters) => <SelectItem key={semesters.value}>{semesters.value}</SelectItem>}
							</Select>
						</ModalBody>
						<ModalFooter>
							<Button
								color='danger'
								variant='flat'
								onPress={() => {
									onClose()
									setIsValidYear(null)
									setTouchedSemester(false)
								}}
							>
								Cancelar
							</Button>
							<Button
								color='primary'
								isDisabled={!isValidYear || !isValidSemester || !touchedSemester}
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