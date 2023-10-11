const columns = [
	{ name: 'CÓDIGO', uid: 'code', sortable: true },
	{ name: 'ESTÁNDAR', uid: 'standard', sortable: true },
	{ name: 'ASIGNADO A', uid: 'assigned', sortable: true },
	{ name: 'AVANCE (%)', uid: 'advance' },
	{ name: 'ESTADO', uid: 'status', sortable: true },
	{ name: 'ACCIONES', uid: 'actions' }
]

const statusOptions = [
	{ label: 'En proceso', uid: 'process' },
	{ label: 'Concluido', uid: 'completed' },
	{ label: 'Programado', uid: 'scheduled' },
	{ label: 'Reprogramado', uid: 'rescheduled' },
	{ label: 'Planificado', uid: 'planned' }
]

// const users = []

const improvementPlans = [
	{
		id: 1,
		code: 'OM05-02-2023',
		standard: 'Propósitos articulados',
		assigned: 'Alex Turpo',
		advance: '10%',
		status: 'planned'
	},
	{
		id: 2,
		code: 'OM04-11-2023',
		standard: 'Propósitos articulados',
		assigned: 'Walter Huaracha',
		advance: '10%',
		status: 'completed'
	},
	{
		id: 3,
		code: 'OM04-12-2023',
		standard: 'Propósitos articulados',
		assigned: 'José Paniura',
		advance: '10%',
		status: 'scheduled'
	},
	{
		id: 4,
		code: 'OM04-01-2024',
		standard: 'Propósitos articulados',
		assigned: 'Alex Turpo',
		advance: '10%',
		status: 'rescheduled'
	},
	{
		id: 5,
		code: 'OM04-02-2024',
		standard: 'Propósitos articulados',
		assigned: 'Walter Huaracha',
		advance: '10%',
		status: 'planned'
	},
	{
		id: 6,
		code: 'OM04-03-2024',
		standard: 'Propósitos articulados',
		assigned: 'José Paniura',
		advance: '10%',
		status: 'process'
	},
	{
		id: 7,
		code: 'OM04-04-2024',
		standard: 'Propósitos articulados',
		assigned: 'Alex Turpo',
		advance: '10%',
		status: 'completed'
	},
	{
		id: 8,
		code: 'OM04-05-2024',
		standard: 'Propósitos articulados',
		assigned: 'Alex Turpo',
		advance: '10%',
		status: 'scheduled'
	},
	{
		id: 9,
		code: 'OM04-06-2024',
		standard: 'Propósitos articulados',
		assigned: 'Alex Turpo',
		advance: '10%',
		status: 'rescheduled'
	},
	{
		id: 10,
		code: 'OM04-07-2024',
		standard: 'Propósitos articulados',
		assigned: 'Alex Turpo',
		advance: '10%',
		status: 'planned'
	},
	{
		id: 11,
		code: 'OM04-08-2024',
		standard: 'Propósitos articulados',
		assigned: 'Alex Turpo',
		advance: '10%',
		status: 'process'
	},
	{
		id: 12,
		code: 'OM04-09-2024',
		standard: 'Propósitos articulados',
		assigned: 'Alex Turpo',
		advance: '10%',
		status: 'completed'
	}
]

export { columns, improvementPlans, statusOptions }
