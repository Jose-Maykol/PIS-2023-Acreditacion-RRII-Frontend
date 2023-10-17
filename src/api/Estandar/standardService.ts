import { AssignedUsers } from '@/types/Standard'
import api from '../axios'

const url = {
	listEstandar: '/2023/A/standards',
	listEstandarValues: '/2023/A/standards/standard-values',
	detailEstandard: '/2023/A/standards/',
	updateEstandar: '/2023/A/standards/'
}

export const StandardService = {
	// Falta implementar
	getAll: async () => {
		const res = await api.get('/estandar')
		return res
	},
	getPartial: async () => {
		const res = await api.get('/2023/A/standards/partial')
		return res.data
	},

	getStandardsAndAssignedUsers: async () => {
		const res = await api.get('/2023/A/standards/users')
		return res.data
	},
	getHeader: async(id:string) => {
		const res = await api.get(`2023/A/standards/${id}/header`)
		return res.data
	},
	assignUsersToStandard: async (IdStandard: string, params: AssignedUsers) => {
		try {
			const res = await api.put(`/2023/A/standards/${IdStandard}/assignment`, params)
			return res.data
		} catch (error: any) {
			if (error.response.status === 422) {
				return error.response.data
			}
		}
	},

	getListOfEnabledUsers: async (IdStandard: string) => {
		const res = await api.get(`/2023/A/standards/${IdStandard}/users`)
		return res.data
	},

	showEstandar: async (id: string) => {
		return await api.get(`${url.detailEstandard}${id}`)
	}
}
