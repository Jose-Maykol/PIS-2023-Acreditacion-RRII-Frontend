/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import DateSemesterService from '@/api/DateSemester/DateSemester'
import { useToast } from '@/hooks/toastProvider'
import { useYearSemesterStore } from '@/store/useYearSemesterStore'
import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { useCallback, useEffect, useMemo, useState } from 'react'

export default function PopoverSemester() {
	const { year, semester } = useYearSemesterStore()
	const [listYearSemester, setListYearSemester] = useState([])
	const [isOpen, setIsOpen] = useState(false)
	const { newToast } = useToast()

	const getSemesters = useCallback(() => {
		DateSemesterService.getAll().then((res) => {
			const periods = res.data.map((item: any) => {
				const { year, semester } = item
				return semester.map((sem: any) => ({ year, semester: sem }))
			})
			setListYearSemester(periods.flat())
		})
	}, [])

	useEffect(() => {
		if (year && semester) {
			getSemesters()
		}
	}, [year, semester, getSemesters])

	return (
		<Popover placement='bottom' offset={10} isOpen={isOpen} defaultOpen={isOpen}>
			<PopoverTrigger>
				<Button className='flex items-center gap-2 text-base font-bold text-white uppercase rounded-md' variant='bordered' onClick={() => setIsOpen(!isOpen)}>
					{year} - {semester}
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				{(titleProps) => (
					<div className='px-1 py-2 w-full'>
						<p className='text-small font-bold text-foreground' {...titleProps}>
							Seleccione un semestre
						</p>
						<div className='mt-2 flex flex-col gap-2 w-full'>
							{listYearSemester.map((item: any) => {
								if (item.year === year && item.semester === semester) {
									return null // No renderizar el botón si coincide con el almacenado
								}

								return (
									<Button
										key={item.year + item.semester}
										className='border border-lightBlue-600 p-2 rounded-md'
										variant='bordered'
										onClick={() => {
											useYearSemesterStore.getState().setYear(item.year)
											useYearSemesterStore.getState().setSemester(item.semester)
											localStorage.setItem('year', item.year)
											localStorage.setItem('semester', item.semester)
											newToast('Semestre actualizado', 'success')
											setIsOpen(false)
										}}
									>
										{item.year}-{item.semester}
									</Button>
								)
							})}
						</div>
					</div>
				)}
			</PopoverContent>
		</Popover>
	)
}