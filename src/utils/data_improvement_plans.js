const columns = [
	{ name: 'CÓDIGO', uid: 'code', sortable: true },
	{ name: 'ESTÁNDAR', uid: 'standard', sortable: true },
	{ name: 'ASIGNADO A', uid: 'assigned', sortable: true },
	{ name: 'AVANCE (%)', uid: 'advance' },
	{ name: 'ESTADO', uid: 'status', sortable: true },
	{ name: 'ACCIONES', uid: 'actions' }
]

const statusOptions = [
	{ label: 'En proceso', uid: 'En proceso' },
	{ label: 'Concluido', uid: 'Concluido' },
	{ label: 'Programado', uid: 'Programado' },
	{ label: 'Reprogramado', uid: 'Reprogramado' },
	{ label: 'Planificado', uid: 'Planificado' }
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
		status: 'Concluido'
	},
	{
		id: 3,
		code: 'OM04-12-2023',
		standard: 'Propósitos articulados',
		assigned: 'José Paniura',
		advance: 90,
		status: 'Reprogramado'
	},
	{
		id: 4,
		code: 'OM04-01-2024',
		standard: 'Propósitos articulados',
		assigned: 'Alex Turpo',
		advance: 80,
		status: 'Programado'
	},
	{
		id: 5,
		code: 'OM04-02-2024',
		standard: 'Propósitos articulados',
		assigned: 'Walter Huaracha',
		advance: 50,
		status: 'Planificado'
	},
	{
		id: 6,
		code: 'OM04-03-2024',
		standard: 'Propósitos articulados',
		assigned: 'José Paniura',
		advance: 60,
		status: 'En proceso'
	},
	{
		id: 7,
		code: 'OM04-04-2024',
		standard: 'Propósitos articulados',
		assigned: 'Alex Turpo',
		advance: 40,
		status: 'Concluido'
	},
	{
		id: 8,
		code: 'OM04-05-2024',
		standard: 'Propósitos articulados',
		assigned: 'Alex Turpo',
		advance: 10,
		status: 'Reprogramado'
	},
	{
		id: 9,
		code: 'OM04-06-2024',
		standard: 'Propósitos articulados',
		assigned: 'Alex Turpo',
		advance: 10,
		status: 'reReprogramado'
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
		status: 'En proceso'
	},
	{
		id: 12,
		code: 'OM04-09-2024',
		standard: 'Propósitos articulados',
		assigned: 'Alex Turpo',
		advance: 10,
		status: 'Concluido'
	}
]

export { columns, improvementPlans, statusOptions }
