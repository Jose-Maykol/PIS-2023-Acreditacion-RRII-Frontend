/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react'
import { Navbar, NavbarBrand, NavbarContent, Avatar, Chip } from '@nextui-org/react'
import CustomDropdown from '../Dropdown/CustomDropdown'
import { useYearSemesterStore } from '@/store/useYearSemesterStore'
import { BaseService } from '@/api/Base/BaseService'
import { AuthService } from '@/api/Auth/authService'
import LogoutIcon from '../Icons/LogoutIcon'
import CountdownSemester from '../Countdown/CountdownSemester'
import PopoverSemester from '../Popover/PopoverSemester'
import { usePermissionsStore } from '@/store/usePermissionsStore'

const Header = () => {
	const [picture, setPicture] = useState('')
	const [user, setUser] = useState({ name: '', lastname: '' })
	const { closingDate } = useYearSemesterStore()
	const { role } = usePermissionsStore()

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
				<Chip color='success' variant='solid' className='text-white font-bold uppercase min-w-[80px]'>
					{role}
				</Chip>
				<p className='text-base text-white opacity-80 min-w-[50px] text-right'>{`${user.name} ${user.lastname}`}</p>
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
							uid: 'logout',
							label: 'Cerrar sesión',
							className: 'text-danger',
							color: 'danger',
							startContent: <LogoutIcon width={25} height={25} fill='fill-danger group-hover/dropdown:fill-white' />
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
