'use client'

import Image from 'next/image'
import Link from 'next/link'
import SideBarItem from './SideBarItem'
import UsersIcon from '../Icons/UsersIcon'
import BookMarkIcon from '../Icons/BookMarkIcon'
import logoUnsa from '../../../public/img/logo-unsa.webp'
import ArrowIcon from './../Icons/ArrowIcon'
import { useState } from 'react'

export default function SideBar() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true)

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen)
	}

	return (
		<nav className={`${isSidebarOpen ? 'w-[210px] max-w-[210px]' : 'w-[60px] max-w-[60px]'} text-lg min-h-screen p-4`}>
			<div className={`w-full h-8 flex flex-row items-center my-3 ${isSidebarOpen ? 'justify-end' : 'justify-center pl-1'}`}>
				<button
					className={`${isSidebarOpen ? 'rotate-180' : 'rotate-0'} transform transition duration-1000 ease-in-out`}
					onClick={toggleSidebar}>
					<ArrowIcon
						width={15}
						height={15}
						fill='hover:fill-lightBlue-600'
					/>
				</button>
			</div>
			{isSidebarOpen
				? (
					<Link href='/dashboard'>
						<div className='flex flex-row items-center leading-5'>
							<Image
								src={logoUnsa}
								alt='logo-unsa'
								width={55}
								height={75}
								className='h-[75px] w-[55px] min-h-[75px] min-w-[55px]'/>
							<h1 className='text-[0.5rem] p-1 uppercase'>escuela profesional de <br /> <span className='font-bold text-[14px]'>relaciones industriales</span></h1>
						</div>
					</Link>
				)
				: (
					<Image
						src={logoUnsa}
						alt='logo-unsa'
						width={30}
						height={40}
						className='h-[40px] w-[30px] min-h-[40px] min-w-[30px]'/>
				)}
			<hr className='my-4 w-full'></hr>
			{isSidebarOpen && (<h3 className='text-xs text-gray-600 uppercase font-semibold'>area personal</h3>)}
			<ul className='text-sm list-none my-3'>
				<SideBarItem
					isOpen={isSidebarOpen}
					icon={<BookMarkIcon width={15} height={15}/>}
					text='mis planes'
					link='/dashboard'/>
			</ul>
			<hr className='my-4 w-full'></hr>
			{isSidebarOpen && (<h3 className='text-xs text-gray-600 uppercase font-semibold'>administrador</h3>)}
			<ul className='text-sm list-none my-3'>
				<SideBarItem
					isOpen={isSidebarOpen}
					icon={<UsersIcon width={15} height={15}/>}
					text='usuarios'
					link='/users'/>
			</ul>
			<hr className='my-4 w-full'></hr>
			{isSidebarOpen && (<h3 className='text-xs text-gray-600 uppercase font-semibold'>gestión de estándares</h3>)}
			<ul className='text-sm list-none my-3'>
				<SideBarItem
					isOpen={isSidebarOpen}
					icon={<UsersIcon width={15} height={15}/>}
					text='estándares'
					link='/standards'/>
			</ul>
			<hr className='my-4 w-full'></hr>
			{isSidebarOpen && (<h3 className='text-xs text-gray-600 uppercase font-semibold'>estándares</h3>)}
		</nav>
	)
}