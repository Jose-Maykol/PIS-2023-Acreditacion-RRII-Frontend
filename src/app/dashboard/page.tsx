'use client'

import React, { useState } from 'react'
import ContentWrapper from '@/components/atoms/ContentWrapper/ContentWrapper'
import BookMarkIcon from '@/components/atoms/Icons/BookMarkIcon'
import UserTable from '@/components/molecules/Tables/UserTable'

export default function DashboardPage() {
	const [openModal, setOpenModal] = useState(false)

	return (
		<div className='h-full'>
			<ContentWrapper className='bg-lightBlue-600 p-5 h-[300px]'>
				<div className='flex items-center gap-1 pt-16 pl-6'>
					<BookMarkIcon width={70} height={70} fill='fill-white' variant='line' />
					<div className='text-white'>
						<h1>Mis planes de mejora</h1>
						<p className='text-lg'>Aqui se muestran los planes de mejora que creaste y modificaste</p>
					</div>
				</div>
			</ContentWrapper>
			<ContentWrapper className='bg-white h-[670px] -top-24 w-[96%] m-auto rounded-md py-5 px-10'>
				<div className='flex w-full mb-5'>
					<h2>Lista de Planes de Mejora Creados</h2>
				</div>
				<UserTable />
			</ContentWrapper>
		</div>
	)
}