'use client'

import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import { Checkbox, Input, Select, SelectItem } from '@nextui-org/react'
import { useState } from 'react'

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

export default function NewImprovementPlanPage() {
	const [isSelected, setIsSelected] = useState(false)

	return (
		<ContentWrapper className='bg-white h-[670px] w-[96%] m-auto rounded-md py-5 px-10'>
			<h1 className='uppercase text-lg font-bold mb-7'>Formulario de plan de mejora</h1>

			<Input
				isRequired
				key='outside-left'
				type='text'
				label='Nombre del plan de mejora'
				labelPlacement='outside-left'
				placeholder='Ej. Plan de mejora 2023'
				className='mb-3'
			/>

			<Input
				isRequired
				key='outside-left'
				type='text'
				label='Código'
				labelPlacement='outside-left'
				placeholder='OMXX-YY-ZZ'
				className='mb-3'
			/>

			<div className='flex'>
				<Input
					isRequired
					key='outside-left'
					type='text'
					label='Problemas/Oportunidades'
					labelPlacement='outside-left'
					placeholder='Una o varias'
					className='mb-3'
				/>
			</div>

			<Input
				isRequired
				key='outside-left'
				type='text'
				label='Causa/Raíz'
				labelPlacement='outside-left'
				placeholder='Una o varias'
				className='mb-3'
			/>

			<Input
				isRequired
				key='outside-left'
				type='text'
				label='Oportunidad de mejora'
				labelPlacement='outside-left'
				placeholder=''
				className='mb-3'
			/>

			<Input
				isRequired
				key='outside-left'
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
				key='outside-left'
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
				key='outside-left'
				type='text'
				label='Recursos'
				labelPlacement='outside-left'
				placeholder='Una o varias'
				className='mb-3'
			/>

			<Input
				isRequired
				key='outside-left'
				type='text'
				label='Metas'
				labelPlacement='outside-left'
				placeholder='Una o varias'
				className='mb-3'
			/>

			<Input
				isRequired
				key='outside-left'
				type='text'
				label='Responsables'
				labelPlacement='outside-left'
				placeholder='Una o varias'
				className='mb-3'
			/>

			<Input
				isRequired
				key='outside-left'
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
				key='outside-left'
				type='text'
				label='Evidencias'
				labelPlacement='outside-left'
				placeholder='Una o varias'
				className='mb-3'
			/>

			<div className='mb-3'>
				<Input
					isRequired
					key='outside-left'
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

			<div className='flex gap-2'>
				<label className='text-default-900 text-sm'>
					Eficacia<span className='text-red-600'>*</span>
				</label>
				<Checkbox isSelected={isSelected} onValueChange={setIsSelected}>
					{isSelected ? 'Sí' : 'No'}
				</Checkbox>
			</div>
		</ContentWrapper>
	)
}
