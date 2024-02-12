/* eslint-disable @typescript-eslint/no-explicit-any */
import { UsersService } from '@/api/Users/usersService'
import ActivateUserIcon from '@/components/Icons/ActivateUserIcon'
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

interface ActivateUserModalProps {
	userId: number
	onUserChanged: () => void
	status: string
}

export default function ActivateUserModal({
	userId,
	onUserChanged,
	status
}: ActivateUserModalProps) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [isValid, setIsValid] = useState<boolean>(false)
	const [touched, setTouched] = useState(false)
	const [statusValue, setStatusValue] = useState<Selection>(new Set([]))
	const { showToast, updateToast } = useToast()

	const handleSubmit = async () => {
		setTouched(true)
		if ((statusValue as any).size > 0) {
			const notification = showToast('Procesando...')
			UsersService.updateStatus(
				userId,
				{
					registration_status_id: (statusValue as any).values().next().value
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

	const states = useMemo(
		() => [
			{ label: 'Activo', value: 1 },
			{ label: 'Inactivo', value: 2 }
		],
		[]
	)

	const handleStatusValue = (value: Selection): void => {
		setStatusValue(value)
		setIsValid((value as any).size > 0)
	}

	return (
		<div className='flex flex-col gap-2'>
			<Tooltip color='primary' content='Cambiar estado'>
				<span className='text-default-400 cursor-pointer active:opacity-50' onClick={onOpen}>
					<ActivateUserIcon width={20} height={20} fill='fill-sky-300 hover:fill-sky-600' />
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
                Cambiar estado de usuario
							</ModalHeader>
							<ModalBody>
								<Select
									defaultSelectedKeys={[states.find(state => state.label.toLowerCase() === status.toLowerCase())?.value.toString() || '1']}
									items={states}
									label='Estado'
									placeholder='Selecciona nuevo estado del usuario'
									variant='bordered'
									errorMessage={isValid || !touched ? '' : 'Seleccione un estado'}
									isInvalid={!(isValid || !touched)}
									disallowEmptySelection
									onSelectionChange={handleStatusValue}
									onClose={() => setTouched(true)}
								>
									{(states) => <SelectItem key={states.value}>{states.label}</SelectItem>}
								</Select>
							</ModalBody>
							<ModalFooter>
								<Button
									color='danger'
									variant='flat'
									onPress={() => {
										onClose()
										setTouched(false)
										setIsValid(false)
									}}
								>
                  Cancelar
								</Button>
								<Button
									color='primary'
									isDisabled={!isValid || !touched}
									onPress={() => {
										handleSubmit()
										onClose()
										setTouched(false)
										setIsValid(false)
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