/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react'
import { Navbar, NavbarBrand, NavbarContent, Avatar } from '@nextui-org/react'
import CustomDropdown from '../Dropdown/CustomDropdown'
import { useYearSemesterStore } from '@/store/useYearSemesterStore'
import { BaseService } from '@/api/Base/BaseService'
import { AuthService } from '@/api/Auth/authService'
import LogoutIcon from '../Icons/LogoutIcon'
import UserIcon from '../Icons/UserIcon'
import CountdownSemester from '../Countdown/CountdownSemester'
import dynamic from 'next/dynamic'
import PopoverSemester from '../Popover/PopoverSemester'

const Header = () => {
	const [picture, setPicture] = useState('')
	const [user, setUser] = useState({ name: '', lastname: '' })
	const { closingDate } = useYearSemesterStore()
	/* const PopoverSemester = dynamic(() => import('@/components/Popover/PopoverSemester'), {
		ssr: false,
		loading: () => <div className='w-[100px] h-[40px] animate-pulse bg-gray-200 rounded-md'/>
	}) */

	const logout = () => {
		AuthService.logout()
		localStorage.removeItem('auth_user')
		localStorage.removeItem('access_token')
		localStorage.removeItem('year')
		localStorage.removeItem('semester')
		useYearSemesterStore.getState().setYear(null)
		useYearSemesterStore.getState().setSemester(null)
		BaseService.deleteConfig()
		window.location.href = '/'
	}

	useEffect(() => {
		const authUserJSON = localStorage.getItem('auth_user')
		if (authUserJSON) {
			const { picture, user } = JSON.parse(authUserJSON)
			setPicture(picture)
			setUser(user)
		}
	}, [])

	return (
		<Navbar
			classNames={{ base: 'bg-lightBlue-600', wrapper: 'px-6' }}
			maxWidth='full'
			height='5.25rem'
		>
			<NavbarBrand className='hidden md:flex gap-3'>
				<p className='text-base font-bold text-white uppercase'>
					sistema de gestión de acreditación
				</p>
			</NavbarBrand>

			<NavbarContent className='hidden md:flex' justify='center'>
				<PopoverSemester />
			</NavbarContent>

			<NavbarContent as='div' justify='end'>
				<p className='text-base text-white opacity-80'>{`${user.name} ${user.lastname}`}</p>
				<CustomDropdown
					triggerElement={
						<Avatar
							as='button'
							className='transition-transform'
							color='primary'
							name={`${user.name} ${user.lastname}`}
							size='md'
							src={picture}
							imgProps={{ referrerPolicy: 'no-referrer' }}
						/>
					}
					items={[
						{
							uid: 'my-perfil',
							label: 'Mi perfil',
							color: 'primary',
							startContent: <UserIcon width={25} height={25} />
						},
						{
							uid: 'logout',
							label: 'Cerrar sesión',
							className: 'text-danger',
							color: 'danger',
							startContent: <LogoutIcon width={25} height={25} fill='fill-danger' />
						}
					]}
					placement='bottom-end'
					mode='action'
					onAction={(key: string) => {
						if (key === 'logout') logout()
					}}
				/>
				{ closingDate && (
					<CountdownSemester />
				)}
			</NavbarContent>
		</Navbar>
	)
}

export default Header
