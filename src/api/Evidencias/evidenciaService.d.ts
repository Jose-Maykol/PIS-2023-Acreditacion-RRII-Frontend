declare module '@/api/Evidencias/evidenciaService.js' {
	interface EvidenciaResponse {
		status: number
		data: any // Puedes ajustar este tipo según el tipo de datos que esperes en la respuesta
	}

	class EvidenciaService {
		listEvidencias(id: string, tipo: string, params: any): Promise<EvidenciaResponse>
		uploadEvidencias(params: any): Promise<EvidenciaResponse>
		donwloadEvidencia(id: string): Promise<EvidenciaResponse>
		updateEvidencia(id: string, params: any): Promise<EvidenciaResponse>
		renameEvidencia(id: string, params: any): Promise<EvidenciaResponse>
		deleteEvidencia(): Promise<EvidenciaResponse>
	}

	const evidenciaService: EvidenciaService
	export default evidenciaService
}
