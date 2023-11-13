'use client'

import { useState, useEffect, ReactNode } from 'react'
import { Button, Select, SelectItem, Avatar, Chip, SelectedItems, Selection, Tooltip } from '@nextui-org/react'
import CustomModal from '@/components/Modal/CustomModal'
import { EnabledUsers, AssignedUsers } from '@/types/Standard'
import { StandardService } from '@/api/Estandar/StandardService'
import { toast } from 'react-toastify'
import { getCommonIcon } from '@/utils/utils'

const AssignmentModal = ({
	id,
	onReload
}: {
	id: string
	onReload: () => void
}) => {
	const [users, setUsers] = useState<EnabledUsers[]>([])
	const [values, setValues] = useState<Selection>(new Set([]))
	const [isValid, setIsValid] = useState<{isEmpty: boolean, isChangeValues: boolean}>({ isEmpty: true, isChangeValues: false })
	const [initialValues, setInitialValues] = useState<Selection>(new Set([]))
	const [showModal, setShowModal] = useState<boolean>(false)
	const [touched, setTouched] = useState(false)

	useEffect(() => {
		loadInitialValues()
	}, [])

	const loadInitialValues = async () => {
		await StandardService.getListOfEnabledUsers(id).then((res) => {
			setUsers(res.data.sort((a:EnabledUsers, b:EnabledUsers) => {
				const nameA = a.name.toUpperCase()
				const nameB = b.name.toUpperCase()

				if (nameA < nameB) {
					return -1
				}
				if (nameA > nameB) {
					return 1
				}
				return 0
			}))
			const iniciales = res.data.filter((user: EnabledUsers) => user.isManager).map((user: EnabledUsers) => user.id.toString())
			setInitialValues(new Set([...iniciales]))
			setValues(new Set([...iniciales]))
		})
	}

	const handleCloseModal = () => {
		setShowModal(false)
	}

	const hasValuesChanged = () => {
		const sortedValues = [...values].sort()
		const sortedInitialValues = [...initialValues].sort()
		return JSON.stringify(sortedValues) !== JSON.stringify(sortedInitialValues)
	}

	const handleValidation = () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		if ((values as any).size === 0) {
			setIsValid({ isEmpty: true, isChangeValues: isValid.isChangeValues })
			setTouched(true)
		} else {
			setIsValid({ isEmpty: isValid.isEmpty, isChangeValues: hasValuesChanged() })
			setTouched(false)
		}
	}
	const handleSaveChanges = async () => {
		const notification = toast.loading('Procesando...')
		const users = [...values].map((item) => item.toString())
		await StandardService.assignUsersToStandard(
			id,
			{ users } as AssignedUsers
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

	const header: ReactNode = (
		<>
			<h2 className='text-2xl font-bold text-center'>
				Formulario de Asignacion de Encargados del Estandar {id}
			</h2>
		</>
	)

	const body: ReactNode = (
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
				isInvalid={!isValid.isEmpty || touched }
				errorMessage={!isValid.isEmpty || touched ? 'Debe seleccionar almenos un encargado' : ''}
				onClose={handleValidation}
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
		<>
			<Tooltip content='Editar Encargados'>
				<span className='text-default-400 cursor-pointer active:opacity-50' onClick={() =>
					setShowModal(true)
				}>
					{getCommonIcon('pencil', 17, 'fill-amber-300 hover:fill-amber-500')}
				</span>
			</Tooltip>
			<CustomModal
				isOpen={showModal}
				classNames={{
					// base: 'h-[60%]',
					header: 'p-2 border-b-[2px] border-gray-200'
					// body: 'h-[55%] py-2',
					// footer: 'h-[22%]'
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
		</>
	)
}

export default AssignmentModal
