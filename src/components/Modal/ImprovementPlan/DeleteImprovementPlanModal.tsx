/* eslint-disable @typescript-eslint/no-explicit-any */
import TrashIcon from '@/components/Icons/TrashIcon'
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Tooltip,
	useDisclosure
} from '@nextui-org/react'

export default function DeleteImprovementPlanModal() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	return (
		<div className='flex flex-col gap-2'>
			<Tooltip color='danger' content='Eliminar Plan de Mejora'>
				<span className='text-danger cursor-pointer active:opacity-50' onClick={onOpen}>
					<TrashIcon width={17} height={17} fill='fill-danger-400 hover:fill-danger-900' />
				</span>
			</Tooltip>
			<Modal
				isOpen={isOpen}
				onOpenChange={() => {
					onOpenChange()
				}}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col gap-1'>Confirmar</ModalHeader>
							<ModalBody>¿Está seguro que desea eliminar este Plan de Mejora?</ModalBody>
							<ModalFooter>
								<Button
									color='primary'
									variant='flat'
									onPress={() => {
										onClose()
									}}
								>
									Cancelar
								</Button>
								<Button
									color='danger'
									onPress={() => {
										onClose()
									}}
								>
									Eliminar
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	)
}
