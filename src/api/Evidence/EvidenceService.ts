import { BaseService } from '../Base/BaseService'
import { AxiosRequestConfig } from 'axios'
import api from '../axios'

const url = {
	evidences: 'standards/:id/type-evidence/:idType',
	evidencesByPlan: 'standards/:id/type-evidence/:idType?plan_id=:planId',
	upload: 'evidences/various',
	view: 'evidences/:id/view',
	download: 'evidences/:id/download'
}

export class EvidenceService extends BaseService {
	public static async uploadEvidences(params: any) {
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

	public static async getEvidencesByType(id: string, idType: string, params: any, planId?: string) {
		console.log(params)
		const { year, semester } = BaseService.getConfig()
		let res
		if (planId) {
			res = await api.get(
				`/${year}/${semester}/${url.evidencesByPlan
					.replace(':id', id)
					.replace(':idType', idType)
					.replace(':planId', planId)}`,
				params
			)
		} else {
			res = await api.get(
				`/${year}/${semester}/${url.evidences.replace(':id', id).replace(':idType', idType)}`,
				params
			)
		}

		return res.data
	}

	public static async viewEvidence(id: string) {
		const config = {
			timeout: 60000,
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}
		const { year, semester } = BaseService.getConfig()
		const res = await api.get(`/${year}/${semester}/${url.view.replace(':id', id)}`, config)
		return res.data
	}

	public static downloadFile(id: string) {
		const config: AxiosRequestConfig = {
			timeout: 60000,
			responseType: 'blob' as const
		}
		const { year, semester } = BaseService.getConfig()
		const res = api.get(`/${year}/${semester}/${url.download.replace(':id', id)}`, config)
		return res
	}
}
