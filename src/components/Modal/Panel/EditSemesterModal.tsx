/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@nextui-org/react'
import DateSemesterService from '@/api/DateSemester/DateSemester'
import Calendar from 'react-calendar'
import { useToast } from '@/hooks/toastProvider'
import { useYearSemesterStore } from '@/store/useYearSemesterStore'
import CalendarIcon from '@/components/Icons/CalendarIcon'
import '@/components/Calendar/Calendar.css'

interface EditSemesterModalProps {
	isOpen: boolean
	onOpenChange: (isOpen: boolean) => void
}

export default function EditSemesterModal({
	isOpen,
	onOpenChange
}: EditSemesterModalProps) {
	/* const semesters = [{ value: 'A' }, { value: 'B' }] */
	const [isOpenCalendar, setIsOpenCalendar] = useState(false)
	const [date, setDate] = useState(new Date())
	/* const [yearValue, setYearValue] = useState<string >('')
	const [semesterValue, setSemesterValue] = useState<Selection>(new Set([]))
	const [isValidYear, setIsValidYear] = useState<boolean | null >(null)
	const [isValidSemester, setIsValidSemester] = useState<boolean | null >(null) */
	// const [isValidDate, setIsValidDate] = useState<boolean | null >(null)
	/* const [touchedSemester, setTouchedSemester] = useState(false) */
	// const { year, semester, closingDate } = useYearSemesterStore()
	const { showToast, updateToast } = useToast()

	/* const validateYear = (value:string) => {
		return /^\d{4}$/.test(value)
	} */

	const onChangeDate = (value : any, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		if (value instanceof Date) {
			setDate(value)
			setIsOpenCalendar(false)
		}
	}

	/* const validateDate = (value:string) => {
		// valida la fecha en formato dd-mm-yyyy
		return /^\d{4}-\d{2}-\d{2}$/.test(value)
	}

	const handleDateValue = (value: string): void => {
		setDateValue(value)
		setIsValidDate(validateDate(value))
	} */

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
		const dateFormated = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

		DateSemesterService.close({
			closing_date: dateFormated
		}).then((res) => {
			if (res.status === 1) {
				updateToast(notification, 'Fecha de cierre actualizada', 'success')
				useYearSemesterStore.setState({
					closingDate: dateFormated,
					isClosed: res.data.is_closed
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
				/* setYearValue(year?.toString() as string)
				setSemesterValue(new Set([semester as 'A' | 'B'])) */
				// setDateValue(closingDate || '')
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
							<div className='flex flex-row gap-2 items-end'>
								<Input
									label='Fecha de cierre'
									placeholder='yyyy-mm-dd'
									variant='bordered'
									// color={!isValidDate && isValidDate !== null ? 'danger' : 'default'}
									// isInvalid={!isValidDate && isValidDate !== null }
									// errorMessage={!isValidDate && isValidDate !== null ? 'Fecha invalida' : ''}
									onValueChange={() => setDate.toString()}
									value={date.toLocaleDateString()}
									classNames={{ label: 'text-neutral-400', input: 'text-neutral-400' }}
									isReadOnly
								/>
								<Popover placement='top' isOpen={isOpenCalendar} onOpenChange={(open) => setIsOpenCalendar(open)}>
									<PopoverTrigger>
										<Button
											color='primary'
											isIconOnly
											startContent={<CalendarIcon width={35} height={35} fill='fill-white' />}
											className='h-[56px] w-[56px] min-w-[56px]'
										/>
									</PopoverTrigger>
									<PopoverContent className='px-2 pb-4'>
										<Calendar
											onChange={onChangeDate}
											value={date}
											prev2Label={null}
											next2Label={null}
										/>
									</PopoverContent>
								</Popover>
							</div>
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
								// isDisabled={!isValidDate && dateValue === ''}/* {!isValidYear || !isValidSemester || !touchedSemester} */
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