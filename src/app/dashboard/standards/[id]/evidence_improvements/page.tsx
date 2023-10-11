'use client'

import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import ImprovementPlanModal from '@/components/Modal/ImprovementPlanModal'
import ImprovementPlansTable from '@/components/Table/ImprovementPlansTable'
import { Button } from '@nextui-org/react'
import { useState } from 'react'

export default function EvidenceImprovementsPage() {
	const [isModalOpen, setModalOpen] = useState(false)

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
		// 	"message": "!Plan de mejora creado exitosamente",
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

	return (
		<ContentWrapper className='bg-white h-[670px] w-[96%] m-auto rounded-md py-5 px-10'>
			<ImprovementPlansTable handleOpenModal={handleOpenModal} />

			<div>
				<ImprovementPlanModal
					isOpen={isModalOpen}
					onClose={handleCloseModal}
					header='Confirmar eliminación'
					body='¿Estás seguro de que deseas eliminar este artículo?'
					footer={
						<>
							<Button color='danger' variant='flat' onPress={handleCloseModal}>
								Cancelar
							</Button>
							<Button color='primary' onPress={handleAsignImprovementPlan}>
								Confirmar
							</Button>
						</>
					}
				/>
			</div>
		</ContentWrapper>
	)
}
