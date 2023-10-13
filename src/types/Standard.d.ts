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
