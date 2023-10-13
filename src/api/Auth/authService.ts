import api from '../axios'

export const AuthService = {
	login: async (params: string) => {
		const res = await api.get(`auth/login/google/callback${params}`)
		return res
	},
	// falta implementar
	logout: async () => {
		const response = await api.post('/auth/logout')
		return response.data
	}
}
