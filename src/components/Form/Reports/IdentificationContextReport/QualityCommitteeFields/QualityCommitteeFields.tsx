import { Button, Card, CardBody, Divider, Input, Tooltip } from '@nextui-org/react'
import PlusIcon from '@/components/Icons/PlusIcon'
import QualityCommitteeTable from '@/components/Table/Reports/QualityCommitteeTable'
import { QualityMember } from '@/types/Reports'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

const members: QualityMember[] = [
	{
		id: 0,
		name: 'Example names',
		lastname: 'Example lastnames',
		email: 'example@unsa.edu.pe',
		position: 'Manager',
		phone: '987654321'
	},
	{
		id: 1,
		name: 'Scond names',
		lastname: 'Second lastnames',
		email: 'second@unsa.edu.pe',
		position: 'Secretary',
		phone: '948326400'
	}
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const QualityCommitteeFields = ({ formik }: { formik: any }) => {
	const fullnameInputRef = useRef<HTMLInputElement | null>(null)
	const [singleMember, setSingleMember] = useState({
		name: '',
		lastname: '',
		position: '',
		email: '',
		telephone: ''
	})

	useEffect(() => {
		if (fullnameInputRef.current) {
			fullnameInputRef.current.focus()
		}
	}, [])

	// TODO: HERE
	const handleInputValues = (values: QualityMember[]) => {
		formik.setFieldValue('members_quality_committee', values)
	}

	// TODO: HERE
	const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
		setSingleMember({ ...singleMember, [ev.target.name]: ev.target.value })

		// if (ev.target.value.trim() !== '') {
		// 	alert('Add something')
		// 	// setIsEmptyValue(false)
		// }

		console.log(singleMember)
	}

	const handleAdd = () => {
		formik.setFieldValue('members_quality_committee', singleMember)
	}

	// "members_quality_committee": [
	// 	{
	// 		"name": "Nombre1",
	// 		"lastname": "Apellido1",
	// 		"position": "Cargo1",
	// 		"email": "miembro1@example.com",
	// 		"telephone": "111-222-333"
	// 	}
	// ]

	return (
		<div>
			<Card className='p-3'>
				<CardBody>
					<h1 className='text-sm font-bold mb-3 '>Agregar Miembro del Cómite</h1>
					<div className='grid grid-cols-2 gap-4'>
						<div className='flex flex-col'>
							<div>
								<Tooltip
									content='Separar con coma (Ejemplo: Apellidos, Nombres)'
									color='foreground'
									placement='right'
									offset={5}
								>
									<label className='text-default-600 text-sm ml-1'>Apellidos y Nombres:</label>
								</Tooltip>
							</div>
							<Input id='fullname' name='fullname' size='sm' type='text' ref={fullnameInputRef} />
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
							onClick={handleAdd}
						>
							Agregar
						</Button>
					</div>
				</CardBody>
			</Card>

			<Divider className='my-5' />

			<div className='mt-5'>
				<QualityCommitteeTable qualityMembers={members} />
			</div>
		</div>
	)
}

export default QualityCommitteeFields
