/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
import showToast from '@/components/Form/ImprovementPlanForm/toastHelper'
import PlusIcon from '@/components/Icons/PlusIcon'
import SaveIcon from '@/components/Icons/SaveIcon'
import InterestedGroupTable from '@/components/Table/Reports/InterestedGroupsTable'
import { InterestedGroup } from '@/types/Reports'
import { Button, Card, CardBody, Divider, Input, Tooltip } from '@nextui-org/react'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

const InterestedGroupsFields = ({
	formik,
	interestedGroups
}: {
	formik: any
	interestedGroups: any
}) => {
	const interestedInputRef = useRef<HTMLInputElement | null>(null)
	const [isEditing, setIsEditing] = useState(false)
	const [singleGroup, setSingleGroup] = useState<InterestedGroup>({
		id: 0,
		interested: '',
		type: '',
		main_requirement_study_program: ''
	})
	const [groups, setGroups] = useState<InterestedGroup[]>(interestedGroups)
	const [errors, setErrors] = useState({
		interested: '',
		type: '',
		main_requirement_study_program: ''
	})

	useEffect(() => {
		if (interestedInputRef.current) {
			interestedInputRef.current.focus()
		}
	}, [])

	const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
		const updatedMember = { ...singleGroup, [ev.target.name]: ev.target.value }
		setSingleGroup(updatedMember)
	}

	const handleAdd = () => {
		const updatedErrors = {
			interested: '',
			type: '',
			main_requirement_study_program: ''
		}

		if (singleGroup.interested.trim() === '') {
			updatedErrors.interested = 'Campo necesario'
		}
		if (singleGroup.type.trim() === '') {
			updatedErrors.type = 'Campo necesario'
		}
		if (singleGroup.main_requirement_study_program.trim() === '') {
			updatedErrors.main_requirement_study_program = 'Campo necesario'
		}

		setErrors({ ...updatedErrors })

		if (Object.values(updatedErrors).some((error) => error !== '')) {
			showToast('error', 'Completar campos del miembro de cómite')

			return
		}

		setErrors({
			interested: '',
			type: '',
			main_requirement_study_program: ''
		})

		if (
			singleGroup.interested.trim() === '' ||
			singleGroup.type.trim() === '' ||
			singleGroup.main_requirement_study_program.trim() === ''
		) {
			showToast('error', 'Completar campos del grupo de interés')
			return
		}

		if (isEditing) {
			const updatedGroups = groups.map((group) => {
				if (group.id === singleGroup.id) {
					const updatedGroup = {
						...group,
						interested: singleGroup.interested,
						type: singleGroup.type,
						main_requirement_study_program: singleGroup.main_requirement_study_program
					}
					return updatedGroup
				}
				return group
			})
			setGroups(updatedGroups)
			formik.setFieldValue('interest_groups_study_program', updatedGroups)
			setIsEditing(false)
		} else {
			const updatedGroups = [...groups, { ...singleGroup, id: Date.now() }]
			setGroups(updatedGroups)
			formik.setFieldValue('interest_groups_study_program', updatedGroups)
		}

		setSingleGroup({
			id: 0,
			interested: '',
			type: '',
			main_requirement_study_program: ''
		})
	}

	const handleDelete = (_id: number) => {
		setGroups((prevGroups) => {
			const updatedGroups = prevGroups.filter((group) => group.id !== _id)
			formik.setFieldValue('interest_groups_study_program', updatedGroups)

			return updatedGroups
		})
	}

	const handleEdit = (_id: number) => {
		setIsEditing(true)

		setGroups((prevGroups) => {
			const groupToEdit = prevGroups.find((group) => group.id === _id)

			if (groupToEdit) {
				setSingleGroup({
					id: groupToEdit.id,
					interested: groupToEdit.interested,
					type: groupToEdit.type,
					main_requirement_study_program: groupToEdit.main_requirement_study_program
				})
			}

			return prevGroups
		})
	}

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
							<Input
								id='interested'
								name='interested'
								size='sm'
								type='text'
								ref={interestedInputRef}
								value={singleGroup.interested}
								onChange={handleChange}
								isInvalid={Boolean(errors.interested)}
								errorMessage={errors.interested}
								maxLength={100}
							/>
						</div>
						<div className='flex flex-col'>
							<label className='text-default-600 text-sm ml-1'>Tipo:</label>
							<Input
								id='type'
								name='type'
								size='sm'
								type='text'
								value={singleGroup.type}
								onChange={handleChange}
								isInvalid={Boolean(errors.type)}
								errorMessage={errors.type}
								maxLength={100}
							/>
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
							<Input
								id='main_requirement_study_program'
								name='main_requirement_study_program'
								size='sm'
								type='text'
								value={singleGroup.main_requirement_study_program}
								onChange={handleChange}
								isInvalid={Boolean(errors.main_requirement_study_program)}
								errorMessage={errors.main_requirement_study_program}
								maxLength={100}
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
				<InterestedGroupTable
					interestedGroups={groups}
					onDelete={handleDelete}
					onEdit={handleEdit}
				/>
			</div>
		</div>
	)
}

export default InterestedGroupsFields
