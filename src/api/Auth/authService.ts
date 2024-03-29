import api from '../axios'

const url = {
	login: '/auth/google/callback',
	logout: '/api/auth/logout'
}

export const AuthService = {
	login: async (params: string) => {
		const res = await api.get(`${url.login}${params}`)
		return res
	},

	logout: async () => {
		const response = await api.post(`${url.logout}`)
		return response.data
	}
}
