'use client'

import Image from 'next/image'
import logoUnsa from '../../../../public/img/logo-unsa.webp'
import { Select, SelectItem } from '@nextui-org/select'
import { Selection } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { SERVER_PATH } from '../../../../config'
import { AuthService } from '@/api/Auth/authService'
import { AuthUser } from '@/types/User'

export default function AuthPage() {
	const years = [{ value: '2021' }, { value: '2022' }]
	const semesters = [{ value: 'A' }, { value: 'B' }]
	const [yearValue, setYearValue] = useState<Selection>(new Set([years[0].value]))
	const [semesterValue, setSemesterValue] = useState<Selection>(new Set([semesters[0].value]))
	const handleLoginWithGoogle = (): void => {
		console.log(yearValue)
		console.log(semesterValue)
		const url = `${SERVER_PATH}/api/auth/login/google`
		window.location.href = url
	}

	useEffect(() => {
		if (typeof window !== 'undefined' && window.localStorage) {
			if (localStorage.getItem('access_token')) {
				window.location.href = '/dashboard'
			}
		}
		const paramsGoogle = location.search
		if (paramsGoogle) {
			console.log(paramsGoogle)
			AuthService.login(paramsGoogle).then((res) => {
				console.log(res)
				if (res.status === 200) {
					const token = res.data.access_token
					const authUser: AuthUser = {
						token,
						picture: res.data.image,
						role: res.data.role,
						user: {
							id: res.data.user.id,
							name: res.data.user.name,
							lastname: res.data.user.lastname,
							email: res.data.user.email,
							role: res.data.role.name,
							registrationStatus: res.data.user.registrationStatus
						}
					}
					localStorage.setItem('access_token', token)
					localStorage.setItem('auth_user', JSON.stringify(authUser))
					window.location.href = '/dashboard'
				}
			})
		}
	})

	return (
		<div className='flex flex-row items-center w-[800px] h-[600px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-3xl overflow-hidden'>
			<div className='flex flex-col justify-between flex-1 bg-lightBlue-600 w-max h-[600px] p-12'>
				<div className='text-white'>
					<p className='text-lg'>Bienvenido al Sistema</p>
					<h1 className='text-3xl uppercase font-bold'>GESTIÓN DE ESTÁNDARES DE ACREDITACIÓN</h1>
				</div>
				<div className='flex flex-col gap-3 m-auto'>
					<Select
						isRequired
						defaultSelectedKeys={years[0].value}
						labelPlacement='outside'
						size='sm'
						selectionMode='single'
						onSelectionChange={setYearValue}
						className='w-[200px]'>
						{
							years.map((year, index) => (
								<SelectItem key={index} value={year.value}>
									{year.value}
								</SelectItem>
							))
						}
					</Select>
					<Select
						isRequired
						defaultSelectedKeys={semesters[0].value}
						labelPlacement='outside'
						size='sm'
						selectionMode='single'
						onSelectionChange={setSemesterValue}
						className='w-[200px]'>
						{
							semesters.map((semester, index) => (
								<SelectItem key={index} value={semester.value}>
									{semester.value}
								</SelectItem>
							))
						}
					</Select>
				</div>
				<button
					onClick={handleLoginWithGoogle}
					className='bg-white hover:bg-blueGray-300 text-blueGray-700 px-4 py-2 my-3 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150' type='button'>
					<Image
						width={20}
						height={20}
						alt='logo-unsa'
						className='w-5 mx-1'
						src={logoUnsa}/>
					<strong className='mx-2'>Accede con tu cuenta institucional</strong>
				</button>
			</div>
			<div className='flex-1 bg-white w-max h-[600px]'>
			</div>
		</div>
	)
}