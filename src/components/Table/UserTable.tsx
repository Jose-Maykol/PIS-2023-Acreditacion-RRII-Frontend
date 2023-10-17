import React, { useEffect, useState } from 'react'

import {
	Chip,
	Tooltip,
	ChipProps,
	Pagination,
	Selection,
	Input,
	Button
} from '@nextui-org/react'
import PencilIcon from '../Icons/PencilIcon'
import TrashIcon from '../Icons/TrashIcon'
import SearchIcon from '../Icons/SearchIcon'
import ChevronDownIcon from '../Icons/ChevronDownIcon'
import CustomTable from './CustomTable'
import CustomDropdown from '../Dropdown/CustomDropdown'
import AddUserModal from '../Modal/User/AddUserModal'
import { User } from '@/types/User'
import { UsersService } from '@/api/Users/usersService'

const statusColorMap: Record<string, ChipProps['color']> = {
	activo: 'success',
	inactivo: 'danger',
	'pendiente de autenticación': 'warning'
}

export default function UserTable() {
	const [filterValue, setFilterValue] = React.useState('')
	const [page, setPage] = React.useState(1)
	const [statusFilter, setStatusFilter] = React.useState<Selection>('all')
	const rowsPerPage = 8
	const hasSearchFilter = Boolean(filterValue)
	const [users, setUsers] = useState<User[]>([])
	const columns = [
		{ name: 'N°', uid: 'id', sortable: true },
		{ name: 'Nombres', uid: 'name', sortable: true },
		{ name: 'Rol', uid: 'role', sortable: true },
		{ name: 'Email', uid: 'email' },
		{ name: 'Status', uid: 'status', sortable: true },
		{ name: 'Acciones', uid: 'actions' }
	]

	const statusOptions = [
		{ label: 'activo', uid: 'activo' },
		{ label: 'inactivo', uid: 'inactivo' },
		{ label: 'pendiente de autenticación', uid: 'pendiente de autenticación' }
	]

	useEffect(() => {
		UsersService.listUsers().then((res) => {
			setUsers(res.data)
			console.log('no el use effect ta mal xd')
		})
	}, [])

	const handleUserCreated = () => {
		UsersService.listUsers().then((res) => {
			setUsers(res.data)
			console.log('esto esta mal')
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

	const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
		const cellValue = user[columnKey as keyof User]

		switch (columnKey) {
		case 'name':
			return (
				<div className='flex flex-col'>
					<p className='text-bold text-sm capitalize'>{`${user.name} ${user.lastname}`}</p>
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
				<div className='relative flex items-center gap-2'>
					<Tooltip content='Editar Usuario'>
						<span className='text-default-400 cursor-pointer active:opacity-50'>
							<PencilIcon width={20} height={20} />
						</span>
					</Tooltip>
					<Tooltip color='danger' content='Eliminar usuario'>
						<span className='text-danger cursor-pointer active:opacity-50'>
							<TrashIcon width={20} height={20} fill='fill-danger' />
						</span>
					</Tooltip>
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
								<Button endContent={<ChevronDownIcon width={20} height={20}/>} variant='flat'>
                  Estado
								</Button>
							}
							triggerClassName='hidden sm:flex'
							items={statusOptions}
							itemsClassName='capitalize'
							disallowEmptySelection
							closeOnSelect={false}
							selectedKeys={statusFilter}
							selectionMode='multiple'
							onSelectionChange={setStatusFilter}
						/>
						<AddUserModal onUserCreated={handleUserCreated}/>
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
				<Pagination
					isCompact
					showControls
					showShadow
					color='primary'
					page={page}
					total={pages}
					onChange={setPage}
				/>
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
			emptyContent={<div>No se encontro elementos</div>}
			classNames={classNames}
		/>
	)
}
