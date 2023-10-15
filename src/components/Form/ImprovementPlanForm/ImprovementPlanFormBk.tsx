import { PlanMejoraService } from '@/api/PlanMejora/planMejoraService'
import CloseIcon from '@/components/Icons/CloseIcon'
import SaveIcon from '@/components/Icons/SaveIcon'
import { Button, Checkbox, Input, Select, SelectItem } from '@nextui-org/react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const years = [
	{ label: '2020', value: '2020' },
	{ label: '2021', value: '2021' },
	{ label: '2022', value: '2022' },
	{ label: '2023', value: '2023' },
	{ label: '2024', value: '2024' }
]

const semesters = [
	{ label: 'A', value: 'A' },
	{ label: 'B', value: 'B' }
]

const status = [
	{ label: 'En proceso', value: 0 },
	{ label: 'Concluido', value: 1 },
	{ label: 'Programado', value: 2 },
	{ label: 'Reprogramado', value: 3 },
	{ label: 'Planificado', value: 4 }
]

type ImprovementPlanFormProps = {
	standardId: string
}

export default function ImprovementPlanFormBk({ standardId }: ImprovementPlanFormProps) {
	const router = useRouter()

	const [isSelected, setIsSelected] = useState(false)

	const handleCreateImprovementPlan = () => {
		const data = {
			code: 'OM01-11-2023',
			name: 'Plan de Mejora 2',
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

		// PlanMejoraService.create(data)
		// 	.then((res) => {
		// 		if (res.statusText === 'Created') {
		// 			router.push(`/dashboard/standards/${standardId}/evidence_improvements`)
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		console.log(error)
		// 	})
	}

	return (
		<>
			<h1 className='uppercase text-lg font-bold mb-7'>Formulario de plan de mejora</h1>

			<Input
				isRequired
				type='text'
				label='Nombre del plan de mejora'
				labelPlacement='outside-left'
				placeholder='Ej. Plan de mejora 2023'
				className='mb-3'
			/>

			<Input
				isRequired
				type='text'
				label='Código'
				labelPlacement='outside-left'
				placeholder='OMXX-YY-ZZ'
				className='mb-3'
			/>

			<div className='flex'>
				<Input
					isRequired
					type='text'
					label='Problemas/Oportunidades'
					labelPlacement='outside-left'
					placeholder='Una o varias'
					className='mb-3'
				/>
			</div>

			<Input
				isRequired
				type='text'
				label='Causa/Raíz'
				labelPlacement='outside-left'
				placeholder='Una o varias'
				className='mb-3'
			/>

			<Input
				isRequired
				type='text'
				label='Oportunidad de mejora'
				labelPlacement='outside-left'
				placeholder=''
				className='mb-3'
			/>

			<Input
				isRequired
				type='text'
				label='Acciones de mejora'
				labelPlacement='outside-left'
				placeholder='Una o varias'
				className='mb-3'
			/>

			<div className='mb-3 flex gap-5'>
				<Select labelPlacement='outside-left' label='Año' className='max-w-xs' isRequired>
					{years.map((year) => (
						<SelectItem key={year.value} value={year.value}>
							{year.label}
						</SelectItem>
					))}
				</Select>
				<Select className='max-w-xs' label='Semestre' labelPlacement='outside-left' isRequired>
					{semesters.map((semester) => (
						<SelectItem key={semester.value} value={semester.value}>
							{semester.label}
						</SelectItem>
					))}
				</Select>
			</div>

			<Input
				isRequired
				type='number'
				label='Duración (meses)'
				labelPlacement='outside-left'
				placeholder=''
				className='mb-3'
				min={1}
				max={12}
			/>

			<Input
				isRequired
				type='text'
				label='Recursos'
				labelPlacement='outside-left'
				placeholder='Una o varias'
				className='mb-3'
			/>

			<Input
				isRequired
				type='text'
				label='Metas'
				labelPlacement='outside-left'
				placeholder='Una o varias'
				className='mb-3'
			/>

			<Input
				isRequired
				type='text'
				label='Responsables'
				labelPlacement='outside-left'
				placeholder='Una o varias'
				className='mb-3'
			/>

			<Input
				isRequired
				type='text'
				label='Observaciones'
				labelPlacement='outside-left'
				placeholder='Una o varias'
				className='mb-3'
			/>

			<Select labelPlacement='outside-left' label='Estado' className='max-w-xs mb-3' isRequired>
				{status.map((stat) => (
					<SelectItem key={stat.value} value={stat.value}>
						{stat.label}
					</SelectItem>
				))}
			</Select>

			<Input
				isRequired
				type='text'
				label='Evidencias'
				labelPlacement='outside-left'
				placeholder='Una o varias'
				className='mb-3'
			/>

			<div className='mb-3'>
				<Input
					isRequired
					type='number'
					label='Avance'
					labelPlacement='outside-left'
					placeholder=''
					className='mb-3'
					min={0}
					max={100}
					defaultValue='0'
				/>
			</div>

			<div className='flex gap-2 mb-7'>
				<label className='text-default-900 text-sm'>
					Eficacia<span className='text-red-600'>*</span>
				</label>
				<Checkbox isSelected={isSelected} onValueChange={setIsSelected}>
					{isSelected ? 'Sí' : 'No'}
				</Checkbox>
			</div>

			<div className='flex gap-4 items-end mb-5'>
				<Button
					color='success'
					className='text-white'
					startContent={<SaveIcon width={16} height={16} />}
					onClick={handleCreateImprovementPlan}
				>
					Guardar
				</Button>
				<Button
					color='danger'
					className='text-white'
					startContent={<CloseIcon width={16} height={16} />}
				>
					<Link href={`/dashboard/standards/${standardId}/evidence_improvements`}>Cancelar</Link>
				</Button>
			</div>
		</>
	)
}
