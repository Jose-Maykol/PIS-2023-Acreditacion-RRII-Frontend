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
	const [isValid, setIsValid] = useState<{email: boolean, role: boolean}>({ email: true, role: true })
	const [touched, setTouched] = useState(false)
	const validateEmail = (value:string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)

	const roles = useMemo(
		() => [
			{ label: 'Administrador', value: 'administrador' },
			{ label: 'Docente', value: 'docente' }
		],
		[]
	)

	const handleEmailValue = (value: string): void => {
		setEmailValue(value)
		setIsValid({ ...isValid, email: !isInvalid })
	}

	const handleRoleValue = (value: Selection): void => {
		setRoleValue(value)
		setIsValid({ ...isValid, role: (value as any).size > 0 })
	}

	const isInvalid = useMemo(() => {
		if (emailValue === '') return true
		return !validateEmail(emailValue)
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
			<Modal
				isOpen={isOpen}
				onOpenChange={() => {
					onOpenChange()
					setTouched(false)
					setIsValid({ email: true, role: true })
				}}
				placement='center'>
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
									color={isValid.email ? 'default' : 'danger'}
									isInvalid={!isValid.email}
									errorMessage={isValid.email ? '' : 'Email inválido'}
									onValueChange={handleEmailValue}
								/>
								<Select
									items={roles}
									label='Rol'
									placeholder='Selecciona el rol del usuario'
									variant='bordered'
									errorMessage={isValid.role || !touched ? '' : 'Selecciona un rol'}
									isInvalid={!(isValid.role || !touched)}
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
										onClose()
										setTouched(false)
										setIsValid({ email: true, role: true })
									}}>
									Cancelar
								</Button>
								<Button
									color='primary'
									isDisabled={!isValid.email || !isValid.role || !touched}
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
