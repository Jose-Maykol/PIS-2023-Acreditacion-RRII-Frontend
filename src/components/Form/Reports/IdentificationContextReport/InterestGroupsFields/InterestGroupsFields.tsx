import PlusIcon from '@/components/Icons/PlusIcon'
import QuestionIcon from '@/components/Icons/QuestionIcon'
import { Button, Card, CardBody, Input, Tooltip } from '@nextui-org/react'

const InterestGroupsFields = () => {
	return (
		<div>
			<Card className='p-3'>
				<CardBody>
					<h1 className='text-sm font-bold mb-3 '>Agregar Grupos de Interés</h1>
					<div className='grid grid-cols-2 gap-4'>
						<div className='flex flex-col'>
							<div className='flex items-center'>
								{/* <QuestionIcon width={12} height={12} fill='fill-default-700' /> */}
								<Tooltip
									content='Institución o individuo'
									color='foreground'
									placement='right'
									offset={3}
								>
									<label className='text-default-600 text-sm ml-1'>Interesado:</label>
								</Tooltip>
							</div>
							<Input id='interested' name='interested' size='sm' type='text' />
						</div>
						<div className='flex flex-col'>
							<label className='text-default-600 text-sm ml-1'>Tipo:</label>
							<Input id='type' name='type' size='sm' type='text' />
						</div>
						<div className='flex flex-col'>
							<div className='flex items-center'>
								<Tooltip
									content='Al programa de estudio por parte del interesado'
									color='foreground'
									placement='right'
									offset={3}
								>
									<label className='text-default-600 text-sm ml-1'>Requerimiento Principal:</label>
								</Tooltip>
							</div>
							<Input id='requirement' name='requirement' size='sm' type='text' />
						</div>
					</div>
					<div className='flex flex-row-reverse mt-5'>
						<Button
							color='primary'
							startContent={<PlusIcon width={15} height={15} fill='fill-blue-300' />}
							onClick={() => {}}
						>
							Agregar
						</Button>
					</div>
				</CardBody>
			</Card>
		</div>
	)
}

export default InterestGroupsFields
