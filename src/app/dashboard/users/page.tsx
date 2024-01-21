'use client'

import UserTableContainer from '@/components/Container/UserTableContainer'
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'

export default function UsersPage() {
	return (
		<ContentWrapper className='bg-white h-[670px] -top-24 w-[96%] m-auto rounded-md py-5 px-10'>
			<div className='flex w-full mb-5'>
				<h2 className='text-xl font-semibold uppercase'>Lista de usuarios del sistema</h2>
			</div>
			<UserTableContainer />
		</ContentWrapper>
	)
}
