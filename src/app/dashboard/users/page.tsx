'use client'

import UserTableContainer from '@/components/Container/UserTableContainer'
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import AdminRolePage from '@/components/Role/AdminRolePage'

export default function UsersPage() {
	return (
		<AdminRolePage>
			<ContentWrapper className='bg-white h-[580px] -top-24 w-[96%] m-auto rounded-md py-5 px-10'>
				<div className='flex w-full mb-5'>
					<h2 className='text-xl font-semibold uppercase'>Lista de usuarios del sistema</h2>
				</div>
				<UserTableContainer />
			</ContentWrapper>
		</AdminRolePage>
	)
}
