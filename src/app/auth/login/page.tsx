'use client'

import Image from 'next/image'
import logoUnsa from '../../../../public/img/logo-unsa.webp'
import { Select, SelectItem } from '@nextui-org/select'
import { Selection } from '@nextui-org/react'
import { useState } from 'react'

export default function AuthPage() {
	const years = [{ value: '2021' }, { value: '2022' }]
	const semesters:string[] = ['A', 'B']
	const [yearValue, setYearValue] = useState<Selection>(new Set([years[0].value]))
	console.log(yearValue)

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
						defaultSelectedKeys={semesters[0]}
						labelPlacement='outside'
						size='sm'
						className='max-w-xs'>
						{
							semesters.map((semester, index) => (
								<SelectItem key={index} value={semester}>
									{semester}
								</SelectItem>
							))
						}
					</Select>
				</div>
				<button className='bg-white hover:bg-blueGray-300 text-blueGray-700 px-4 py-2 my-3 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150' type='button'>
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