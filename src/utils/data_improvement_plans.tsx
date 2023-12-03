import { ChipProps } from '@nextui-org/react'

const columns = [
	{ name: 'CÓDIGO', uid: 'code', sortable: true },
	{ name: 'NOMBRE', uid: 'name', sortable: true },
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

const standardsOptions = [
	{ label: 'Estándar 1', uid: '1' },
	{ label: 'Estándar 2', uid: '2' },
	{ label: 'Estándar 3', uid: '3' },
	{ label: 'Estándar 4', uid: '4' },
	{ label: 'Estándar 5', uid: '5' },
	{ label: 'Estándar 6', uid: '6' },
	{ label: 'Estándar 7', uid: '7' },
	{ label: 'Estándar 9', uid: '9' },
	{ label: 'Estándar 10', uid: '10' },
	{ label: 'Estándar 11', uid: '11' },
	{ label: 'Estándar 12', uid: '12' },
	{ label: 'Estándar 13', uid: '13' },
	{ label: 'Estándar 14', uid: '14' },
	{ label: 'Estándar 15', uid: '15' },
	{ label: 'Estándar 16', uid: '16' },
	{ label: 'Estándar 17', uid: '17' },
	{ label: 'Estándar 18', uid: '18' },
	{ label: 'Estándar 19', uid: '19' },
	{ label: 'Estándar 20', uid: '20' },
	{ label: 'Estándar 21', uid: '21' },
	{ label: 'Estándar 22', uid: '22' },
	{ label: 'Estándar 23', uid: '23' },
	{ label: 'Estándar 24', uid: '24' },
	{ label: 'Estándar 25', uid: '25' },
	{ label: 'Estándar 26', uid: '26' },
	{ label: 'Estándar 27', uid: '27' },
	{ label: 'Estándar 28', uid: '28' },
	{ label: 'Estándar 29', uid: '29' },
	{ label: 'Estándar 30', uid: '30' },
	{ label: 'Estándar 31', uid: '31' },
	{ label: 'Estándar 32', uid: '32' }
]

export { columns, statusOptions, statusColorMap, years, semesters, standardsOptions }
