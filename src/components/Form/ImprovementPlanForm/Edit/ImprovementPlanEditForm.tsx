import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button, Checkbox, Input, Select, SelectItem, Slider, Tooltip } from '@nextui-org/react'

import { PlanMejoraService } from '@/api/PlanMejora/PlanMejoraService'
import { semesters, years, status } from '@/utils/data_improvement_plans'
import { planItem } from '@/types/PlanMejora'

import DynamicInput from './DynamicInput'
import CloseIcon from '@/components/Icons/CloseIcon'
import SaveIcon from '@/components/Icons/SaveIcon'
import { validationSchema } from '../FormValidation'
import { useFormik } from 'formik'
import showToast from '../toastHelper'

export default function ImprovementPlanEditForm({
	params,
	plan
}: {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	plan: any
	params: { id: string; code: string }
}) {
	const router = useRouter()
	const [isSelected, setIsSelected] = useState(false)
	const [advanceValue, setAdvanceValue] = useState(0)

	const [formData, setFormData] = useState({
		id: 0,
		code: '',
		name: '',
		opportunity_for_improvement: '',
		semester_execution: '',
		advance: 0,
		duration: 1,
		efficacy_evaluation: false,
		standard_id: Number(params.id),
		plan_status_id: 0,
		sources: [],
		problems_opportunities: [],
		root_causes: [],
		improvement_actions: [],
		resources: [],
		goals: [],
		responsibles: [],
		observations: [],
		year: '',
		semester: ''
	})

	useEffect(() => {
		setFormData(plan)
		setIsSelected(plan.efficacy_evaluation)
		setAdvanceValue(plan.advance / 100)
	}, [plan])

	const getPlanItemsToSend = (data: planItem[]) =>
		data.map((item) => (item.id > 1384914000000 ? { description: item.description } : item))

	const formik = useFormik({
		initialValues: formData,
		validationSchema,
		enableReinitialize: true,
		onSubmit: (values) => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { year, semester, ...remainingPlan } = formData

			const newPlan = {
				...remainingPlan,
				name: values.name,
				code: values.code,
				opportunity_for_improvement: values.opportunity_for_improvement,
				semester_execution: `${values.year}-${values.semester}`,
				advance: advanceValue * 100,
				duration: Number(values.duration),
				efficacy_evaluation: isSelected,
				standard_id: values.standard_id,
				plan_status_id: Number(values.plan_status_id),
				problems_opportunities: getPlanItemsToSend(values.problems_opportunities),
				root_causes: getPlanItemsToSend(values.root_causes),
				improvement_actions: getPlanItemsToSend(values.improvement_actions),
				resources: getPlanItemsToSend(values.resources),
				goals: getPlanItemsToSend(values.goals),
				responsibles: getPlanItemsToSend(values.responsibles),
				observations: getPlanItemsToSend(values.observations),
				sources: getPlanItemsToSend(values.sources)
			}

			// console.log(newPlan)
			const { plan_status_id: plantStatusId, advance } = newPlan
			if (
				(plantStatusId === 5 && advance === 0) ||
				(plantStatusId === 4 && advance >= 1 && advance <= 5) ||
				(plantStatusId === 1 && advance >= 6 && advance <= 10) ||
				(plantStatusId === 2 && advance >= 11 && advance <= 99) ||
				(plantStatusId === 3 && advance === 100)
			) {
				PlanMejoraService.update(formData.id, newPlan)
					.then((res) => {
						console.log(res)
						if (res.statusText === 'OK') {
							showToast('success', 'Plan de mejora actualizado con éxito')
							router.back()
						}
					})
					.catch((error) => {
						if (error.response.data.message === 'Código de plan de mejora ya existe') {
							showToast('error', 'Código de Plan ya registrado')
						} else {
							showToast('error', 'Ocurrió un problema, intentar nuevamente')
						}
					})
			} else {
				showToast('info', 'Estado y Avance (%) deben estar en los rangos definidos')
			}
		}
	})

	const handleInputValues = (identifier: string, values: planItem[]) => {
		formik.setFieldValue(identifier, values)
	}

	return (
		<form onSubmit={formik.handleSubmit}>
			<h1 className='uppercase text-lg font-bold mb-7'>Formulario de plan de mejora</h1>

			<Tooltip
				color='foreground'
				placement='top-start'
				offset={15}
				content='Registrar el nombre del plan de mejora'
				closeDelay={100}
			>
				<Input
					id='name'
					name='name'
					value={formik.values.name}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					isInvalid={formik.touched.name && Boolean(formik.errors.name)}
					errorMessage={formik.touched.name && formik.errors.name}
					className='mb-4'
					label='Nombre del Plan de Mejora:'
					size='sm'
					type='text'
					variant='underlined'
				/>
			</Tooltip>

			<Tooltip
				color='foreground'
				placement='top-start'
				offset={15}
				content='Registrar el código con el formato OMXX-YY-ZZZZ'
				closeDelay={100}
			>
				<Input
					id='code'
					name='code'
					value={formik.values.code}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					isInvalid={formik.touched.code && Boolean(formik.errors.code)}
					errorMessage={formik.touched.code && formik.errors.code}
					className='mb-4'
					label='Código:'
					placeholder='OMXX-YY-ZZZZ'
					size='sm'
					type='text'
					variant='underlined'
				/>
			</Tooltip>

			<DynamicInput
				identifier='problems_opportunities'
				label='Problemas/Oportunidades:'
				tooltip='Registre el problema / oportunidad que genera la mejora'
				onChange={handleInputValues}
				defaultValues={formData.problems_opportunities}
				formik={formik}
			/>
			<DynamicInput
				identifier='root_causes'
				label='Causa/Raíz:'
				tooltip='Registre la causa raíz, producto de un análisis'
				onChange={handleInputValues}
				defaultValues={formData.root_causes}
				formik={formik}
			/>

			<Tooltip
				color='foreground'
				placement='top-start'
				offset={15}
				content='Registre la denominación de la oportunidad de mejora'
				closeDelay={100}
			>
				<Input
					id='opportunity_for_improvement'
					name='opportunity_for_improvement'
					value={formik.values.opportunity_for_improvement}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					isInvalid={
						formik.touched.opportunity_for_improvement &&
						Boolean(formik.errors.opportunity_for_improvement)
					}
					errorMessage={
						formik.touched.opportunity_for_improvement && formik.errors.opportunity_for_improvement
					}
					className='mb-3'
					label='Oportunidad de mejora:'
					size='sm'
					type='text'
					variant='underlined'
				/>
			</Tooltip>

			<DynamicInput
				identifier='improvement_actions'
				label='Acciones de mejora:'
				tooltip='Registre las acciones necesarias para ejecutar'
				onChange={handleInputValues}
				defaultValues={formData.improvement_actions}
				formik={formik}
			/>

			<Tooltip
				color='foreground'
				placement='top-start'
				offset={-5}
				content='Registre el año y semestre en la que las actividades se realizarán'
				closeDelay={100}
			>
				<div className='mb-3 flex gap-5 mt-3'>
					<Select
						id='year'
						name='year'
						selectedKeys={[formik.values.year]}
						onChange={formik.handleChange}
						isInvalid={formik.touched.year && Boolean(formik.errors.year)}
						errorMessage={formik.errors.year && 'Campo requerido'}
						className='max-w-xs'
						label='Año:'
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
						id='semester'
						name='semester'
						selectedKeys={[formik.values.semester]}
						onChange={formik.handleChange}
						isInvalid={formik.touched.semester && Boolean(formik.errors.semester)}
						errorMessage={formik.errors.semester && 'Campo requerido'}
						className='max-w-xs'
						label='Semestre:'
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
			</Tooltip>

			<Tooltip
				color='foreground'
				placement='top-start'
				offset={20}
				content='Registrar la duración en meses'
				closeDelay={100}
			>
				<Input
					id='duration'
					name='duration'
					value={formik.values.duration.toString()}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					isInvalid={formik.touched.duration && Boolean(formik.errors.duration)}
					errorMessage={formik.touched.duration && formik.errors.duration}
					className='max-w-xs mb-3'
					label='Duración (meses):'
					min={1}
					max={24}
					size='sm'
					type='number'
					variant='underlined'
				/>
			</Tooltip>

			<DynamicInput
				identifier='resources'
				label='Recursos:'
				tooltip='Registrar los recursos necesarios'
				onChange={handleInputValues}
				defaultValues={formData.resources}
				formik={formik}
			/>
			<DynamicInput
				identifier='goals'
				label='Metas:'
				tooltip='Registrar la meta que se espera lograr al término del plan de mejora'
				onChange={handleInputValues}
				defaultValues={formData.goals}
				formik={formik}
			/>
			<DynamicInput
				identifier='responsibles'
				label='Responsables:'
				tooltip='Registrar los responsables de la ejecución de las actividades registradas'
				onChange={handleInputValues}
				defaultValues={formData.responsibles}
				formik={formik}
			/>
			<DynamicInput
				identifier='observations'
				label='Observaciones:'
				tooltip='Registrar en esta sección las acciones vinculadas a las mejoras y en qué circunstancias se están realizando o realizaran'
				onChange={handleInputValues}
				defaultValues={formData.observations}
				formik={formik}
			/>

			<Tooltip
				color='foreground'
				placement='top-start'
				offset={-5}
				content='Registrar el estado del plan de mejora'
				closeDelay={100}
			>
				<div>
					<Select
						id='plan_status_id'
						name='plan_status_id'
						selectedKeys={[`${formik.values.plan_status_id}`]}
						onChange={formik.handleChange}
						isInvalid={formik.touched.plan_status_id && Boolean(formik.errors.plan_status_id)}
						errorMessage={formik.errors.plan_status_id && 'Campo requerido'}
						className='max-w-xs mb-3'
						label='Estado:'
						size='sm'
						variant='underlined'
					>
						{status.map((stat) => (
							<SelectItem key={stat.value} value={stat.value}>
								{stat.label}
							</SelectItem>
						))}
					</Select>
				</div>
			</Tooltip>

			<DynamicInput
				identifier='sources'
				label='Fuentes:'
				tooltip='Registrar de dónde proviene la fuente de la Mejora'
				onChange={handleInputValues}
				defaultValues={formData.sources}
				formik={formik}
			/>

			<Tooltip
				color='foreground'
				placement='top-start'
				content='Anulado: 0% | Postergado: 1% a 5% | Planificado: 6% a 10% | En Desarrollo: 11% a 99% | Completado 100%'
				closeDelay={100}
			>
				<div className='mt-3'>
					<Slider
						label='Avance:'
						id='advance'
						name='advance'
						value={advanceValue}
						// onChange={setAdvanceValue}
						onChange={(newValue) => setAdvanceValue(newValue as number)}
						showTooltip={true}
						step={0.01}
						formatOptions={{ style: 'percent' }}
						maxValue={1}
						minValue={0}
						defaultValue={advanceValue}
						className='max-w-md'
						classNames={{ label: 'text-default-600' }}
					/>
				</div>
			</Tooltip>

			<div className='flex gap-2 mb-3 pt-2 items-center'>
				<Tooltip
					color='foreground'
					placement='top-start'
					content='Registrar el calificativo de la evaluación categóricamente: Sí o No'
					closeDelay={100}
				>
					<label className='text-default-600 text-sm'>Eficacia:</label>
				</Tooltip>
				<Checkbox
					name='efficacy_evaluation'
					isSelected={isSelected}
					onValueChange={setIsSelected}
					onChange={formik.handleChange}
				>
					<span className='text-sm'>{isSelected ? 'Sí' : 'No'}</span>
				</Checkbox>
			</div>

			<div className='flex gap-4 justify-end p-3'>
				<Button
					color='danger'
					className='mb-5'
					startContent={<CloseIcon width={16} height={16} fill='fill-white' />}
					onClick={() => router.back()}
				>
					Cancelar
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
