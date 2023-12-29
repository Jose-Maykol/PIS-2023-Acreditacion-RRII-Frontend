/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader
} from '@nextui-org/react'
import DateSemesterService from '@/api/DateSemester/DateSemester'
import { useToast } from '@/hooks/toastProvider'
import { useYearSemesterStore } from '@/store/useYearSemesterStore'
interface EditSemesterModalProps {
	isOpen: boolean
	onOpenChange: (isOpen: boolean) => void
}

export default function EditSemesterModal({ isOpen, onOpenChange }: EditSemesterModalProps) {
	/* const semesters = [{ value: 'A' }, { value: 'B' }] */
	const [dateValue, setDateValue] = useState<string>('')
	/* const [yearValue, setYearValue] = useState<string >('')
	const [semesterValue, setSemesterValue] = useState<Selection>(new Set([]))
	const [isValidYear, setIsValidYear] = useState<boolean | null >(null)
	const [isValidSemester, setIsValidSemester] = useState<boolean | null >(null) */
	const [isValidDate, setIsValidDate] = useState<boolean | null >(null)
	/* const [touchedSemester, setTouchedSemester] = useState(false) */
	const { year, semester, closingDate } = useYearSemesterStore()
	const { showToast, updateToast } = useToast()

	/* const validateYear = (value:string) => {
		return /^\d{4}$/.test(value)
	} */

	const validateDate = (value:string) => {
		// valida la fecha en formato dd-mm-yyyy
		return /^\d{4}-\d{2}-\d{2}$/.test(value)
	}

	const handleDateValue = (value: string): void => {
		setDateValue(value)
		setIsValidDate(validateDate(value))
	}

	/* const handleYearValue = (value: string): void => {
		setYearValue(value)
		setIsValidYear(validateYear(value))
	}

	const handleSemesterValue = (value: Selection): void => {
		setSemesterValue(value)
		setIsValidSemester((value as any).size > 0)
	} */

	const handleSubmit = () => {
		const notification = showToast('Procesando...')
		/* DateSemesterService.edit({
			id_date_semester: id as number,
			year: parseInt(yearValue),
			semester: (semesterValue as any).values().next().value as string,
			closing_date: new Date(dateValue)
		}).then((res) => {
			if (res.status === 1) {
				updateToast(notification, res.message, 'success')
			} else {
				updateToast(notification, res.message, 'error')
			}
		}).catch((err) => {
			updateToast(notification, err.response.data.message, 'error')
		}) */
		console.log(dateValue)
		DateSemesterService.close({
			closing_date: dateValue
		}).then((res) => {
			if (res.status === 1) {
				updateToast(notification, res.message, 'success')
				useYearSemesterStore.setState({
					closingDate: dateValue
				})
			} else {
				updateToast(notification, res.message, 'error')
			}
		}).catch((err) => {
			updateToast(notification, err.response.data.message, 'error')
		})
	}

	useEffect(() => {
		/* 		if (year && semester) {
			setYearValue(year.toString())
			setSemesterValue(new Set([semester.toString()]))
		} */
		setDateValue(closingDate || '')
	}, [year, semester, closingDate])

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={() => {
				onOpenChange(false)
				/* setYearValue(year?.toString() as string)
				setSemesterValue(new Set([semester as 'A' | 'B'])) */
				setDateValue(closingDate || '')
				/* setIsValidYear(null)
				setIsValidSemester(null)
				setTouchedSemester(false) */
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
							{/* <Input
								value={yearValue}
								autoFocus
								label='Año'
								placeholder='Ingrese el año'
								variant='bordered'
								color={!isValidYear && isValidYear !== null ? 'danger' : 'default'}
								isInvalid={!isValidYear && isValidYear !== null}
								errorMessage={!isValidYear && isValidYear !== null ? 'Año inválido' : ''}
								onValueChange={handleYearValue}
							/>
							<Select
								selectedKeys={semesterValue}
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
							</Select> */}
							<Input
								value={dateValue}
								autoFocus
								label='Fecha de cierre'
								placeholder='yyyy-mm-dd'
								variant='bordered'
								color={!isValidDate && isValidDate !== null ? 'danger' : 'default'}
								isInvalid={!isValidDate && isValidDate !== null }
								errorMessage={!isValidDate && isValidDate !== null ? 'Fecha invalida' : ''}
								onValueChange={handleDateValue}
							/>
						</ModalBody>
						<ModalFooter>
							<Button
								color='danger'
								variant='flat'
								onPress={() => {
									onClose()
									/* setIsValidYear(null)
									setTouchedSemester(false) */
								}}
							>
								Cancelar
							</Button>
							<Button
								color='primary'
								isDisabled={!isValidDate && dateValue === ''}/* {!isValidYear || !isValidSemester || !touchedSemester} */
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