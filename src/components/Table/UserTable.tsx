import React, { useCallback, useEffect, useState } from 'react'

import {
	Chip,
	ChipProps,
	Pagination,
	Selection,
	Input,
	Button
} from '@nextui-org/react'
import SearchIcon from '../Icons/SearchIcon'
import ChevronDownIcon from '../Icons/ChevronDownIcon'
import CustomTable from './CustomTable'
import CustomDropdown from '../Dropdown/CustomDropdown'
import { User } from '@/types/User'
import { UsersService } from '@/api/Users/usersService'
import ActivateUserModal from '../Modal/User/ActivateUserModal'
import RoleUserModel from '../Modal/User/RoleUserModel'
import dynamic from 'next/dynamic'

const statusColorMap: Record<string, ChipProps['color']> = {
	activo: 'success',
	inactivo: 'danger',
	'pendiente de autenticación': 'warning'
}

export default function UserTable() {
	const [filterValue, setFilterValue] = React.useState('')
	const [page, setPage] = React.useState(1)
	const [statusFilter, setStatusFilter] = React.useState<Selection>('all')
	const rowsPerPage = 10
	const hasSearchFilter = Boolean(filterValue)
	const [users, setUsers] = useState<User[]>([])
	const columns = [
		{ name: 'N°', uid: 'index', sortable: true },
		{ name: 'NOMBRES', uid: 'name', sortable: true },
		{ name: 'ROL', uid: 'role', sortable: true },
		{ name: 'EMAIL', uid: 'email' },
		{ name: 'STATUS', uid: 'status', sortable: true },
		{ name: 'ACCIONES', uid: 'actions' }
	]

	const statusOptions = [
		{ label: 'Activo', uid: 'activo' },
		{ label: 'Inactivo', uid: 'inactivo' },
		{ label: 'Pendiente de autenticación', uid: 'pendiente de autenticación' }
	]

	const AddUserModal = dynamic(() => import('../Modal/User/AddUserModal'), {
		ssr: false
	})

	useEffect(() => {
		UsersService.listUsers().then((res) => {
			setUsers(res.data)
		})
	}, [])

	const handleUsersChanged = () => {
		UsersService.listUsers().then((res) => {
			setUsers(res.data)
		})
	}

	const filteredItems = React.useMemo(() => {
		let filteredUsers = [...users]

		if (hasSearchFilter) {
			filteredUsers = filteredUsers.filter((user) =>
				user.name.toLowerCase().includes(filterValue.toLowerCase())
			)
		}
		if (statusFilter !== 'all' && Array.from(statusFilter).length !== statusOptions.length) {
			filteredUsers = filteredUsers.filter((user) =>
				Array.from(statusFilter).includes(user.status)
			)
		}
		return filteredUsers
	}, [users, filterValue, statusFilter])

	const pages = Math.ceil(filteredItems.length / rowsPerPage)

	const items = React.useMemo(() => {
		const start = (page - 1) * rowsPerPage
		const end = start + rowsPerPage

		return filteredItems.slice(start, end)
	}, [page, filteredItems, rowsPerPage])

	const renderCell = useCallback((user: User, columnKey: React.Key) => {
		const cellValue = user[columnKey as keyof User]

		switch (columnKey) {
		case 'name':
			return (
				<div className='flex flex-col min-w-[325px]'>
					{user.status === 'pendiente de autenticación'
						? (
							<p className='text-bold text-sm'>Usuario registrado, detalles pendientes</p>
						)
						: (
							<p className='text-bold text-sm capitalize'>{`${user.name} ${user.lastname}`}</p>
						)}
				</div>
			)
		case 'role':
			return (
				<div className='flex flex-col'>
					<p className='text-bold text-sm capitalize'>{cellValue}</p>
				</div>
			)
		case 'status':
			return (
				<Chip className='capitalize' color={statusColorMap[user.status]} size='sm' variant='flat'>
					{cellValue}
				</Chip>
			)
		case 'actions':
			return (
				<div className='relative flex items-center gap-2 justify-center'>
					<RoleUserModel
						userId={user.id}
						onUserChanged={handleUsersChanged}
					/>
					<ActivateUserModal
						userId={user.id}
						onUserChanged={handleUsersChanged}
					/>
				</div>
			)
		default:
			return cellValue
		}
	}, [])

	const onSearchChange = React.useCallback((value?: string) => {
		if (value) {
			setFilterValue(value)
			setPage(1)
		} else {
			setFilterValue('')
		}
	}, [])

	const onClear = React.useCallback(() => {
		setFilterValue('')
		setPage(1)
	}, [])

	const topContent = React.useMemo(() => {
		return (
			<div className='flex flex-col gap-4 mb-4'>
				<div className='flex justify-between gap-3 items-end'>
					<Input
						isClearable
						className='w-full sm:max-w-[44%]'
						placeholder='Buscar por nombre'
						startContent={<SearchIcon width={15} height={15} fill='fill-gray-600'/>}
						defaultValue={filterValue}
						onClear={() => onClear()}
						onValueChange={onSearchChange}
					/>
					<div className='flex gap-3'>
						<CustomDropdown
							mode='selector'
							triggerElement={
								<Button endContent={<ChevronDownIcon width={10} height={10} />} variant='faded'>
                  Estado
								</Button>
							}
							triggerClassName='hidden sm:flex'
							items={statusOptions}
							disallowEmptySelection
							closeOnSelect={false}
							selectedKeys={statusFilter}
							selectionMode='multiple'
							onSelectionChange={setStatusFilter}
						/>
						<AddUserModal onUserChanged={handleUsersChanged}/>
					</div>
				</div>
			</div>
		)
	}, [
		filterValue,
		statusFilter,
		onSearchChange,
		users.length,
		hasSearchFilter
	])

	const bottomContent = React.useMemo(() => {
		return (
			<div className='py-2 px-2 flex justify-center'>
				{ pages !== 1 && (
					<Pagination
						isCompact
						showControls
						showShadow
						color='primary'
						page={page}
						total={pages}
						onChange={setPage}
					/>
				)}
			</div>
		)
	}, [items.length, page, pages, hasSearchFilter])

	const classNames = React.useMemo(
		() => ({
			wrapper: ['min-h-[590px]'],
			th: ['bg-default-200', 'text-default-600', 'border-b', 'border-divider', 'px-4', 'py-3', 'text-md'],
			td: [
				// changing the rows border radius
				// first
				'group-data-[first=true]:first:before:rounded-none',
				'group-data-[first=true]:last:before:rounded-none',
				// middle
				'group-data-[middle=true]:before:rounded-none',
				// last
				'group-data-[last=true]:first:before:rounded-none',
				'group-data-[last=true]:last:before:rounded-none'
			],
			tr: ['hover:bg-default-300']
		}),
		[]
	)

	return (
		<CustomTable
			items={items}
			columns={columns}
			renderCell={renderCell}
			topContent={topContent}
			bottomContent={bottomContent}
			emptyContent={<div className='flex justify-center items-center min-h-[400px] w-full'>No se encontro elementos</div>}
			classNames={classNames}
		/>
	)
}
