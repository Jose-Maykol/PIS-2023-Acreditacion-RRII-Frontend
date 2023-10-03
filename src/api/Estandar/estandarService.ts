import api from '../axios'

export const StandardService = {
	// Falta implementar
	getAll: async () => {
		const res = await api.get('/estandar')
		return res
	},
	getPartial: async () => {
		const res = await api.get('/2023/A/standards')
		return res.data
	}
}