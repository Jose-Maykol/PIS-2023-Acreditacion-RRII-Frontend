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
import { useToast } from '@/hooks/toastProvider'

interface RoleUserModalProps {
	userId: number
	onUserChanged: () => void
	role: string
}

export default function RoleUserModal({
	userId,
	onUserChanged,
	role
}: RoleUserModalProps) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [isValid, setIsValid] = useState<boolean>(false)
	const [touched, setTouched] = useState(false)
	const [statusValue, setStatusValue] = useState<Selection>(new Set([]))
	const { showToast, updateToast } = useToast()

	const handleSubmit = async () => {
		setTouched(true)
		if ((statusValue as any).size > 0) {
			const notification = showToast('Procesando...')
			UsersService.updateRole(
				userId,
				{
					role_id: (statusValue as any).values().next().value
				}
			).then((res) => {
				if (res.status === 1) {
					updateToast(notification, res.message, 'success')
				} else {
					updateToast(notification, res.message, 'error')
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
		], [])

	const handleRoleValue = (value: Selection): void => {
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
							<ModalHeader className='flex flex-col gap-1 text-lightBlue-600 uppercase'>
                Cambiar rol del usuario
							</ModalHeader>
							<ModalBody>
								<Select
									defaultSelectedKeys={[roles.find(item => item.label.toLowerCase() === role.toLowerCase())?.value.toString() || '2']}
									items={roles}
									label='Rol'
									placeholder='Selecciona rol de usuario'
									variant='bordered'
									errorMessage={isValid || !touched ? '' : 'Seleccione un rol'}
									isInvalid={!(isValid || !touched)}
									disallowEmptySelection
									onSelectionChange={handleRoleValue}
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