import { BaseService } from '../Base/BaseService'
import api from '../axios'

const url = {
	evidences: 'standards/:id/type-evidence/:idType',
	upload: 'evidences/various',
	view: 'evidences/:id/view'
}

export class EvidenceService extends BaseService {
	public static async uploadEvidences (params: any) {
		const { year, semester } = BaseService.getConfig()
		const config = {
			timeout: 60000,
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}
		const res = await api.post(`/${year}/${semester}/${url.upload}`, params, config)
		return res.data
	}

	public static async getEvidencesByType (id: string, idType: string, params: any) {
		const { year, semester } = BaseService.getConfig()
		const res = await api.get(`/${year}/${semester}/${url.evidences.replace(':id', id).replace(':idType', idType)}`, params)
		return res.data
	}

	public static async viewEvidence (id: string) {
		const { year, semester } = BaseService.getConfig()
		const res = await api.get(`/${year}/${semester}/${url.view.replace(':id', id)}`)
		return res.data
	}
}
