import { User } from '@/types/User'
import { Chip, ChipProps, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React, { useCallback } from 'react'
import ActivateUserModal from '../Modal/User/ActivateUserModal'
import RoleUserModal from '../Modal/User/RoleUserModal'

interface UserTableProps {
  data: User[];
  handleUsersChanged: () => void;
}

const statusColorMap: Record<string, ChipProps['color']> = {
	activo: 'success',
	inactivo: 'danger',
	'pendiente de autenticación': 'warning'
}

const roleColorMap: Record<string, ChipProps['color']> = {
	administrador: 'primary',
	docente: 'success'
}

export default function UserTable({
	data,
	handleUsersChanged
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
				<Chip className='capitalize' color={roleColorMap[user.role]} size='sm' variant='flat'>
					{cellValue}
				</Chip>
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
						role={user.role}
						userId={user.id}
						onUserChanged={handleUsersChanged}
					/>
					<ActivateUserModal
						status={user.status}
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
			removeWrapper
			classNames={{
				base: 'min-h-[370px] h-[370px]'
			}}
		>
			<TableHeader columns={columns}>
				{(column) => (
					<TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody
				items={data}
				emptyContent='No hay usuarios registrados'
			>
				{(item) => (
					<TableRow key={item.id}>
						{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	)
}