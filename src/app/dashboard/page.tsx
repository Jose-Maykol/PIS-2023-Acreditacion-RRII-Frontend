'use client'

import React from 'react'
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import BookMarkIcon from '@/components/Icons/BookMarkIcon'
import UserTable from '@/components/Table/UserTable'

export default function DashboardPage() {
	return (
		<div className='h-full'>
			<ContentWrapper className='bg-lightBlue-600 p-5 h-[300px]'>
				<div className='flex flex-wrap w-11/12 pl-5'>
					<BookMarkIcon width={40} height={40} fill='mt-3 fill-white' variant='line' />
					<div className = 'flex flex-col bg-lightBlue-600 px-5 pb-5 grow'>
						<div className='uppercase text-white'>
							<h1 className='my-5 font-BebasNeue text-h1'>Mis planes de mejora</h1>
							<p className='my-2.5 mb-2 font-BebasNeue text-h3'>Sección de administración de planes de mejora</p>
						</div>
					</div>
					<hr className='my-6 w-full'></hr>
				</div>
			</ContentWrapper>
			<ContentWrapper className='bg-white h-[670px] -top-24 w-[96%] m-auto rounded-md py-5 px-10'>
				<div className='text-base font-bold flex w-full mb	-5'>
					<h2>Lista de Planes de Mejora Creados</h2>
				</div>
				<UserTable />
			</ContentWrapper>
		</div>
	)
}