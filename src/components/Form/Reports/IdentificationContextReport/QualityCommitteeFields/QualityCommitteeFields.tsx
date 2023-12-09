import PlusIcon from '@/components/Icons/PlusIcon'
import { Button, Card, CardBody, Input } from '@nextui-org/react'

const QualityCommitteeFields = () => {
	return (
		<div>
			<Card className='p-3'>
				<CardBody>
					<h1 className='text-sm font-bold mb-3 '>Agregar Miembro del Cómite</h1>
					<div className='grid grid-cols-2 gap-4'>
						<div className='flex flex-col'>
							<label className='text-default-600 text-sm ml-1'>Apellidos y Nombres:</label>
							<Input id='fullname' name='fullname' size='sm' type='text' />
						</div>
						<div className='flex flex-col'>
							<label className='text-default-600 text-sm ml-1'>Cargo:</label>
							<Input id='charge' name='charge' size='sm' type='text' />
						</div>
						<div className='flex flex-col'>
							<label className='text-default-600 text-sm ml-1'>Correo Electrónico:</label>
							<Input id='email' name='email' size='sm' type='email' />
						</div>
						<div className='flex flex-col'>
							<label className='text-default-600 text-sm ml-1'>Teléfono:</label>
							<Input id='fullname' name='fullname' size='sm' type='phone' />
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

export default QualityCommitteeFields
