import api from '../axios'

const url = {
	googleLogin: 'auth/login/google/callback',
	logout: 'auth/logout'
}

class AuthService {
	async googleLogin(params) {
		try {
			const response = await api.get(url.googleLogin + params)
			console.log(response)
			return {
				status: response.status,
				data: response.data
			}
		} catch (error) {
			return {
				status: false,
				data: error.response.data
			}
		}
	}

	async logout() {
		try {
			const response = await api.get(url.logout)
			return {
				status: response.status,
				data: response.data
			}
		} catch (error) {
			return {
				status: false,
				data: error.response.data
			}
		}
	}
}

export default new AuthService()