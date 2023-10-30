export interface PlanMejora {
  id: number,
  nombre: string,
  codigo: string,
  avance: number,
  estado: string,
  estandar_name: string,
  user_name: string,
  esCreador: boolean,
}

export type EstadoPlanMejora =
  | 'Planificado'
  | 'Programado'
  | 'Reprogramado'
  | 'En proceso'
  | 'Concluido';

export function estadoPlanMejoraToColor(estado: EstadoPlanMejora): [string, string] {
	const colores: Record<EstadoPlanMejora, [string, string]> = {
		'En proceso': ['#ef4444', '#FECACA'],
		Concluido: ['#10B981', '#68d7b2'],
		Programado: ['#FF8F0C', '#F7C78E'],
		Planificado: ['#0f8dc4', '#25BAFA'],
		Reprogramado: ['#F3F80C', '#FCFDB7']
	}

	return colores[estado] || ['red', 'blue']
}

export type ImprovementPlans = {
	advance: number
	code: string
	id: number
	isCreator: boolean
	name: string
	nro_standard: number
	plan_status: string
	standard_name: string
	user_name: string
}

export type planItem = {
	id: number
	description: string
}

export type ImprovementPlan = {
	advance: number
	code: string
	duration: number
	name: string
	plan_status_id: number
	standard_id: number
	semester_execution: string
	efficacy_evaluation: boolean
	opportunity_for_improvement: string
	problems_opportunities: planItem[],
	root_causes: planItem[],
	goals: planItem[],
	improvement_actions: planItem[],
	observations: planItem[],
	resources: planItem[],
	responsibles: planItem[],
	sources: planItem[]
}

export type ItemValue = {
	description: string
}

export type DynamicInputGeneric = {
	description: string
}
