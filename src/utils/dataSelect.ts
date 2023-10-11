import { generateYearOptions } from './utils'

export const semesterOptions = [
	{ label: 'A', value: 'A' },
	{ label: 'B', value: 'B' }
]

export const roleOptions = [
	{ label: 'Admin', value: '1' },
	{ label: 'Docente', value: '2' }
]


export const statusOptions = [
	{ label: 'Activo', value: '1' },
	{ label: 'Inactivo', value: '2' }
]

export const yearOptions = generateYearOptions()
