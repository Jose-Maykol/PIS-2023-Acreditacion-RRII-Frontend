'use client'

import { UsersService } from '@/api/Users/usersService'
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import ImprovementPlanModal from '@/components/Modal/ImprovementPlanModal'
import ImprovementPlansTable from '@/components/Table/ImprovementPlansTable'
import { User } from '@/types/User'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useEffect, useState } from 'react'

export default function EvidenceImprovementsPage() {
	const [isModalOpen, setModalOpen] = useState(false)
	const [users, setUsers] = useState([])

	useEffect(() => {
		UsersService.listUsers()
			.then((res) => {
				setUsers(res.data.data)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	const handleOpenModal = () => {
		setModalOpen(true)
	}

	const handleCloseModal = () => {
		setModalOpen(false)
	}

	// TODO: CREATE A PLAN
	const handleAsignImprovementPlan = () => {
		// /api/{year}/{semester}/plans - POST /api/2023/A/plans
		const data = {
			code: 'OM01-12-2023',
			name: 'Plan de Mejora 1',
			opportunity_for_improvement: 'Oportunidad',
			semester_execution: '2023-A',
			advance: 60,
			duration: 8,
			efficacy_evaluation: false,
			standard_id: 1,
			plan_status_id: 2,
			sources: [
				{
					description: 'Fuente 1'
				}
			],
			problems_opportunities: [
				{
					description: 'Problema 1'
				},
				{
					description: 'Problema 2'
				}
			],
			root_causes: [
				{
					description: 'Causa raíz 1'
				},
				{
					description: 'Causa raíz 2'
				}
			],
			improvement_actions: [
				{
					description: 'Acción de mejora 1'
				},
				{
					description: 'Acción de mejora 2'
				}
			],
			resources: [
				{
					description: 'Recurso 1'
				},
				{
					description: 'Recurso 2'
				}
			],
			goals: [
				{
					description: 'Meta 1'
				},
				{
					description: 'Meta 2'
				}
			],
			responsibles: [
				{
					description: 'Responsable 1'
				},
				{
					description: 'Responsable 2'
				}
			],
			observations: [
				{
					description: 'Observación 1'
				},
				{
					description: 'Observación 2'
				}
			]
		}

		console.log(data)

		// {
		// 	'message": "!Plan de mejora creado exitosamente",
		// 	"data": {
		// 		"code": "OM01-12-2023",
		// 		"name": "Plan de Mejora 1",
		// 		"opportunity_for_improvement": "Oportunidad",
		// 		"semester_execution": "2023-A",
		// 		"advance": 60,
		// 		"duration": 8,
		// 		"efficacy_evaluation": false,
		// 		"plan_status_id": 2,
		// 		"standard_id": 1,
		// 		"user_id": 1,
		// 		"date_id": 1,
		// 		"registration_status_id": 1,
		// 		"updated_at": "2023-10-02T01:21:28.000000Z",
		// 		"created_at": "2023-10-02T01:21:28.000000Z",
		// 		"id": 1
		// 	}
		// }

		handleCloseModal()
	}

	const standards = [
		{ label: 'Estádar 1', value: 'e1' },
		{ label: 'Estádar 2', value: 'e2' },
		{ label: 'Estádar 3', value: 'e3' },
		{ label: 'Estádar 4', value: 'e4' }
	]

	return (
		<ContentWrapper className='bg-white h-[670px] w-[96%] m-auto rounded-md py-5 px-10'>
			<ImprovementPlansTable handleOpenModal={handleOpenModal} />

			<div>
				<ImprovementPlanModal
					isOpen={isModalOpen}
					onClose={handleCloseModal}
					header='ASIGNAR PLAN DE MEJORA'
					body={
						<>
							<Input autoFocus label='CÓDIGO' placeholder='OMXX-YY-ZZZZ' variant='bordered' />
							<Select label='USUARIO ENCARGADO'>
								{users.map((user: User) => (
									<SelectItem key={user.id} value={user.id}>
										{`${user.name} ${user.lastname}`}
									</SelectItem>
								))}
							</Select>
							<Select label='ESTÁNDAR'>
								{standards.map((standard) => (
									<SelectItem key={standard.value} value={standard.value}>
										{standard.label}
									</SelectItem>
								))}
							</Select>
							<Input
								label='NOMBRE DEL PLAN DE MEJORA'
								placeholder='Ej. Plan...'
								variant='bordered'
							/>
						</>
					}
					footer={
						<>
							<Button color='danger' variant='flat' onPress={handleCloseModal} className='mt-3'>
								Cancelar
							</Button>
							<Button color='primary' onPress={handleAsignImprovementPlan} className='mt-3'>
								Asignar PM
							</Button>
						</>
					}
				/>
			</div>
		</ContentWrapper>
	)
}
