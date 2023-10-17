'use client'

import React, { useState, useEffect } from 'react'
import { Button, Select, SelectItem, Avatar, Chip, SelectedItems, Selection } from '@nextui-org/react'
import CustomModal from '@/components/Modal/CustomModal'
import { EnabledUsers, AssignedUsers } from '@/types/Standard'
import { StandardService } from '@/api/Estandar/standardService'
import { toast } from 'react-toastify'

const AssignmentModal = ({
	idStandard,
	openModal,
	onCloseModal,
	onReload
}: {
	idStandard: string
	openModal: boolean
	onCloseModal: () => void
	onReload: () => void
}) => {
	const [users, setUsers] = useState<EnabledUsers[]>([])
	const [values, setValues] = useState<Selection>(new Set([]))
	const [isValid, setIsValid] = useState<{isEmpty: boolean, isChangeValues: boolean}>({ isEmpty: true, isChangeValues: false })
	const [initialValues, setInitialValues] = useState<Selection>(new Set([]))

	useEffect(() => {
		loadInitialValues()
	}, [])

	const loadInitialValues = async () => {
		await StandardService.getListOfEnabledUsers(idStandard).then((res) => {
			setUsers(res.data)
			const iniciales = res.data.filter((user: EnabledUsers) => user.isManager).map((user: EnabledUsers) => user.id.toString())
			setInitialValues(new Set([...iniciales]))
			setValues(new Set([...iniciales]))
		})
	}

	const handleCloseModal = () => {
		onCloseModal()
	}

	const hasValuesChanged = () => {
		const sortedValues = [...values].sort()
		const sortedInitialValues = [...initialValues].sort()
		return JSON.stringify(sortedValues) !== JSON.stringify(sortedInitialValues)
	}

	const handleValidation = () => {
		if ((values as any).size === 0) {
			setIsValid({ isEmpty: true, isChangeValues: isValid.isChangeValues })
		}
		setIsValid({ isEmpty: isValid.isEmpty, isChangeValues: hasValuesChanged() })
	}

	const handleSaveChanges = async () => {
		const notification = toast.loading('Procesando...')
		const users = [...values].map((item) => item.toString())
		await StandardService.assignUsersToStandard(
			idStandard,
			{ users: users } as AssignedUsers
		).then((res) => {
			if (res.status === 1) {
				onReload()
				toast.update(notification, {
					render: res.message,
					type: 'success',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					isLoading: false,
					theme: 'colored'
				})
			} else {
				toast.update(notification, {
					render: res.message,
					type: 'error',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					isLoading: false,
					theme: 'colored'
				})
			}
		})
		handleCloseModal()
	}

	const header: React.ReactNode = (
		<>
			<h2 className='text-2xl font-bold text-center'>
				Formulario de Asignacion de Encargados del Estandar {idStandard}
			</h2>
		</>
	)

	const body: React.ReactNode = (
		<div className='h-full max-h-[96%]'>
			<Select
				items={users}
				label='Asignar Encargados'
				variant='bordered'
				isMultiline={true}
				selectionMode='multiple'
				placeholder='Selecciona los usuarios'
				labelPlacement='outside'
				classNames={{
					base: 'h-full py-1',
					label: 'text-xl text-bold py-4',
					trigger: 'flex flex-col py-5'
				}}
				size='lg'
				className='w-[80%] m-auto'
				scrollShadowProps={{
					isEnabled: false
				}}
				isInvalid={!isValid.isEmpty}
				errorMessage={isValid.isEmpty || 'Debe seleccionar almenos un encargado'}
				onClose={ handleValidation }
				selectedKeys={values}
				onSelectionChange={setValues}
				renderValue={(items: SelectedItems<EnabledUsers>) => {
					return (
						<div className='flex flex-wrap gap-2 overflow-y-auto scrollbar-hide max-h-[100px]'>
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
					<SelectItem key={user.id} textValue={`${user.name} ${user.lastname}`}>
						<div className='flex gap-2 items-center'>
							<Avatar alt={user.name} className='flex-shrink-0' size='sm' src={user.avatar} />
							<div className='flex flex-col'>
								<span className='text-small'>
									{user.name} {user.lastname}
								</span>
								<span className='text-default-400'>{user.email}</span>
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
				base: 'h-[40%]',
				header: 'h-[23%] p-2 border-b-[2px] border-gray-200',
				body: 'h-[55%] py-2',
				footer: 'h-[22%]'
			}}
			size='xl'
			onClose={handleCloseModal}
			header={header}
			body={body}
			footer={
				<>
					<Button color='danger' variant='solid' size='lg' onPress={handleCloseModal}>
						Cancelar
					</Button>
					<Button className='bg-lightBlue-600 text-white' variant='solid' size='lg' isDisabled={isValid.isEmpty && !isValid.isChangeValues} onPress={handleSaveChanges} >
						Guardar
					</Button>
				</>
			}
		/>
	)
}

export default AssignmentModal
