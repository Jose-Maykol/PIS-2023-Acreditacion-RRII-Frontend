// 'use client'

import Image from 'next/image'
import Link from 'next/link'
import SideBarItem from './SideBarItem'
import UsersIcon from '../Icons/UsersIcon'
import BookMarkIcon from '../Icons/BookMarkIcon'
import logoUnsa from '../../../public/img/logo-unsa.webp'
import AngleDoubleRightIcon from '../Icons/AngleDoubleRightIcon'
import { PartialStandard } from '@/types/Standard'
import StandardIcon from '../Icons/StandardIcon'

export default function SideBar({
	isSidebarOpen,
	toggleSidebar,
	standards
}: {
	isSidebarOpen: boolean
	toggleSidebar: () => void
	standards: PartialStandard[]
}) {
	console.log(standards)
	return (
		<nav
			className={`fixed top-0 left-0 z-50 bg-white ${
				isSidebarOpen ? 'w-[210px] max-w-[210px]' : 'w-[60px] max-w-[60px]'
			} text-lg min-h-screen p-4`}
		>
			<div
				className={`w-full h-8 flex flex-row items-center my-3 ${
					isSidebarOpen ? 'justify-end' : 'justify-center pl-1'
				}`}
			>
				<button
					className={`${
						isSidebarOpen ? 'rotate-0' : 'rotate-180'
					} transform transition duration-1000 ease-in-out`}
					onClick={toggleSidebar}
				>
					<AngleDoubleRightIcon width={20} height={20} fill='hover:fill-lightBlue-600' />
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
								className='h-[75px] w-[55px] min-h-[75px] min-w-[55px]'
							/>
							<h1 className='uppercase text-[0.5rem] p-2'>
							escuela profesional de <br />{' '}
								<span className='font-bold text-[14px]'>relaciones industriales</span>
							</h1>
						</div>
					</Link>
				)
				: (
					<Image
						src={logoUnsa}
						alt='logo-unsa'
						width={30}
						height={40}
						className='h-[40px] w-[30px] min-h-[40px] min-w-[30px]'
					/>
				)}
			<hr className='my-4 w-full'></hr>
			{isSidebarOpen && (
				<h3 className='text-xs text-gray-600 uppercase font-semibold'>area personal</h3>
			)}
			<ul className='text-sm list-none my-3'>
				<SideBarItem
					isOpen={isSidebarOpen}
					icon={<BookMarkIcon width={18} height={18} />}
					text='mis planes'
					link='/dashboard'
				/>
			</ul>
			<hr className='my-4 w-full'></hr>
			{isSidebarOpen && (
				<h3 className='text-xs text-gray-600 uppercase font-semibold'>administrador</h3>
			)}
			<ul className='text-sm list-none my-3'>
				<SideBarItem
					isOpen={isSidebarOpen}
					icon={<UsersIcon width={18} height={18} />}
					text='usuarios'
					link='/dashboard/users'
				/>
			</ul>
			<hr className='my-4 w-full'></hr>
			{isSidebarOpen && (
				<h3 className='text-xs text-gray-600 uppercase font-semibold'>gestión de estándares</h3>
			)}
			<ul className='text-sm list-none my-3'>
				<SideBarItem
					isOpen={isSidebarOpen}
					icon={<UsersIcon width={18} height={18} />}
					text='estándares'
					link='/dashboard/standards-management'
				/>
			</ul>
			<hr className='my-4 w-full'></hr>
			{isSidebarOpen && (
				<h3 className='text-xs text-gray-600 uppercase font-semibold'>estándares</h3>
			)}
			<ul className='text-sm list-none my-3'>
				{Array.isArray(standards) &&
					standards.map((standard: PartialStandard, index: number) => (
						<SideBarItem
							key={index}
							isOpen={isSidebarOpen}
							icon={<StandardIcon width={18} height={18} />}
							text={`estándar ${standard.nro_standard}`}
							link={`/dashboard/standards/${standard.id}`}
						/>
					))}
			</ul>
		</nav>
	)
}
