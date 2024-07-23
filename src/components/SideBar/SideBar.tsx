import Image from 'next/image'
import Link from 'next/link'
import SideBarItem from './SideBarItem'
import UsersIcon from '../Icons/UsersIcon'
import BookMarkIcon from '../Icons/BookMarkIcon'
import logoUnsa from '../../../public/img/logo-unsa.webp'
import AngleDoubleRightIcon from '../Icons/AngleDoubleRightIcon'
import { PartialStandard } from '@/types/Standard'
import StandardIcon from '../Icons/StandardIcon'
import ReportIcon from '../Icons/ReportIcon'
import { Button, Spinner } from '@nextui-org/react'
import { useNarrativeStore } from '@/store/useNarrativeStore'
import { useSidebarStore } from '@/store/useSidebarStore'
import { StandardPartialAPIResponse } from '@/types/api'
import { QueryStatus } from '@/types/common'

export default function SideBar({
	standards,
	queryStandardStatus,
	role
}: {
	standards: PartialStandard[]
	queryStandardStatus: QueryStatus<StandardPartialAPIResponse>
	role: string
}) {
	const isAdmin = role === 'administrador'
	const { isSidebarOpen, toggleSidebar } = useSidebarStore()
	const { isEditingNarrative } = useNarrativeStore()
	const { isLoading, isFetching } = queryStandardStatus

	return (
		<nav
			className={`flex flex-col gap-0 sticky top-0 bg-white border-gray-100 border ${
				isSidebarOpen ? 'w-[210px] max-w-[210px] min-w-[210px]' : 'w-[60px] max-w-[60px] min-w-[60px]'
			} text-lg min-h-screen p-4`}
		>
			<div
				className={`w-full h-8 flex flex-row items-center my-3 ${
					isSidebarOpen ? 'justify-end' : 'justify-center pl-1'
				}`}
			>
				<Button isIconOnly onPress={() => toggleSidebar(isSidebarOpen)} isDisabled={isEditingNarrative}>
					<div className={`${
						isSidebarOpen ? 'rotate-0' : 'rotate-180'
					} transform transition duration-1000 ease-in-out`}>
						<AngleDoubleRightIcon width={20} height={20} fill='hover:fill-lightBlue-600' />
					</div>
				</Button>
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
			<ul className='text-sm list-none mt-3'>
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
			<ul className='text-sm list-none'>
				<SideBarItem
					isOpen={isSidebarOpen}
					icon={<ReportIcon width={18} height={18} fill='fill-black'/>}
					text='Panel'
					link='/dashboard/admin'
					disabled={!isAdmin}
				/>
			</ul>
			<ul className='text-sm list-none'>
				<SideBarItem
					isOpen={isSidebarOpen}
					icon={<UsersIcon width={18} height={18} />}
					text='usuarios'
					link='/dashboard/users'
					disabled={!isAdmin}
				/>
			</ul>
			<hr className='my-4 w-full'></hr>
			{isSidebarOpen && (
				<h3 className='text-xs text-gray-600 uppercase font-semibold'>gestión de estándares</h3>
			)}
			<ul className='text-sm list-none mt-3'>
				<SideBarItem
					isOpen={isSidebarOpen}
					icon={<UsersIcon width={18} height={18} />}
					text='estándares'
					link='/dashboard/standards-management'
					disabled={!isAdmin}
				/>
			</ul>
			<hr className='my-4 w-full'></hr>
			{isSidebarOpen && (
				<h3 className='text-xs text-gray-600 uppercase font-semibold'>estándares</h3>
			)}
			<ul className={'flex-1 text-sm list-none my-3 h-full overflow-auto scrollbar-hide'}>
				{ (isLoading || isFetching) && (
					<div className='self-center h-full w-full flex items-center justify-center text-center'>
						<Spinner label='Cargando...' color='primary' labelColor='primary' size='sm'/>
					</div>
				)}
				{ standards.length === 0 && (
					<div className='text-sm text-gray-400 self-center h-full w-full flex items-center justify-center text-center'>
						<p className='uppercase text-sm'>No hay estándares disponibles</p>
					</div>
				)}
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
