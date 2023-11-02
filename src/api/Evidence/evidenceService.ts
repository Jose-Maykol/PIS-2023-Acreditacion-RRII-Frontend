import { BaseService } from '../Base/BaseService'
import api from '../axios'

export class EvidenceService extends BaseService {
	public static async view (id: number) {
		const { year, semester } = BaseService.getConfig()
		const response = await api.get(`/${year}/${semester}/evidences/${id}/view`)
		return response.data
	}
}