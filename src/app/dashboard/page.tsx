/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import MyImprovementPlansTableContainer from '@/components/Container/MyImprovementPlansTableContainer'
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import BookMarkIcon from '@/components/Icons/BookMarkIcon'
import React from 'react'
export default function DashboardPage() {
	return (
		<div className='h-full bg-gray-100'>
			<ContentWrapper className='bg-lightBlue-600 p-5 h-[300px]'>
				<div className='flex items-center gap-2 pt-16 pl-6'>
					<BookMarkIcon width={40} height={40} fill='fill-white' variant='line' />
					<div className='text-white'>
						<h1 className='text-2xl font-bold'>Mis planes de mejora</h1>
						<p className='text-base'>Aqui se muestran los planes de mejora que creaste y modificaste</p>
					</div>
				</div>
			</ContentWrapper>
			<ContentWrapper className='bg-white min-h-[585px] h-auto -top-24 w-[96%] m-auto rounded-md py-5 px-10'>
				<div className='flex w-full mb-5'>
					<h2 className='text-xl font-semibold uppercase'>Lista de Planes de Mejora</h2>
				</div>
				<MyImprovementPlansTableContainer />
			</ContentWrapper>
		</div>
	)
}