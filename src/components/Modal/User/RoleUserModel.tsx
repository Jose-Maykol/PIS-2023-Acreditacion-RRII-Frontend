/* eslint-disable @typescript-eslint/no-explicit-any */
import { UsersService } from '@/api/Users/usersService'
import PencilIcon from '@/components/Icons/PencilIcon'
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Select,
	Tooltip,
	useDisclosure,
	Selection,
	SelectItem
} from '@nextui-org/react'
import { useMemo, useState } from 'react'
import { toast } from 'react-toastify'

export default function RoleUserModel({ userId, onUserChanged }: {userId: number, onUserChanged: () => void}) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [isValid, setIsValid] = useState<boolean>(true)
	const [touched, setTouched] = useState(false)
	const [statusValue, setStatusValue] = useState<Selection>(new Set([]))

	const handleSubmit = async () => {
		setTouched(true)
		if ((statusValue as any).size > 0) {
			const notification = toast.loading('Procesando...')
			UsersService.updateRole(
				userId,
				{
					role_id: (statusValue as any).values().next().value
				}
			).then((res) => {
				if (res.status === 1) {
					toast.update(notification, {
						render: res.message,
						type: 'success',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						isLoading: false,
						theme: 'light'
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
						theme: 'light'
					})
				}
				onUserChanged()
				setTouched(false)
				setIsValid(false)
			})
		} else {
			setIsValid(false)
		}
	}

	const roles = useMemo(
		() => [
			{ label: 'Administrador', value: 1 },
			{ label: 'Docente', value: 2 }
		],
		[]
	)

	const handleStatusValue = (value: Selection): void => {
		setStatusValue(value)
		setIsValid((value as any).size > 0)
	}

	return (
		<div className='flex flex-col gap-2'>
			<Tooltip content='Cambiar rol'>
				<span className='text-danger cursor-pointer active:opacity-50' onClick={onOpen}>
					<PencilIcon width={17} height={17} fill='fill-gray-400 hover:fill-gray-900'/>
				</span>
			</Tooltip>
			<Modal
				isOpen={isOpen}
				onOpenChange={() => {
					onOpenChange()
					setTouched(false)
					setIsValid(false)
				}}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col gap-1'>
                Cambiar rol del usuario
							</ModalHeader>
							<ModalBody>
								<Select
									items={roles}
									label='Rol'
									placeholder='Selecciona rol de usuario'
									variant='bordered'
									errorMessage={isValid || !touched ? '' : 'Seleccione un rol'}
									isInvalid={!(isValid || !touched)}
									onSelectionChange={handleStatusValue}
									onClose={() => setTouched(true)}
								>
									{(roles) => <SelectItem key={roles.value}>{roles.label}</SelectItem>}
								</Select>
							</ModalBody>
							<ModalFooter>
								<Button
									color='danger'
									variant='flat'
									onPress={() => {
										setTouched(false)
										setIsValid(false)
										onClose()
									}}
								>
                  Cancelar
								</Button>
								<Button
									color='primary'
									isDisabled={!isValid || !touched}
									onPress={() => {
										handleSubmit()
										setTouched(false)
										setIsValid(false)
										onClose()
									}}
								>
                  Actualizar
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	)
}