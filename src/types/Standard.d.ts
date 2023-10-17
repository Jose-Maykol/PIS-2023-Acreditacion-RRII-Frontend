import { User } from './User'

export interface Standard {
	id: number
	name: string
	nro_standard: number
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
	valoration: number
	users: User[] | []
}

export interface StandardHeader {
	description: string
	dimension: string
	factor: string
	standardRelated: string
	status: {
		id: number
		description: string
	}
	permissions: {
		isAdministrator: boolean
		isManager: boolean
	}
}