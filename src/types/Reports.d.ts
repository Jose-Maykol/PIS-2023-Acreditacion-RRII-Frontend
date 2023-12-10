export type IdentificationContextStep = {
	step: number,
    description: string
}

export interface QualityMember {
	id: number
	fullname: string
	email: string
	position: string
	phone: string
}

export interface InterestedGroup {
	id: number
	interested: string
	type: string
	requirement: string
}