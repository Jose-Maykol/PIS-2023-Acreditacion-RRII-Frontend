/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Image from 'next/image'
import login from '../../../../public/img/login.webp'
import logoUnsa from '../../../../public/img/logo-unsa.webp'
import { Select, SelectItem } from '@nextui-org/select'
import { Selection, Button } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { SERVER_PATH } from '../../../../config'
import { AuthService } from '@/api/Auth/authService'
import { AuthUser } from '@/types/User'
import DateSemesterService from '@/api/DateSemester/DateSemester'

type Semester = 'A' | 'B'

interface YearSemester {
	year: number
	semester: Semester[]
}

export default function AuthPage() {
	const [years, setYears] = useState<{ value: string }[]>([{ value: '2023' }])
	const [semesters, setSemesters] = useState<{ value: string }[]>([{ value: 'A' }])
	// const [yearValue, setYearValue] = useState<Selection>(new Set([]))
	// const [semesterValue, setSemesterValue] = useState<Selection>(new Set([]))
	// const [isValid, setIsValid] = useState<{ year: boolean, semester: boolean }>({ year: false, semester: false })
	// const [touchedSemester, setTouchedSemester] = useState(false)
	// const [touchedYear, setTouchedYear] = useState(false)
	const [yearSemester, setYearSemester] = useState<YearSemester[]>([])

	const handleYearValue = (value: Selection): void => {
		// setYearValue(value)
		// setIsValid({ year: (value as any).size > 0, semester: (semesterValue as any).size > 0 })
		setSemesters(filterSemester(yearSemester, (value as any).values().next().value))
	}

	/* const handleSemesterValue = (value: Selection): void => {
		// setSemesterValue(value)
		// setIsValid({ year: (yearValue as any).size > 0, semester: (value as any).size > 0 })
	} */

	const handleLoginWithGoogle = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log('login with google')
		if (typeof window !== 'undefined' && window.localStorage) {
			const data = new FormData(e.currentTarget)
			const year = data.get('year')
			const semester = data.get('semester')
			if (year && semester) {
				localStorage.setItem('year', year.toString())
				localStorage.setItem('semester', semester.toString())
			}
		}
		const url = `${SERVER_PATH}/acreditacion-app/api/auth/google`
		window.location.href = url
	}

	useEffect(() => {
		DateSemesterService.getAll().then((res) => {
			const data: YearSemester[] = res.data
			setYearSemester(res.data)
			const valueYear = Array.from(new Set(data.map((data) => data.year))).map((year) => ({
				value: year.toString()
			}))
			setYears(valueYear)
			const valueSemesters = data.reduce((result, data) => {
				if (data.year === parseInt(years[0].value)) {
					const semesterValues = data.semester.map((s) => ({ value: s }))
					result.push(...semesterValues)
				}
				return result
			}, [] as { value: string }[])
			setSemesters(valueSemesters)
		})
	}, [])

	const filterSemester = (data: YearSemester[], selectedYear: string): { value: string }[] => {
		return data.reduce((result, item) => {
			if (item.year === parseInt(selectedYear)) {
				const semesterValues = item.semester.map((s) => ({ value: s }))
				result.push(...semesterValues)
			}
			return result
		}, [] as { value: string }[])
	}

	useEffect(() => {
		if (typeof window !== 'undefined' && window.localStorage) {
			if (localStorage.getItem('access_token')) {
				window.location.href = '/acreditacion-app/app/dashboard'
			}
		}
		const paramsGoogle = location.search
		if (paramsGoogle) {
			AuthService.login(paramsGoogle).then((res) => {
				if (res.status === 200) {
					const token = res.data.access_token
					const authUser: AuthUser = {
						token,
						picture: res.data.image,
						role: res.data.role,
						permissions: res.data.permissions,
						user: {
							id: res.data.user.id as number,
							name: res.data.user.name as string,
							lastname: res.data.user.lastname as string,
							email: res.data.user.email as string
						}
					}
					// Se guardan los datos en el local storage
					localStorage.setItem('access_token', token)
					localStorage.setItem('auth_user', JSON.stringify(authUser))
					window.location.href = '/acreditacion-app/app/dashboard'
				}
			})
		}
	}, [])

	return (
		<div className='flex flex-row items-center w-[800px] h-[600px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-3xl overflow-hidden'>
			<form
				className='flex flex-col justify-between flex-1 bg-lightBlue-600 w-max h-[600px] p-12'
				onSubmit={handleLoginWithGoogle}
			>
				<div className='text-white'>
					<p className='text-lg'>Bienvenido al sistema</p>
					<h1 className='text-3xl uppercase font-bold'>GESTIÓN DE ESTÁNDARES DE ACREDITACIÓN</h1>
				</div>
				<div className='flex flex-col gap-3 m-auto'>
					<Select
						defaultSelectedKeys={[years[0].value]}
						name='year'
						placeholder='Año'
						label='Año'
						size='sm'
						selectionMode='single'
						onSelectionChange={handleYearValue}
						// onClose={() => setTouchedYear(true)}
						disallowEmptySelection
						className='w-[200px]'
					>
						{years.map((year) => (
							<SelectItem key={year.value} value={year.value}>
								{year.value}
							</SelectItem>
						))}
					</Select>
					<Select
						defaultSelectedKeys={[semesters[0].value]}
						name='semester'
						placeholder='Semestre'
						label='Semestre'
						size='sm'
						selectionMode='single'
						// onSelectionChange={handleSemesterValue}
						// onClose={() => setTouchedSemester(true)}
						disallowEmptySelection
						className='w-[200px]'
					>
						{semesters.map((semester) => (
							<SelectItem key={semester.value} value={semester.value}>
								{semester.value}
							</SelectItem>
						))}
					</Select>
				</div>
				<Button
					color='default'
					radius='sm'
					type='submit'
					startContent={<Image alt='logo-unsa' className='w-5 mx-1' src={logoUnsa} />}
				>
					<strong className='mx-2 uppercase text-xs'>Accede con tu cuenta institucional</strong>
				</Button>
			</form>
			<div className='flex-1 bg-white w-max h-full flex justify-center items-center'>
				<Image
					alt='logo-unsa'
					height={500}
					width={400}
					className='w-auto h-[500px] p-8'
					src={login}
				/>
			</div>
		</div>
	)
}
