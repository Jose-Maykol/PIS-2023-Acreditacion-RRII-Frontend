/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect, ReactNode } from 'react'
import { Button, Select, SelectItem, Avatar, Chip, SelectedItems, Selection, Tooltip, useDisclosure } from '@nextui-org/react'
import CustomModal from '@/components/Modal/CustomModal'
import { EnabledUsers, AssignedUsers } from '@/types/Standard'
import { StandardService } from '@/api/Estandar/StandardService'
import { useToast } from '@/hooks/toastProvider'
import { getCommonIcon } from '@/utils/utils'
import _ from 'lodash'

const AssignmentModal = ({
	id,
	onReload
}: {
	id: string
	onReload: () => void
}) => {
	const [users, setUsers] = useState<EnabledUsers[]>([])
	const [values, setValues] = useState<Selection>(new Set([]))
	const [initialValues, setInitialValues] = useState<Selection>(new Set([]))
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { showToast, updateToast } = useToast()

	useEffect(() => {
		loadInitialValues()
	}, [isOpen])

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

	const handleSubmitChanges = async () => {
		const notification = showToast('Procesando...')
		const users = [...values].map((item) => item.toString())
		await StandardService.assignUsersToStandard(
			id,
			{ users } as AssignedUsers
		).then((res) => {
			if (res.status === 1) {
				onReload()
				updateToast(notification, res.message, 'success')
			} else {
				updateToast(notification, res.message, 'error')
			}
		})
		onClose()
	}

	const header: ReactNode = (
		<h2 className='flex flex-col gap-1 text-lightBlue-600 uppercase'>
			Asignar encargados al "Estándar {id}"
		</h2>
	)

	const body: ReactNode = (
		<div className='h-full max-h-[96%]'>
			<Select
				items={users}
				label='Encargados'
				description={
					<div className='flex justify-between px-1 py-1'>
						<div>
							<div className='flex items-center gap-1'>
								{ (values as any).size ? getCommonIcon('check', 15, 'fill-green-600') : getCommonIcon('close', 15, 'fill-red-600')}<span>El formulario no esta vacio</span>
							</div>
							<div className='flex items-center gap-1'>
								{ !_.isEqual(values, initialValues) ? getCommonIcon('check', 15, 'fill-green-600') : getCommonIcon('close', 15, 'fill-red-600')}<span>Hubo cambios en los encargados</span>
							</div>
						</div>
						<div>
							<span>Encargados: {(values as any).size}</span>
						</div>
					</div>
				}
				variant='bordered'
				isMultiline={true}
				selectionMode='multiple'
				placeholder='Selecciona 1 o más encargados'
				classNames={{
					base: 'h-full',
					trigger: 'flex py-2 rounded-lg',
					label: 'hidden',
					value: '-mt-4 p-2 text-md',
					description: 'text-xs text-default-500'
				}}
				scrollShadowProps={{
					isEnabled: false
				}}
				selectedKeys={values}
				onSelectionChange={setValues}
				renderValue={(items: SelectedItems<EnabledUsers>) => {
					return (
						<div className='flex flex-wrap gap-2 overflow-y-auto scrollbar-hide max-h-[75px]'>
							{items.map((item) => (
								<Chip key={item.key} className='bg-default-200' onClose={() => setValues(new Set([...values].filter((value) => value !== item.key)))}>
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
					onOpen()
				}>
					{getCommonIcon('pencil', 17, 'fill-amber-300 hover:fill-amber-500')}
				</span>
			</Tooltip>
			<CustomModal
				isOpen={isOpen}
				size='2xl'
				onClose={onClose}
				header={header}
				body={body}
				footer={
					<>
						<Button color='danger' variant='light' onPress={onClose}>
							Cancelar
						</Button>
						<Button className='bg-lightBlue-600 text-white' variant='solid' isDisabled={(values as any).size === 0 || _.isEqual(values, initialValues)} onPress={handleSubmitChanges} >
							Guardar
						</Button>
					</>
				}
				classNames={{
					base: 'rounded-lg shadow-[0_5px_20px_-5px_rgba(0,0,0,0.7)]',
					backdrop: 'bg-[#292f46]/30 backdrop-opacity-40',
					closeButton: 'hover:bg-red-600 hover:text-white'
				}}
			/>
		</>
	)
}

export default AssignmentModal
