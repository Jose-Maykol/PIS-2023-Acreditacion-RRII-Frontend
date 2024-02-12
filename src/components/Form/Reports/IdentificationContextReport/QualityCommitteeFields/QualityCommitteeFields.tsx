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
	const [errors, setErrors] = useState({
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

	const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
		const updatedMember = { ...singleMember, [ev.target.name]: ev.target.value }
		setSingleMember(updatedMember)
	}

	const handleAdd = () => {
		const updatedErrors = {
			name: '',
			lastname: '',
			position: '',
			email: '',
			telephone: ''
		}

		if (singleMember.name.trim() === '') {
			updatedErrors.name = 'Campo necesario'
		}
		if (singleMember.lastname.trim() === '') {
			updatedErrors.lastname = 'Campo necesario'
		}
		if (singleMember.position.trim() === '') {
			updatedErrors.position = 'Campo necesario'
		}
		if (singleMember.telephone.trim() === '') {
			updatedErrors.telephone = 'Campo necesario'
		} else {
			const phoneRegex = /^[0-9()\s.-]+$/
			if (singleMember.telephone.trim() !== '' && !phoneRegex.test(singleMember.telephone.trim())) {
				updatedErrors.telephone = 'Colocar un teléfono válido'
			}
		}
		if (singleMember.email.trim() === '') {
			updatedErrors.email = 'Campo necesario'
		} else {
			const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/
			if (singleMember.email.trim() !== '' && !emailRegex.test(singleMember.email.trim())) {
				updatedErrors.email = 'Colocar un email válido'
			}
		}

		setErrors({ ...updatedErrors })

		if (Object.values(updatedErrors).some((error) => error !== '')) {
			showToast('error', 'Completar campos del miembro de cómite')

			return
		}

		setErrors({
			name: '',
			lastname: '',
			position: '',
			email: '',
			telephone: ''
		})

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
								isInvalid={Boolean(errors.name)}
								errorMessage={errors.name}
								size='sm'
								type='text'
								maxLength={100}
							/>
						</div>
						<div className='flex flex-col'>
							<label className='text-default-600 text-sm ml-1'>Apellidos:</label>
							<Input
								id='lastname'
								name='lastname'
								value={singleMember.lastname}
								onChange={handleChange}
								isInvalid={Boolean(errors.lastname)}
								errorMessage={errors.lastname}
								size='sm'
								type='text'
								maxLength={100}
							/>
						</div>
						<div className='flex flex-col'>
							<label className='text-default-600 text-sm ml-1'>Cargo:</label>
							<Input
								id='position'
								name='position'
								value={singleMember.position}
								onChange={handleChange}
								isInvalid={Boolean(errors.position)}
								errorMessage={errors.position}
								size='sm'
								type='text'
								maxLength={64}
							/>
						</div>
						<div className='flex flex-col'>
							<label className='text-default-600 text-sm ml-1'>Correo Electrónico:</label>
							<Input
								id='email'
								name='email'
								value={singleMember.email}
								onChange={handleChange}
								isInvalid={Boolean(errors.email)}
								errorMessage={errors.email}
								size='sm'
								type='email'
								maxLength={100}
							/>
						</div>
						<div className='flex flex-col'>
							<label className='text-default-600 text-sm ml-1'>Teléfono:</label>
							<Input
								id='telephone'
								name='telephone'
								value={singleMember.telephone}
								onChange={handleChange}
								isInvalid={Boolean(errors.telephone)}
								errorMessage={errors.telephone}
								size='sm'
								type='phone'
								maxLength={20}
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
