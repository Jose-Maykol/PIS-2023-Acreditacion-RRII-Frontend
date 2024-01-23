/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlanMejoraService } from '@/api/PlanMejora/PlanMejoraService'
import TrashIcon from '@/components/Icons/TrashIcon'
import { ImprovementPlans } from '@/types/PlanMejora'

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
import { Dispatch, SetStateAction } from 'react'
import { useToast } from '@/hooks/toastProvider'

type DeleteImprovementPlanModalProps = {
	planId: number
	setImprovementPlans: Dispatch<SetStateAction<ImprovementPlans[]>>
}

export default function DeleteImprovementPlanModal({
	planId,
	setImprovementPlans
}: DeleteImprovementPlanModalProps) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const { showToast, updateToast } = useToast()

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
										PlanMejoraService.delete(planId)
											.then((res) => {
												const notification = showToast('Eliminando...')
												if (res.data.status === 1) {
													updateToast(notification, 'Plan de mejora eliminado satisfactoriamente', 'success')
													setImprovementPlans((previous: Array<ImprovementPlans>) =>
														previous.filter((plan) => plan.id !== planId)
													)
												} else {
													updateToast(notification, 'Ocurrió un error al elimnar plan de mejora', 'error')
												}
											})
											.catch(console.log)
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
