import { User } from '@/types/User'
import { Chip, ChipProps, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React, { useCallback } from 'react'
import ActivateUserModal from '../Modal/User/ActivateUserModal'
import RoleUserModal from '../Modal/User/RoleUserModal'

interface UserTableProps {
  data: User[];
  handleUsersChanged: () => void;
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const statusColorMap: Record<string, ChipProps['color']> = {
	activo: 'success',
	inactivo: 'danger',
	'pendiente de autenticación': 'warning'
}

export default function UserTable({
	data,
	handleUsersChanged,
	currentPage,
	totalPages,
	handlePageChange
}: UserTableProps) {
	const columns = [
		{ name: 'N°', uid: 'index', sortable: true },
		{ name: 'NOMBRES', uid: 'name', sortable: true },
		{ name: 'ROL', uid: 'role', sortable: true },
		{ name: 'EMAIL', uid: 'email' },
		{ name: 'STATUS', uid: 'status', sortable: true },
		{ name: 'ACCIONES', uid: 'actions' }
	]

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
				<div className='flex flex-row gap-2'>
					<RoleUserModal
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

	return (
		<Table
			aria-label='Tabla de usuarios'
			bottomContent={
				<div className='flex w-full justify-center'>
					<Pagination
						isCompact
						showControls
						showShadow
						color='primary'
						page={currentPage}
						total={totalPages}
						onChange={(page) => handlePageChange(page)}
					/>
				</div>
			}
		>
			<TableHeader columns={columns}>
				{(column) => (
					<TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody items={data}>
				{(item) => (
					<TableRow key={item.id}>
						{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	)
}