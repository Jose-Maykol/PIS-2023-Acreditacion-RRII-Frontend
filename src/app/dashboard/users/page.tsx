'use client'

import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import UserTable from '@/components/Table/UserTable'

export default function UsersPage() {
	return (
		<div className='h-full'>
			<ContentWrapper className='bg-lightBlue-600 p-5 h-[300px]'>
				<div className='flex items-center gap-1 pt-16 pl-8'>
					<div className='text-white'>
						<h1>administracion de usuarios</h1>
						<p className='text-lg'>seccion de usuarios del sistema</p>
					</div>
				</div>
			</ContentWrapper>
			<ContentWrapper className='bg-white h-[670px] -top-24 w-[96%] m-auto rounded-md py-5 px-10'>
				<div className='flex w-full mb-5'>
					<h2>Lista de Usuarios del Sistema</h2>
				</div>
				<UserTable />
			</ContentWrapper>
		</div>
	)
}