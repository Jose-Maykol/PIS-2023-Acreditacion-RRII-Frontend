import { getFileIcon } from "./utils"
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

export { valorationOptions, typeFiles }

