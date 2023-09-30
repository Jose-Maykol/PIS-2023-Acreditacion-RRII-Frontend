// 'use client'

import Image from 'next/image'
import Link from 'next/link'
import SideBarItem from './SideBarItem'
import UsersIcon from '../Icons/UsersIcon'
import BookMarkIcon from '../Icons/BookMarkIcon'
import logoUnsa from '../../../public/img/logo-unsa.webp'
import AngleDoubleRightIcon from '../Icons/AngleDoubleRightIcon'

export default function SideBar({ isSidebarOpen, toggleSidebar }: { isSidebarOpen: boolean, toggleSidebar: () => void }) {

	return (
		<nav className={`fixed top-0 left-0 z-50 bg-white ${isSidebarOpen ? 'w-72 max-w-[18rem]' : 'w-20 max-w-[5rem]'} text-lg min-h-screen p-4`}>
			<div className={`w-full h-8 flex flex-row items-center my-3 ${isSidebarOpen ? 'justify-end' : 'justify-center'}`}>
				<button
					className={`${isSidebarOpen ? 'rotate-0' : 'rotate-180'} transform transition duration-1000 ease-in-out`}
					onClick={toggleSidebar}>
					<AngleDoubleRightIcon
						width={25}
						height={25}
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
								className='h-[75px] w-[55px] min-h-[75px] min-w-[55px]' />
							<h1 className='text-small-regular p-1'>escuela profesional de <br /> <span className='text-base-bold text-[14px]'>relaciones industriales</span></h1>
						</div>
					</Link>
				)
				: (
					<Image
						src={logoUnsa}
						alt='logo-unsa'
						width={30}
						height={40}
						className='h-[40px] w-[30px] min-h-[40px] min-w-[30px]' />
				)}
			<hr className='my-4 w-full'></hr>
			{isSidebarOpen && (<h3 className='text-base-bold text-gray-600'>area personal</h3>)}
			<ul className='text-sm list-none my-3'>
				<SideBarItem
					isOpen={isSidebarOpen}
					icon={<BookMarkIcon width={20} height={20} />}
					text='mis planes'
					link='/dashboard' />
			</ul>
			<hr className='my-4 w-full'></hr>
			{isSidebarOpen && (<h3 className='text-base-bold text-gray-600'>administrador</h3>)}
			<ul className='text-sm list-none my-3'>
				<SideBarItem
					isOpen={isSidebarOpen}
					icon={<UsersIcon width={20} height={20} />}
					text='usuarios'
					link='/dashboard/users' />
			</ul>
			<hr className='my-4 w-full'></hr>
			{isSidebarOpen && (<h3 className='text-base-bold text-gray-600'>gestión de estándares</h3>)}
			<ul className='text-sm list-none my-3'>
				<SideBarItem
					isOpen={isSidebarOpen}
					icon={<UsersIcon width={20} height={20} />}
					text='estándares'
					link='/dashboard/standards-management' />
			</ul>
			<hr className='my-4 w-full'></hr>
			{isSidebarOpen && (<h3 className='text-base-bold text-gray-600'>estándares</h3>)}
			<ul className='text-sm list-none my-3'>
				<SideBarItem
					isOpen={isSidebarOpen}
					icon={<UsersIcon width={20} height={20} />}
					text='estándar 1'
					link='/dashboard/standards/1/narrative' />
				<SideBarItem
					isOpen={isSidebarOpen}
					icon={<UsersIcon width={20} height={20} />}
					text='estándar 2'
					link='/dashboard/standards/2/narrative' />
				<SideBarItem
					isOpen={isSidebarOpen}
					icon={<UsersIcon width={20} height={20} />}
					text='estándar 3'
					link='/dashboard/standards/3/narrative' />
				<SideBarItem
					isOpen={isSidebarOpen}
					icon={<UsersIcon width={20} height={20} />}
					text='estándar 4'
					link='/dashboard/standards/4/narrative' />
			</ul>
		</nav>
	)
}