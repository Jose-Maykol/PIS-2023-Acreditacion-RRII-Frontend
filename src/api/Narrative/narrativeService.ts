import { BaseService } from '../Base/BaseService'
import api from '../axios'

const url = {
	getNarrative: 'narratives',
	updateNarrative: 'narratives',
	deleteNarrative: 'narratives'
}

export class NarrativeService extends BaseService {
	public static async getNarrative (id: number) {
		const { year, semester } = BaseService.getConfig()
		const res = await api.get(`/${year}/${semester}/standards/${id}/${url.getNarrative}`)
		return res.data
	}

	public static async updateNarrative (id: number, params: { narrative: string}) {
		const { year, semester } = BaseService.getConfig()
		const res = await api.put(`/${year}/${semester}/standards/${id}/${url.updateNarrative}`, params)
		return res.data
	}

	public static async deleteNarrative (id: number) {
		const { year, semester } = BaseService.getConfig()
		const res = await api.delete(`/${year}/${semester}/standards/${id}/${url.deleteNarrative}`)
		return res.data
	}
}
