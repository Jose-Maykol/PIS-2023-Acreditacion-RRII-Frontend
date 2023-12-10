const steps = [
	{ step: 1, description: 'Datos de la Institución' },
	{ step: 2, description: 'Datos del Programa de Estudios' },
	{ step: 3, description: 'Datos de los miembros del Cómite de Calidad' },
	{ step: 4, description: 'Grupos de Interés del Programa de Estudios' }
]

const memberColumns = [
	{ name: 'Nombres y Apellidos', uid: 'fullname', sortable: true },
	{ name: 'Correo', uid: 'email', sortable: true },
	{ name: 'Cargo', uid: 'position', sortable: true },
	{ name: 'Teléfono', uid: 'telephone', sortable: true },
	{ name: 'Acciones', uid: 'actions' }
]

const groupColumns = [
	{ name: 'Interesado', uid: 'interested' },
	{ name: 'Tipo', uid: 'type' },
	{ name: 'Requerimiento Principal', uid: 'requirement' },
	{ name: 'Acciones', uid: 'actions' }
]

export { steps, memberColumns, groupColumns }
