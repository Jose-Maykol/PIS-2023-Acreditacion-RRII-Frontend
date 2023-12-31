import { BaseService } from '../Base/BaseService'
import { AxiosRequestConfig } from 'axios'
import api from '../axios'

const url = {
	evidences: 'standards/:id/type-evidence/:idType',
	evidencesByPlan: 'standards/:id/type-evidence/:idType?plan_id=:planId',
	upload: 'evidences/various',
	view: 'evidences/:id/view',
	download: 'evidences/:id/download',
	renameEvidence: 'evidences/:id/rename',
	renameFolder: 'evidences/folder/:id/rename',
	deleteEvidence: 'evidences/:id',
	deleteFolder: 'evidences/folder/:id',
	createFolder: 'evidences/folder',
	moveEvidence: 'evidences/:id/move',
	moveFolder: 'evidences/folder/:id/move',
	folderList: 'evidences/folder'
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

	public static async getEvidencesByType(
		id: string,
		idType: string,
		params: { parent_id: number | null },
		planId?: string
	) {
		const config: AxiosRequestConfig = {
			params
		}
		const { year, semester } = BaseService.getConfig()
		let res

		if (planId) {
			res = await api.get(
				`/${year}/${semester}/${url.evidencesByPlan
					.replace(':id', id)
					.replace(':idType', idType)
					.replace(':planId', planId)}`,
				config
			)
		} else {
			res = await api.get(
				`/${year}/${semester}/${url.evidences.replace(':id', id).replace(':idType', idType)}`,
				config
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

	public static async renameEvidence(id: string, params: { new_filename: string }) {
		const { year, semester } = BaseService.getConfig()
		const res = await api.patch(
			`/${year}/${semester}/${url.renameEvidence.replace(':id', id)}`,
			params
		)
		console.log('file', res.data)
		return res.data
	}

	public static async renameFolder(id: string, params: { new_name: string }) {
		const { year, semester } = BaseService.getConfig()
		const res = await api.patch(
			`/${year}/${semester}/${url.renameFolder.replace(':id', id)}`,
			params
		)
		console.log('folder', res.data)
		return res.data
	}

	public static async deleteEvidence(id: string) {
		const { year, semester } = BaseService.getConfig()
		const res = await api.delete(`/${year}/${semester}/${url.deleteEvidence.replace(':id', id)}`)
		return res.data
	}

	public static async deleteFolder(id: string) {
		const { year, semester } = BaseService.getConfig()
		const res = await api.delete(`/${year}/${semester}/${url.deleteFolder.replace(':id', id)}`)
		return res.data
	}

	public static async createFolder(params: {
		name: string
		standard_id: number
		evidence_type_id: number
		path: string
	}) {
		const { year, semester } = BaseService.getConfig()
		const res = await api.post(`/${year}/${semester}/${url.createFolder}`, params)
		return res.data
	}

	public static async moveEvidence(id: string, params: { parent_id: number | null }) {
		const { year, semester } = BaseService.getConfig()
		const res = await api.patch(`/${year}/${semester}/${url.moveEvidence.replace(':id', id)}`, params)
		return res.data
	}

	public static async moveFolder(id: string, params: { parent_id: number | null }) {
		const { year, semester } = BaseService.getConfig()
		const res = await api.patch(`/${year}/${semester}/${url.moveFolder.replace(':id', id)}`, params)
		return res.data
	}

	public static async folderList(params : { folder_id: number | null, standard_id: number, evidence_type_id: number }) {
		const { year, semester } = BaseService.getConfig()
		const res = await api.get(`/${year}/${semester}/${url.folderList}`, { params })
		return res.data
	}
}
