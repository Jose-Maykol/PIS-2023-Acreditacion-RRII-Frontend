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
		const res = await api.get(`/2023/A/standards/users`);
		return res.data
	},

	listEstandar: async () => {
		return await api.get(url.listEstandar)
	},

	listEstandarValues: async () => {
		return await api.get(url.listEstandarValues)
	},

	showEstandar: async (id: string) => {
		return await api.get(`${url.detailEstandard}${id}`)
	},

	updateEstandar: async (id: string, params: any) => {
		return await api.put(`${url.updateEstandar}${id}`, params)
	}
}
