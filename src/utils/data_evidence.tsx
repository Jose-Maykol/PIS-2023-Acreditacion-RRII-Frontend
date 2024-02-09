const columns = [
	{ name: 'NOMBRE', uid: 'name', sortable: true },
	{ name: 'CODIGO', uid: 'evidence_code', sortable: true },
	{ name: 'SUBIDO POR', uid: 'full_name', sortable: true },
	{ name: 'ULTIMA MODIFICACION', uid: 'updated_at' },
	{ name: 'ACCIONES', uid: 'actions' }
]

const columnsPlans = [
	{ name: 'NOMBRE', uid: 'name', sortable: true },
	{ name: 'SUBIDO POR', uid: 'full_name', sortable: true },
	{ name: 'ULTIMA MODIFICACION', uid: 'updated_at' },
	{ name: 'ACCIONES', uid: 'actions' }
]


const columnsEvidenceNarrative = [
	{ name: 'NOMBRE', uid: 'name', sortable: true },
	{ name: 'CODIGO', uid: 'evidence_code' },
	{ name: 'ACCIONES', uid: 'actions' }
]

export { columns, columnsEvidenceNarrative, columnsPlans }