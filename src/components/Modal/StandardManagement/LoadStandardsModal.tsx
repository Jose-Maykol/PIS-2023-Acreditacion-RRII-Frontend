import DateSemesterService from '@/api/DateSemester/DateSemester'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { StandardService } from '@/api/Estandar/StandardService'
import { Standard } from '@/types/Standard'

type Semester = 'A' | 'B'

interface YearSemester {
	year: number
	semester: Semester[]
}

interface LoadStandardsModalProps {
	setStandards: (standards: Standard[]) => void
}

export default function LoadStandardsModal({
	setStandards
}: LoadStandardsModalProps) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [years, setYears] = useState<{ value: string }[]>([{ value: '2023' }])
	const [semesters, setSemesters] = useState<{ value: string }[]>([{ value: 'A' }])

	useEffect(() => {
		DateSemesterService.getAll().then((res) => {
			const data: YearSemester[] = res.data
			const valueYear = Array.from(new Set(data.map(data => data.year)))
				.map(year => ({ value: year.toString() }))
			setYears(valueYear)
			const valueSemesters = data.reduce((result, data) => {
				if (data.year === parseInt(years[0].value)) {
					const semesterValues = data.semester.map(s => ({ value: s }))
					result.push(...semesterValues)
				}
				return result
			}, [] as { value: string }[])
			setSemesters(valueSemesters)
		})
	}, [])

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const data = new FormData(e.currentTarget)
		console.log('data', data)
		const year = data.get('year')?.toString()
		const semester = data.get('semester')?.toString()
		if (year && semester) {
			const params = {
				year,
				semester
			}
			StandardService.getHeaders(params).then((res) => {
				setStandards(res.data)
			})
		}
	}

	return (
		<>
			<Button
				color='primary'
				variant='ghost'
				onPress={onOpen}
			>
				Cargar estándares
			</Button>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			>
				<ModalContent>
					{(onClose) => (
						<form onSubmit={handleSubmit}>
							<ModalHeader className='flex flex-col gap-1 text-lightBlue-600 uppercase'>
                Cambiar rol del usuario
							</ModalHeader>
							<ModalBody>
								<Select
									defaultSelectedKeys={[years[0].value]}
									items={years}
									label='Año'
									name='year'
									placeholder='Selecciona un año'
									selectionMode='single'
									variant='bordered'
									disallowEmptySelection
									// onSelectionChange={handleRoleValue}
								>
									{(years) => <SelectItem key={years.value} value={years.value}>
										{years.value}
									</SelectItem>}
								</Select>
								<Select
									defaultSelectedKeys={[semesters[0].value]}
									items={semesters}
									name='semester'
									label='Semestre'
									placeholder='Selecciona un semestre'
									selectionMode='single'
									variant='bordered'
									disallowEmptySelection
									// onSelectionChange={handleRoleValue}
								>
									{(semesters) => <SelectItem key={semesters.value} value={semesters.value}>
										{semesters.value}
									</SelectItem>}
								</Select>
							</ModalBody>
							<ModalFooter>
								<Button
									color='danger'
									variant='flat'
									onPress={onClose}
								>
                  Cancelar
								</Button>
								<Button
									color='primary'
									onPress={onClose}
									type='submit'
								>
                  Cargar
								</Button>
							</ModalFooter>
						</form>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}