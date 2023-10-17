import api from '../axios'

const url = {
	login: '/auth/login/google/callback'
}

export const AuthService = {
	login: async (params: string) => {
		const res = await api.get(`${url.login}${params}`)
		return res
	},
	// falta implementar
	logout: async () => {
		const response = await api.post('/auth/logout')
		return response.data
	}
}
