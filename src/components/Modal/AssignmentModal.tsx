'use client'

import React, { useState, useEffect } from 'react'
import { Button, Select, SelectItem, Avatar, Chip, SelectedItems } from '@nextui-org/react'
import CustomModal from '@/components/Modal/CustomModal'
import { useRouter } from 'next/navigation'
import { User } from '@/types/User'
import { UsersService } from '@/api/Users/usersService'

const AssignmentModal = ({
	idStandard,
	openModal,
	onCloseModal
}: {
	idStandard: string
	openModal: boolean
	onCloseModal: () => void
}) => {
	const router = useRouter()
	const [users, setUsers] = useState<User[]>([])

	useEffect(() => {
		UsersService.enableUsers().then((res) => {
			setUsers(res.data)
		})
	}, [])

	const handleCloseModal = () => {
		onCloseModal()
	}

	const handleSaveChanges = () => {
		console.log('Artículo eliminado')
		handleCloseModal()
		router.refresh()
	}

	const header: React.ReactNode = (
		<div className='text-2xl font-bold text-center'>
			Formulario de Asignacion de Encargados del Estandar {idStandard}
		</div>
	)

	const body: React.ReactNode = (
		<div className='flex items-center justify-between'>
			<Select
				items={users}
				label='Asignar Encargados'
				variant='bordered'
				isMultiline={true}
				selectionMode='multiple'
				placeholder='Selecciona los usuarios'
				labelPlacement='outside'
				classNames={{
					trigger: 'min-h-unit-15 py-2'
				}}
				size='lg'
				className='w-[90%] m-auto'
				renderValue={(items: SelectedItems<User>) => {
					return (
						<div className='flex flex-wrap gap-2'>
							{items.map((item) => (
								<Chip key={item.key}>
									{item.data?.name} {item.data?.lastname}
								</Chip>
							))}
						</div>
					)
				}}
			>
				{(user) => (
					<SelectItem key={user.id} textValue={user.name}>
						<div className='flex gap-2 items-center'>
							<Avatar alt={user.name} className='flex-shrink-0' size='sm' src={undefined} />
							<div className='flex flex-col'>
								<span className='text-small'>
									{user.name} {user.lastname}
								</span>
								<span className='text-tiny text-default-400'>{user.email}</span>
							</div>
						</div>
					</SelectItem>
				)}
			</Select>
		</div>
	)

	return (
		<CustomModal
			isOpen={openModal}
			classNames={{
				base: 'h-[40%] overflow-y-auto',
				body: 'py-6',
				header: 'border-b-[2px] border-gray-200'
			}}
			size='2xl'
			onClose={handleCloseModal}
			header={header}
			body={body}
			footer={
				<>
					<Button color='danger' variant='light' onPress={handleCloseModal}>
						Cancelar
					</Button>
					<Button
						className='bg-[#6f4ef2] shadow-lg shadow-indigo-500/20'
						onPress={handleSaveChanges}
					>
						Guardar
					</Button>
				</>
			}
		/>
	)
}

export default AssignmentModal
