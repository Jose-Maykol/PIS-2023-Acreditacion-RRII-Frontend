/* eslint-disable @typescript-eslint/no-explicit-any */
import { UsersService } from '@/api/Users/usersService'
import PlusIcon from '@/components/Icons/PlusIcon'
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Select,
	SelectItem,
	useDisclosure,
	Selection
} from '@nextui-org/react'
import { useMemo, useState } from 'react'
import { toast } from 'react-toastify'

export default function AddUserModal({ onUserChanged }: { onUserChanged: () => void }) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [emailValue, setEmailValue] = useState('')
	const [roleValue, setRoleValue] = useState<Selection>(new Set([]))

	const roles = useMemo(
		() => [
			{ label: 'Administrador', value: 'administrador' },
			{ label: 'Docente', value: 'docente' }
		],
		[]
	)

	const isInvalid = useMemo(() => {
		if (emailValue === '') return false
	}, [emailValue])

	const handleSubmit = async () => {
		const notification = toast.loading('Procesando...')
		UsersService.createUser({
			email: emailValue,
			role: (roleValue as any).values().next().value
		}).then((res) => {
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
			setEmailValue('')
			setRoleValue(new Set([]))
			onUserChanged()
		})
	}

	return (
		<>
			<Button onClick={onOpen} color='primary' endContent={<PlusIcon width={15} height={15} fill='fill-white'/>}>
				Añadir usuario
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col gap-1 text-lightBlue-600'>
								Agregar usuario
							</ModalHeader>
							<ModalBody>
								<Input
									autoFocus
									label='Email'
									placeholder='Ingresa el email del usuario'
									variant='bordered'
									color={isInvalid ? 'danger' : 'default'}
									isInvalid={isInvalid}
									errorMessage={isInvalid && 'Email inválido'}
									onValueChange={setEmailValue}
								/>
								<Select
									items={roles}
									label='Rol'
									placeholder='Selecciona el rol del usuario'
									variant='bordered'
									onSelectionChange={setRoleValue}
								>
									{(roles) => <SelectItem key={roles.value}>{roles.label}</SelectItem>}
								</Select>
							</ModalBody>
							<ModalFooter>
								<Button color='danger' variant='flat' onPress={onClose}>
									Cancelar
								</Button>
								<Button
									color='primary'
									onPress={() => {
										handleSubmit()
										onClose()
									}}
								>
									Agregar
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
