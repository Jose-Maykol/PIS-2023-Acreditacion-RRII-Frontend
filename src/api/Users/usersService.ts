import api from '../axios'

const url = {
	listUsers: '/users',
	detailUser: '/users/profile',
	createUser: '/users/register',
	updateUser: '/users/',
	deleteUser: '/user/',
	enableUsers: '/users/enabled_users'
}

export const UsersService = {
	listUsers: async () => {
		return await api.get(url.listUsers)
	},

	detailUser: async () => {
		return await api.get(url.detailUser)
	},

	createUser: async (params: any) => {
		return await api.post(url.createUser, params)
	},

	updateUser: async (id: string, params: any) => {
		return await api.put(`${url.updateUser}${id}`, params)
	},

	deleteUser: async (id: string) => {
		return await api.delete(`${url.deleteUser}${id}`)
	},

	enableUsers: async () => {
		return await api.get(url.enableUsers)
	}
}
