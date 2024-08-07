import { User } from './User'

export interface Standard {
	id?: number
	name: string
	description: string
	nro_standard?: number
	factor?: string
	dimension?: string
	related_standards?: string
	email?: string
	user_fullname?: string
	user_lastname?: string
	user_name?: string
	user_email?: string
	date_id?: number
	registration_status_id?: number
	is_editing?: boolean
}

export interface PartialStandard {
	id: number
	name: string
	nro_standard: number
}

export interface StandardUsers {
	id: number
	name: string
	nro_standard: number
	standard_status: string
	users: User[] | []
}

export interface EnabledUsers {
	id: number
	name: string
	lastname: string
	email: string
	avatar: string
	isManager: boolean
}

export interface AssignedUsers {
	users: string[]
}

export interface StandardValues {
	name: string
	description: string
	dimension: string
	factor: string
	standardRelated: string
}

export interface StandardHeader extends StandardValues {
	status: {
		id: number
		description: string
	}
	permissions: {
		isAdministrator: boolean
		isManager: boolean
	}
	nroStandard: number
}