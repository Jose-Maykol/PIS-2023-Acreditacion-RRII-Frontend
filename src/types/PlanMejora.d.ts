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