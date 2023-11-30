import { getFileIcon } from './utils'

const columns = [
	{ name: '#', uid: 'nro_standard', sortable: true },
	{ name: 'ESTÁNDAR', uid: 'name', sortable: true },
	{ name: 'ENCARGADOS', uid: 'users', sortable: true },
	{ name: 'VALORACION ESTANDAR', uid: 'standard_status' },
	{ name: 'ACCIONES', uid: 'actions' }
]

const valorationOptions = [
	{ label: 'Logrado', uid: 'logrado' },
	{ label: 'No Logrado', uid: 'no logrado' },
	{ label: 'Logrado Plenamente', uid: 'logrado plenamente' }
]

const typeFiles = [
	{ label: 'PDFs', uid: 'pdf', startContent: getFileIcon(null, 'pdf', 20) },
	{ label: 'DOCUMENTOS', uid: 'docx', startContent: getFileIcon(null, 'docx', 20) },
	{ label: 'PRESENTACIONES', uid: 'pptx', startContent: getFileIcon(null, 'pptx', 20) },
	{ label: 'HOJAS DE CALCULO', uid: 'xlsx', startContent: getFileIcon(null, 'xlsx', 20) },
	{ label: 'CARPETAS', uid: 'folder', startContent: getFileIcon(null, 'folder', 20) }
]

export { columns, valorationOptions, typeFiles }
