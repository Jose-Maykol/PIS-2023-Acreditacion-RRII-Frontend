'use client'

import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import UserTable from '@/components/Table/UserTable'

export default function UsersPage() {
	return (
		<ContentWrapper className='bg-white h-[670px] -top-24 w-[96%] m-auto rounded-md py-5 px-10'>
			<div className='flex w-full mb-5'>
				<h2 className='text-2xl font-semibold'>Lista de Usuarios del Sistema</h2>
			</div>
			<UserTable />
		</ContentWrapper>
	)
}
