/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlanMejoraService } from '@/api/PlanMejora/PlanMejoraService'
import TrashIcon from '@/components/Icons/TrashIcon'
import { ImprovementPlans } from '@/types/ImprovementPlan'

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
import { toast } from 'react-toastify'

type DeleteImprovementPlanModalProps = {
	planId: number
	setImprovementPlans: Dispatch<SetStateAction<ImprovementPlans[]>>
}

export default function DeleteImprovementPlanModal({
	planId,
	setImprovementPlans
}: DeleteImprovementPlanModalProps) {
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
										PlanMejoraService.delete(planId)
											.then((res) => {
												if (res.data.status === 1) {
													toast.success('Plan de mejora eliminado satisfactoriamente', {
														autoClose: 2000,
														hideProgressBar: false,
														closeOnClick: true,
														pauseOnHover: true,
														draggable: true,
														isLoading: false,
														theme: 'light'
													})
													setImprovementPlans((previous: Array<ImprovementPlans>) =>
														previous.filter((plan) => plan.id !== planId)
													)
												} else {
													toast.error('Ocurrió un error al elimnar plan de mejora', {
														autoClose: 2000,
														hideProgressBar: false,
														closeOnClick: true,
														pauseOnHover: true,
														draggable: true,
														isLoading: false,
														theme: 'light'
													})
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
