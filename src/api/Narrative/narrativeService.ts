import { BaseService } from '../Base/BaseService'
import api from '../axios'

const url = {
	getNarrative: 'narratives',
	updateNarrative: 'standards/:id/narratives',
	deleteNarrative: 'narratives',
	enableNarrative: 'standards/:id/narratives/enable',
	blockNarrative: 'standards/:id/narratives/block',
	unlockNarrative: 'standards/:id/narratives/unlock'
}

export class NarrativeService extends BaseService {
	public static async getNarrative (id: number) {
		const { year, semester } = BaseService.getConfig()
		const res = await api.get(`/${year}/${semester}/standards/${id}/${url.getNarrative}`)
		console.log('get narrativa', res.data)
		return res.data
	}

	public static async updateNarrative (id: string, params: { narrative: string}) {
		const { year, semester } = BaseService.getConfig()
		const res = await api.put(`/${year}/${semester}/${url.updateNarrative.replace(':id', id)}`, params)
		return res.data
	}

	public static async deleteNarrative (id: number) {
		const { year, semester } = BaseService.getConfig()
		const res = await api.delete(`/${year}/${semester}/standards/${id}/${url.deleteNarrative}`)
		return res.data
	}

	public static async enableNarrative (id: string) {
		const { year, semester } = BaseService.getConfig()
		const res = await api.post(`/${year}/${semester}/${url.enableNarrative.replace(':id', id)}`)
		return res.data
	}

	public static async blockNarrative (id: string) {
		const { year, semester } = BaseService.getConfig()
		const res = await api.post(`/${year}/${semester}/${url.blockNarrative.replace(':id', id)}`)
		return res.data
	}

	public static async unlockNarrative (id: string) {
		const { year, semester } = BaseService.getConfig()
		const res = await api.post(`/${year}/${semester}/${url.unlockNarrative.replace(':id', id)}`)
		return res.data
	}
}
