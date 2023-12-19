import PlusIcon from '@/components/Icons/PlusIcon'
import InterestedGroupTable from '@/components/Table/Reports/InterestedGroupsTable'
import { InterestedGroup } from '@/types/Reports'
import { Button, Card, CardBody, Divider, Input, Tooltip } from '@nextui-org/react'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

const InterestedGroupsFields = ({ formik }: { formik: any }) => {
	const interestedInputRef = useRef<HTMLInputElement | null>(null)

	const [singleGroup, setSingleGroup] = useState<InterestedGroup>({
		id: 0,
		interested: '',
		type: '',
		main_requirement_study_program: ''
	})
	const [groups, setGroups] = useState<InterestedGroup[]>([])

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
			alert('Empty values')
			return
		}

		const updatedGroups = [...groups, { ...singleGroup, id: Date.now() }]
		setGroups(updatedGroups)
		formik.setFieldValue('interest_groups_study_program', groups)
		setSingleGroup({ id: 0, interested: '', type: '', main_requirement_study_program: '' })
		console.log(groups)
	}

	// TODO: Delete & Update

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
				<InterestedGroupTable interestedGroup={groups} />
			</div>
		</div>
	)
}

export default InterestedGroupsFields
