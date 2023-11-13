import { ChipProps } from '@nextui-org/react'

const columns = [
	{ name: 'CÓDIGO', uid: 'code', sortable: true },
	{ name: 'ESTÁNDAR', uid: 'standard_name', sortable: true },
	{ name: 'ASIGNADO A', uid: 'user_name', sortable: true },
	{ name: 'AVANCE (%)', uid: 'advance' },
	{ name: 'ESTADO', uid: 'plan_status', sortable: true },
	{ name: 'ACCIONES', uid: 'actions' }
]

const statusOptions = [
	{ label: 'planificado', uid: 'planificado' },
	{ label: 'en desarrollo', uid: 'en desarrollo' },
	{ label: 'Completado', uid: 'completado' },
	{ label: 'postergado', uid: 'postergado' },
	{ label: 'anulado', uid: 'anulado' }
]

const statusColorMap: Record<string, ChipProps['color']> = {
	planificado: 'secondary',
	'en desarrollo': 'primary',
	completado: 'success',
	postergado: 'warning',
	anulado: 'danger'
}

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
	{ label: 'Planificado', value: 1 },
	{ label: 'En desarrollo', value: 2 },
	{ label: 'Completado', value: 3 },
	{ label: 'Postergado', value: 4 },
	{ label: 'Anulado', value: 5 }
]


export { columns, statusOptions, statusColorMap, years, semesters, status }
