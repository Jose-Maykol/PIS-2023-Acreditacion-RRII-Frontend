'use client'

import React from 'react'
import { Navbar, NavbarBrand, NavbarContent, Avatar } from '@nextui-org/react'
import UbuntuIcon from '@/components/atoms/Icons/UbuntuIcon'
import CustomDropdown from '../../atoms/Dropdown/CustomDropdown'

const Header = () => {
	return (
		<Navbar classNames={{ base: 'bg-lightBlue-600', wrapper: 'px-6' }} maxWidth='full' height='5.25rem'>
			<NavbarBrand className='hidden md:flex gap-3'>
				<UbuntuIcon width={35} height={35} fill='fill-white' />
				<p className='text-base-regular text-white'>sistema de gestion de acreditacion</p>
			</NavbarBrand>

			<NavbarContent className='hidden md:flex' justify='center'>
				<p className='text-base-bold text-white border rounded-md p-2'>2023 - A</p>
			</NavbarContent>

			<NavbarContent as='div' justify='end'>
				<p className='text-base-regular text-white opacity-80'>walter huaracha condori</p>
				<CustomDropdown
					triggerElement={<Avatar
						as='button'
						className='transition-transform'
						color='secondary'
						name='Jason Hughes'
						size='lg'
						src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
					/>}
					items={[
						{
							uid: 'new',
							label: 'New file',
							color: 'primary',
							startContent: <UbuntuIcon width={25} height={25} />
						},
						{
							uid: 'copy',
							color: 'primary',
							label: 'Copy link',
							startContent: <UbuntuIcon width={25} height={25} />
						},
						{
							uid: 'edit',
							color: 'primary',
							label: 'Edit file',
							startContent: <UbuntuIcon width={25} height={25} />
						},
						{
							uid: 'delete',
							label: 'Delete file change text large ajj',
							className: 'text-danger',
							color: 'danger',
							startContent: <UbuntuIcon width={25} height={25} fill='fill-danger' />
						}
					]}
					placement='bottom-end'
					mode='action'
					onAction={(key: string) => console.log(key)}
				/>
			</NavbarContent>
		</Navbar>
	)
}

export default Header