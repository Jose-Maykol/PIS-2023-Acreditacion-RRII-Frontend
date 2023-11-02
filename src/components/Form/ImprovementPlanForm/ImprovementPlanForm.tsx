import * as yup from 'yup'
import CloseIcon from '@/components/Icons/CloseIcon'
import SaveIcon from '@/components/Icons/SaveIcon'
import { semesters, years, status } from '@/utils/data_improvement_plans'
import { Button, Checkbox, Input, Select, SelectItem } from '@nextui-org/react'
import Link from 'next/link'
import { ChangeEvent, FormEvent, useState } from 'react'
import DynamicInput from './DynamicInput'

// eslint-disable-next-line no-undef
const validationSchema = yup.object({
	name: yup.string().trim().required('Nombre de plan necesario'),
	code: yup
		.string()
		.required('Código del plan necesario')
		.trim()
		.matches(/^OM\d{2}-\d{2}-20\d{2}$/, 'El código debe tener el formato OMXX-YY-ZZZZ'),
	opportunity_for_improvement: yup.string().required('Oportunidad de mejora necesaria')
})

export default function ImprovementPlanForm({ standardId }: { standardId: string }) {
	const [isSelected, setIsSelected] = useState(false)
	const [errors, setErrors] = useState({})
	const [formData, setFormData] = useState({
		name: '',
		code: '',
		opportunity_for_improvement: '',
		year: '',
		semester: '',
		duration: 0,
		status: '',
		plan_status_id: 0,
		advance: 0,
		efficacy_evaluation: false
	})

	const handleChange = (ev: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = ev.target

		setFormData({ ...formData, [name]: value })
	}

	const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
		ev.preventDefault()

		const newPlan = {
			name: formData.name,
			code: formData.code,
			opportunity_for_improvement: formData.opportunity_for_improvement,
			advance: Number(formData.advance),
			duration: Number(formData.duration),
			efficacy_evaluation: isSelected,
			status: Number(formData.status),
			plan_status_id: Number(formData.plan_status_id),
			semester_execution: `${formData.year}-${formData.semester}`
		}

		console.log(newPlan)
	}

	return (
		<form onSubmit={handleSubmit}>
			<h1 className='uppercase text-lg font-bold mb-7'>Formulario de plan de mejora</h1>

			<Input
				isRequired
				id='name'
				name='name'
				value={formData.name}
				onChange={handleChange}
				className='mb-3'
				label='Nombre del Plan de Mejora'
				size='sm'
				type='text'
				variant='underlined'
			/>

			<Input
				isRequired
				id='code'
				name='code'
				value={formData.code}
				onChange={handleChange}
				className='mb-3'
				label='Código'
				placeholder='OMXX-YY-ZZZZ'
				size='sm'
				type='text'
				variant='underlined'
			/>

			<DynamicInput identifier='problems_opportunities' label='Problemas/Oportunidades' />

			<Input
				isRequired
				id='opportunity_for_improvement'
				name='opportunity_for_improvement'
				value={formData.opportunity_for_improvement}
				onChange={handleChange}
				className='mb-3'
				label='Oportunidad de mejora'
				size='sm'
				type='text'
				variant='underlined'
			/>

			<div className='mb-3 flex gap-5'>
				<Select
					isRequired
					id='year'
					name='year'
					value={formData.year}
					onChange={handleChange}
					className='max-w-xs'
					label='Año'
					size='sm'
					variant='underlined'
				>
					{years.map((year) => (
						<SelectItem key={year.value} value={year.value}>
							{year.label}
						</SelectItem>
					))}
				</Select>
				<Select
					isRequired
					id='semester'
					name='semester'
					value={formData.semester}
					onChange={handleChange}
					className='max-w-xs'
					label='Semestre'
					size='sm'
					variant='underlined'
				>
					{semesters.map((semester) => (
						<SelectItem key={semester.value} value={semester.value}>
							{semester.label}
						</SelectItem>
					))}
				</Select>
			</div>
			<Input
				isRequired
				id='duration'
				name='duration'
				value={formData.duration.toString()}
				onChange={handleChange}
				className='max-w-xs mb-3'
				label='Duración (meses)'
				min={1}
				max={12}
				size='sm'
				type='number'
				variant='underlined'
			/>

			<Select
				isRequired
				id='plan_status_id'
				name='plan_status_id'
				value={formData.plan_status_id}
				onChange={handleChange}
				className='max-w-xs mb-3'
				label='Estado'
				size='sm'
				variant='underlined'
			>
				{status.map((stat) => (
					<SelectItem key={stat.value} value={stat.value}>
						{stat.label}
					</SelectItem>
				))}
			</Select>

			<Input
				isRequired
				id='advance'
				name='advance'
				value={formData.advance.toString()}
				onChange={handleChange}
				type='number'
				label='Avance'
				className='max-w-xs mb-3'
				min={0}
				max={100}
				variant='underlined'
			/>

			<div className='flex gap-2 mb-3 pt-2'>
				<label className='text-default-900 text-sm'>Eficacia</label>
				<Checkbox name='efficacy_evaluation' isSelected={isSelected} onValueChange={setIsSelected}>
					<span className='text-sm'>{isSelected ? 'Sí' : 'No'}</span>
				</Checkbox>
			</div>

			<div className='flex gap-4 justify-end p-3'>
				<Button
					color='danger'
					className='mb-5'
					startContent={<CloseIcon width={16} height={16} fill='fill-white' />}
				>
					<Link
						className='text-white'
						href={`/dashboard/standards/${standardId}/evidence_improvements`}
					>
						Cancelar
					</Link>
				</Button>
				<Button
					color='success'
					className='text-white mb-5'
					startContent={<SaveIcon width={16} height={16} fill='fill-white' />}
					type='submit'
				>
					Guardar
				</Button>
			</div>
		</form>
	)
}
