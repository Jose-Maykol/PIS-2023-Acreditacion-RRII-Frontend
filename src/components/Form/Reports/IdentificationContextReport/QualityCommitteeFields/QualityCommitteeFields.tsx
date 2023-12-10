import { Button, Card, CardBody, Divider, Input, Tooltip } from '@nextui-org/react'
import PlusIcon from '@/components/Icons/PlusIcon'
import QualityCommitteeTable from '@/components/Table/Reports/QualityCommitteeTable'
import { QualityMember } from '@/types/Reports'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

// const members: QualityMember[] = [
// 	{
// 		id: 0,
// 		name: 'Example names',
// 		lastname: 'Example lastnames',
// 		email: 'example@unsa.edu.pe',
// 		position: 'Manager',
// 		phone: '987654321'
// 	},
// 	{
// 		id: 1,
// 		name: 'Scond names',
// 		lastname: 'Second lastnames',
// 		email: 'second@unsa.edu.pe',
// 		position: 'Secretary',
// 		phone: '948326400'
// 	}
// ]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const QualityCommitteeFields = ({ formik }: { formik: any }) => {
	const fullnameInputRef = useRef<HTMLInputElement | null>(null)
	const [singleMember, setSingleMember] = useState<QualityMember>({
		id: 0,
		name: '',
		lastname: '',
		position: '',
		email: '',
		telephone: ''
	})
	const [members, setMembers] = useState<QualityMember[]>([])

	useEffect(() => {
		if (fullnameInputRef.current) {
			fullnameInputRef.current.focus()
		}
	}, [])

	const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
		setSingleMember({ ...singleMember, [ev.target.name]: ev.target.value })
	}

	const handleAdd = () => {
		if (
			singleMember.name.trim() === '' ||
			singleMember.lastname.trim() === '' ||
			singleMember.position.trim() === '' ||
			singleMember.email.trim() === '' ||
			singleMember.telephone.trim() === ''
		) {
			alert('Missing fields')
			return
		}

		const updatedMembers = [...members, { ...singleMember, id: Date.now() }]
		setMembers(updatedMembers)
		formik.setFieldValue('members_quality_committee', members)
		setSingleMember({ id: 0, name: '', lastname: '', position: '', email: '', telephone: '' })
	}

	// TODO: FIX all members deleted
	const handleDelete = (id: number) => {
		const updatedMembers = members.filter((member) => member.id !== id)
		alert(`${JSON.stringify(members)}`)
		// setMembers(updatedMembers)
		// formik.setFieldValue('members_quality_committee', members)
	}

	return (
		<div>
			<Card className='p-3'>
				<CardBody>
					<h1 className='text-sm font-bold mb-3 '>Agregar Miembro del Cómite</h1>
					<div className='grid grid-cols-2 gap-4'>
						<div className='flex flex-col'>
							<label className='text-default-600 text-sm ml-1'>Nombres:</label>
							<Input
								id='name'
								name='name'
								value={singleMember.name}
								onChange={handleChange}
								size='sm'
								type='text'
							/>
						</div>
						<div className='flex flex-col'>
							<label className='text-default-600 text-sm ml-1'>Apellidos:</label>
							<Input
								id='lastname'
								name='lastname'
								value={singleMember.lastname}
								onChange={handleChange}
								size='sm'
								type='text'
							/>
						</div>
						<div className='flex flex-col'>
							<label className='text-default-600 text-sm ml-1'>Cargo:</label>
							<Input
								id='position'
								name='position'
								value={singleMember.position}
								onChange={handleChange}
								size='sm'
								type='text'
							/>
						</div>
						<div className='flex flex-col'>
							<label className='text-default-600 text-sm ml-1'>Correo Electrónico:</label>
							<Input
								id='email'
								name='email'
								value={singleMember.email}
								onChange={handleChange}
								size='sm'
								type='email'
							/>
						</div>
						<div className='flex flex-col'>
							<label className='text-default-600 text-sm ml-1'>Teléfono:</label>
							<Input
								id='telephone'
								name='telephone'
								value={singleMember.telephone}
								onChange={handleChange}
								size='sm'
								type='phone'
							/>
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
				<QualityCommitteeTable qualityMembers={members} onDelete={handleDelete} />
			</div>
		</div>
	)
}

export default QualityCommitteeFields
