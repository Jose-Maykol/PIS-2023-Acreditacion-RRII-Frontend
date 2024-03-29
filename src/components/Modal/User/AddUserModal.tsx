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
import { useToast } from '@/hooks/toastProvider'

export default function AddUserModal({ onUserChanged }: { onUserChanged: () => void }) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [emailValue, setEmailValue] = useState('')
	const [roleValue, setRoleValue] = useState<Selection>(new Set([]))
	const [isValid, setIsValid] = useState<{email: boolean | null, role: boolean}>({ email: null, role: false })
	const [touched, setTouched] = useState(false)
	const { showToast, updateToast } = useToast()

	const validateEmail = (value:string) => {
		return /.+@unsa\.edu\.pe$/.test(value)
	}

	const roles = useMemo(
		() => [
			{ label: 'Administrador', value: 'administrador' },
			{ label: 'Docente', value: 'docente' }
		], [])

	const handleEmailValue = (value: string): void => {
		setEmailValue(value)
		setIsValid({ ...isValid, email: validateEmail(value) })
	}

	const handleRoleValue = (value: Selection): void => {
		setRoleValue(value)
		setIsValid({ ...isValid, role: (value as any).size > 0 })
	}

	const handleSubmit = async () => {
		const notification = showToast('Procesando...')
		UsersService.createUser({
			email: emailValue,
			role: (roleValue as any).values().next().value
		}).then((res) => {
			if (res.status === 1) {
				updateToast(notification, res.message, 'success')
			} else {
				updateToast(notification, res.message, 'error')
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
					setIsValid({ email: null, role: true })
				}}
				placement='center'>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col gap-1 text-lightBlue-600 uppercase'>
								Agregar usuario
							</ModalHeader>
							<ModalBody>
								<Input
									autoFocus
									label='Email'
									placeholder='Ingresa el email del usuario'
									variant='bordered'
									color={!isValid.email && isValid.email !== null ? 'danger' : 'default'}
									isInvalid={!isValid.email && isValid.email !== null}
									errorMessage={!isValid.email && isValid.email !== null ? 'Email inválido' : ''}
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
										setIsValid({ email: null, role: true })
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
