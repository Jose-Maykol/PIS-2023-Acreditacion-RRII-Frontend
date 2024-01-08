/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
		if (
			singleGroup.interested.trim() === '' ||
			singleGroup.type.trim() === '' ||
			singleGroup.main_requirement_study_program.trim() === ''
		) {
			alert('Missing values')
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
		// const groupsForFormik = updatedGroups.map((group) => {
		// 	const { id, ...groupWithoutId } = group
		// 	return groupWithoutId
		// })
		// formik.setFieldValue('interest_groups_study_program', groupsForFormik)
	}

	// TODO: Fix Delete
	const handleDelete = (_id: number) => {
		const updatedGroups = groups.filter((group) => group.id !== _id)
		setGroups(updatedGroups)
		formik.setFieldValue('interest_groups_study_program', updatedGroups)
	}

	const handleEdit = (_id: number) => {
		setIsEditing(true)
		const groupToEdit = groups.find((group) => group.id === _id)

		console.log(groups)
		console.log(groupToEdit)

		if (groupToEdit) {
			setSingleGroup({
				id: groupToEdit.id,
				interested: groupToEdit.interested,
				type: groupToEdit.type,
				main_requirement_study_program: groupToEdit.main_requirement_study_program
			})
		}
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
