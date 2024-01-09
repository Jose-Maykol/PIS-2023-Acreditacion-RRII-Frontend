/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable multiline-ternary */
import { Button, Card, CardBody, Divider, Input } from '@nextui-org/react'
import PlusIcon from '@/components/Icons/PlusIcon'
import QualityCommitteeTable from '@/components/Table/Reports/QualityCommitteeTable'
import { QualityMember } from '@/types/Reports'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import SaveIcon from '@/components/Icons/SaveIcon'
import showToast from '@/components/Form/ImprovementPlanForm/toastHelper'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const QualityCommitteeFields = ({
	formik,
	qualityMembersCommittee
}: {
	formik: any
	qualityMembersCommittee: any
}) => {
	const fullnameInputRef = useRef<HTMLInputElement | null>(null)

	const [isEditing, setIsEditing] = useState(false)

	const [singleMember, setSingleMember] = useState<QualityMember>({
		id: 0,
		name: '',
		lastname: '',
		position: '',
		email: '',
		telephone: ''
	})
	const [members, setMembers] = useState<QualityMember[]>(qualityMembersCommittee)

	useEffect(() => {
		if (fullnameInputRef.current) {
			fullnameInputRef.current.focus()
		}
	}, [])

	const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
		const updatedMember = { ...singleMember, [ev.target.name]: ev.target.value }
		setSingleMember(updatedMember)
	}

	const handleAdd = () => {
		if (
			singleMember.name.trim() === '' ||
			singleMember.lastname.trim() === '' ||
			singleMember.position.trim() === '' ||
			singleMember.email.trim() === '' ||
			singleMember.telephone.trim() === ''
		) {
			showToast('error', 'Completar campos del miembro de cómite')
			return
		}

		if (isEditing) {
			const updatedMembers = members.map((member) => {
				if (member.id === singleMember.id) {
					const updatedMember = {
						...member,
						name: singleMember.name,
						lastname: singleMember.lastname,
						position: singleMember.position,
						email: singleMember.email,
						telephone: singleMember.telephone
					}
					return updatedMember
				}
				return member
			})
			setMembers(updatedMembers)
			formik.setFieldValue('members_quality_committee', updatedMembers)
			setIsEditing(false)
		} else {
			const updatedMembers = [...members, { ...singleMember, id: Date.now() }]
			setMembers(updatedMembers)
			formik.setFieldValue('members_quality_committee', updatedMembers)
		}

		setSingleMember({ id: 0, name: '', lastname: '', position: '', email: '', telephone: '' })
	}

	const handleDelete = (_id: number) => {
		setMembers((prevMembers) => {
			const updatedMembers = prevMembers.filter((member) => member.id !== _id)
			formik.setFieldValue('members_quality_committee', updatedMembers)

			return updatedMembers
		})
	}

	const handleEdit = (_id: number) => {
		setIsEditing(true)

		setMembers((prevMembers) => {
			const memberToEdit = prevMembers.find((member) => member.id === _id)
			if (memberToEdit) {
				setSingleMember({
					id: memberToEdit.id,
					name: memberToEdit.name,
					lastname: memberToEdit.lastname,
					position: memberToEdit.position,
					email: memberToEdit.email,
					telephone: memberToEdit.telephone
				})
			}

			return prevMembers
		})
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
							startContent={
								isEditing ? (
									<SaveIcon width={15} height={15} fill='fill-blue-300' />
								) : (
									<PlusIcon width={15} height={15} fill='fill-blue-300' />
								)
							}
							onClick={handleAdd}
						>
							{isEditing ? 'Guardar' : 'Agregar'}
						</Button>
					</div>
				</CardBody>
			</Card>

			<Divider className='my-5' />

			<div className='mt-5'>
				<QualityCommitteeTable
					qualityMembers={members}
					onDelete={handleDelete}
					onEdit={handleEdit}
				/>
			</div>
		</div>
	)
}

export default QualityCommitteeFields
