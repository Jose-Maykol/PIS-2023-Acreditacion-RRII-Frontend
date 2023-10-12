const columns = [
	{ name: 'CÓDIGO', uid: 'code', sortable: true },
	{ name: 'ESTÁNDAR', uid: 'standard', sortable: true },
	{ name: 'ASIGNADO A', uid: 'assigned', sortable: true },
	{ name: 'AVANCE (%)', uid: 'advance' },
	{ name: 'ESTADO', uid: 'status', sortable: true },
	{ name: 'ACCIONES', uid: 'actions' }
]

const statusOptions = [
	{ label: 'Planificado', uid: 'Planificado' },
	{ label: 'En desarrollo', uid: 'En desarrollo' },
	{ label: 'Completado', uid: 'Completado' },
	{ label: 'Postergado', uid: 'Postergado' },
	{ label: 'Anulado', uid: 'Anulado' }
]

// const users = []

const improvementPlans = [
	{
		id: 1,
		code: 'OM05-02-2023',
		standard: 'Propósitos articulados',
		assigned: 'Alex Turpo',
		advance: 10,
		status: 'Planificado'
	},
	{
		id: 2,
		code: 'OM04-11-2023',
		standard: 'Propósitos articulados',
		assigned: 'Walter Huaracha',
		advance: 20,
		status: 'Completado'
	},
	{
		id: 3,
		code: 'OM04-12-2023',
		standard: 'Propósitos articulados',
		assigned: 'José Paniura',
		advance: 90,
		status: 'En desarrollo'
	},
	{
		id: 4,
		code: 'OM04-01-2024',
		standard: 'Propósitos articulados',
		assigned: 'Alex Turpo',
		advance: 80,
		status: 'Postergado'
	},
	{
		id: 5,
		code: 'OM04-02-2024',
		standard: 'Propósitos articulados',
		assigned: 'Walter Huaracha',
		advance: 50,
		status: 'Anulado'
	},
	{
		id: 6,
		code: 'OM04-03-2024',
		standard: 'Propósitos articulados',
		assigned: 'José Paniura',
		advance: 60,
		status: 'En desarrollo'
	},
	{
		id: 7,
		code: 'OM04-04-2024',
		standard: 'Propósitos articulados',
		assigned: 'Alex Turpo',
		advance: 40,
		status: 'Completado'
	},
	{
		id: 8,
		code: 'OM04-05-2024',
		standard: 'Propósitos articulados',
		assigned: 'Alex Turpo',
		advance: 10,
		status: 'Postergado'
	},
	{
		id: 9,
		code: 'OM04-06-2024',
		standard: 'Propósitos articulados',
		assigned: 'Alex Turpo',
		advance: 10,
		status: 'Postergado'
	},
	{
		id: 10,
		code: 'OM04-07-2024',
		standard: 'Propósitos articulados',
		assigned: 'Alex Turpo',
		advance: 10,
		status: 'Planificado'
	},
	{
		id: 11,
		code: 'OM04-08-2024',
		standard: 'Propósitos articulados',
		assigned: 'Alex Turpo',
		advance: 10,
		status: 'En desarrollo'
	},
	{
		id: 12,
		code: 'OM04-09-2024',
		standard: 'Propósitos articulados',
		assigned: 'Alex Turpo',
		advance: 10,
		status: 'Completado'
	}
]

export { columns, improvementPlans, statusOptions }
