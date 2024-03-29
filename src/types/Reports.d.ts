export type IdentificationContextStep = {
	step: number,
    description: string
}

export interface QualityMember {
	id: number
	name: string
	lastname: string
	email: string
	position: string
	telephone: string
}

export interface InterestedGroup {
	id: number
	interested: string
	type: string
	main_requirement_study_program: string
}