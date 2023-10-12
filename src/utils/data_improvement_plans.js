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

const improvementPlans = [
	{
		id: 1,
		code: 'OM05-02-2023',
		standard: 'Propósitos articulados',
		assigned: 'Alex Turpo',
		advance: 10,
		status: 'planificado'
	},
	{
		id: 2,
		code: 'OM04-11-2023',
		standard: 'Propósitos articulados',
		assigned: 'Walter Huaracha',
		advance: 20,
		status: 'completado'
	},
	{
		id: 3,
		code: 'OM04-12-2023',
		standard: 'Propósitos articulados',
		assigned: 'José Paniura',
		advance: 90,
		status: 'en desarrollo'
	},
	{
		id: 4,
		code: 'OM04-01-2024',
		standard: 'Propósitos articulados',
		assigned: 'Alex Turpo',
		advance: 80,
		status: 'postergado'
	},
	{
		id: 5,
		code: 'OM04-02-2024',
		standard: 'Propósitos articulados',
		assigned: 'Walter Huaracha',
		advance: 50,
		status: 'anulado'
	}
]

export { columns, improvementPlans, statusOptions }
