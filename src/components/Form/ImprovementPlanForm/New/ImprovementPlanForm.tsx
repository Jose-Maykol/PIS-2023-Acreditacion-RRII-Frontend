import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
	Button,
	Checkbox,
	Divider,
	Input,
	Select,
	SelectItem,
	Slider,
	Tooltip
} from '@nextui-org/react'

import CloseIcon from '@/components/Icons/CloseIcon'
import SaveIcon from '@/components/Icons/SaveIcon'
import { semesters, years, status } from '@/utils/data_improvement_plans'
import DynamicInput from './DynamicInput'
import { planItem } from '@/types/PlanMejora'
import { PlanMejoraService } from '@/api/PlanMejora/PlanMejoraService'
import { useFormik } from 'formik'
import { validationSchema } from '../FormValidation'
import showToast from '../toastHelper'

export default function ImprovementPlanForm({ standardId }: { standardId: string }) {
	const router = useRouter()
	const [isSelected, setIsSelected] = useState(false)
	const [advanceValue, setAdvanceValue] = useState(0)

	const [submitClicked, setSubmitClicked] = useState(false)

	const formik = useFormik({
		initialValues: {
			code: '',
			name: '',
			opportunity_for_improvement: '',
			semester_execution: '',
			advance: 0,
			duration: 1,
			efficacy_evaluation: false,
			standard_id: Number(standardId),
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
		},
		validationSchema,
		validate: (values) => {
			try {
				validationSchema.validateSync(values, { abortEarly: false })
			} catch (errors) {
				if (submitClicked) {
					showToast('error', 'Completar los campos requeridos')
					setSubmitClicked(false)
				}
			}
		},
		onSubmit: (values) => {
			const newPlan = {
				name: values.name,
				code: values.code,
				opportunity_for_improvement: values.opportunity_for_improvement,
				semester_execution: `${values.year}-${values.semester}`,
				advance: advanceValue * 100,
				duration: Number(values.duration),
				efficacy_evaluation: isSelected,
				standard_id: Number(standardId),
				plan_status_id: Number(values.plan_status_id),
				sources: values.sources,
				problems_opportunities: values.problems_opportunities,
				root_causes: values.root_causes,
				improvement_actions: values.improvement_actions,
				resources: values.resources,
				goals: values.goals,
				responsibles: values.responsibles,
				observations: values.observations
			}

			const { plan_status_id: plantStatusId, advance } = newPlan
			if (
				(plantStatusId === 5 && advance === 0) ||
				(plantStatusId === 4 && advance >= 1 && advance <= 5) ||
				(plantStatusId === 1 && advance >= 6 && advance <= 10) ||
				(plantStatusId === 2 && advance >= 11 && advance <= 99) ||
				(plantStatusId === 3 && advance === 100)
			) {
				PlanMejoraService.create(newPlan)
					.then((res) => {
						if (res.statusText === 'Created') {
							showToast('success', 'Plan de mejora creado con éxito')
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
			<h1 className='uppercase text-lg font-bold mb-2'>Crear plan de mejora</h1>

			<Divider className='mb-5' />

			<div className='flex flex-col mb-3'>
				<Tooltip
					color='foreground'
					placement='top-start'
					content='Registrar el nombre del plan de mejora'
					closeDelay={100}
				>
					<label className='text-default-600 text-sm' style={{ marginBottom: '-0.5rem' }}>
						Nombre:
					</label>
				</Tooltip>
				<Input
					id='name'
					name='name'
					value={formik.values.name}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					isInvalid={formik.touched.name && Boolean(formik.errors.name)}
					errorMessage={formik.touched.name && formik.errors.name}
					size='sm'
					type='text'
					variant='underlined'
				/>
			</div>

			<div className='flex flex-col mb-3'>
				<Tooltip
					color='foreground'
					placement='top-start'
					content='Registrar el código con el formato OMXX-YY-ZZZZ'
					closeDelay={100}
				>
					<label className='text-default-600 text-sm'>Código:</label>
				</Tooltip>
				<Input
					id='code'
					name='code'
					value={formik.values.code}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					isInvalid={formik.touched.code && Boolean(formik.errors.code)}
					errorMessage={formik.touched.code && formik.errors.code}
					size='sm'
					type='text'
					variant='underlined'
				/>
			</div>

			<DynamicInput
				identifier='problems_opportunities'
				label='Problemas/Oportunidades:'
				tooltip='Registre el problema / oportunidad que genera la mejora'
				onChange={handleInputValues}
				formik={formik}
			/>
			<DynamicInput
				identifier='root_causes'
				label='Causa/Raíz:'
				tooltip='Registre la causa raíz, producto de un análisis'
				onChange={handleInputValues}
				formik={formik}
			/>

			<div className='flex flex-col mb-3'>
				<Tooltip
					color='foreground'
					placement='top-start'
					content='Registre la denominación de la oportunidad de mejora'
					closeDelay={100}
				>
					<label className='text-default-600 text-sm'>Oportunidad de mejora:</label>
				</Tooltip>
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
					size='sm'
					type='text'
					variant='underlined'
				/>
			</div>

			<DynamicInput
				identifier='improvement_actions'
				label='Acciones de mejora:'
				tooltip='Registre las acciones necesarias para ejecutar'
				onChange={handleInputValues}
				formik={formik}
			/>

			<Tooltip
				color='foreground'
				placement='top-start'
				offset={-5}
				content='Registre el año y semestre en la que las actividades se realizarán'
				closeDelay={100}
			>
				<div className='mb-4 flex gap-5'>
					<Select
						id='year'
						name='year'
						value={formik.values.year}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						isInvalid={formik.touched.year && Boolean(formik.errors.year)}
						errorMessage={formik.touched.year && formik.errors.year && 'Campo requerido'}
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
						value={formik.values.semester}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						isInvalid={formik.touched.semester && Boolean(formik.errors.semester)}
						errorMessage={formik.touched.semester && formik.errors.semester && 'Campo requerido'}
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

			<div className='flex flex-col mb-1'>
				<Tooltip
					color='foreground'
					placement='top-start'
					content='Registrar la duración en meses'
					closeDelay={100}
				>
					<label className='text-default-600 text-sm' style={{ marginBottom: '-.6rem' }}>
						Duración (meses):
					</label>
				</Tooltip>
				<Input
					id='duration'
					name='duration'
					value={formik.values.duration.toString()}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					isInvalid={formik.touched.duration && Boolean(formik.errors.duration)}
					errorMessage={formik.touched.duration && formik.errors.duration}
					className='max-w-xs mb-3 mt-3'
					min={1}
					max={24}
					size='sm'
					type='number'
					variant='underlined'
				/>
			</div>

			{/* <Tooltip
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
					className='max-w-xs mb-3 mt-3'
					label='Duración (meses):'
					min={1}
					max={24}
					size='sm'
					type='number'
					variant='underlined'
				/>
			</Tooltip> */}

			<DynamicInput
				identifier='resources'
				label='Recursos:'
				tooltip='Registrar los recursos necesarios'
				onChange={handleInputValues}
				formik={formik}
			/>
			<DynamicInput
				identifier='goals'
				label='Metas:'
				tooltip='Registrar la meta que se espera lograr al término del plan de mejora'
				onChange={handleInputValues}
				formik={formik}
			/>
			<DynamicInput
				identifier='responsibles'
				label='Responsables:'
				tooltip='Registrar los responsables de la ejecución de las actividades registradas'
				onChange={handleInputValues}
				formik={formik}
			/>
			<DynamicInput
				identifier='observations'
				label='Observaciones:'
				tooltip='Registrar en esta sección las acciones vinculadas a las mejoras y en qué circunstancias se están realizando o realizaran'
				onChange={handleInputValues}
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
						value={formik.values.plan_status_id}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						isInvalid={formik.touched.plan_status_id && Boolean(formik.errors.plan_status_id)}
						errorMessage={
							formik.touched.plan_status_id && formik.errors.plan_status_id && 'Campo requerido'
						}
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
						onChange={(newValue) => setAdvanceValue(newValue as number)}
						showTooltip={true}
						step={0.01}
						formatOptions={{ style: 'percent' }}
						maxValue={1}
						minValue={0}
						defaultValue={advanceValue}
						className='max-w-md'
						classNames={{
							label: 'text-default-600'
						}}
					/>
				</div>
			</Tooltip>

			<div className='flex gap-2 mb-3 mt-3 pt-2 items-center'>
				<Tooltip
					color='foreground'
					placement='top-start'
					content='Marcar el calificativo de la evaluación categóricamente: Sí o No'
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
					startContent={<CloseIcon width={16} height={16} fill='fill-white' />}
					onClick={() => router.back()}
				>
					Cancelar
				</Button>
				<Button
					color='success'
					className='text-white'
					startContent={<SaveIcon width={16} height={16} fill='fill-white' />}
					type='submit'
					onClick={() => setSubmitClicked(true)}
					isDisabled={!formik.isValid}
				>
					Guardar
				</Button>
			</div>
		</form>
	)
}
