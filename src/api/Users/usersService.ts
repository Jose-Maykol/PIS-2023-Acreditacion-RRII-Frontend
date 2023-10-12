import { CreateUser } from '@/types/User'
import api from '../axios'

const url = {
	listUsers: '/users',
	detailUser: '/users/profile',
	createUser: '/users',
	updateUser: '/users/',
	deleteUser: '/user/',
	enableUsers: '/users/enabled_users'
}

export const UsersService = {
	listUsers: async () => {
		const res = await api.get(url.listUsers)
		return res.data
	},

	detailUser: async () => {
		return await api.get(url.detailUser)
	},

	createUser: async (params: CreateUser) => {
		const res = await api.post(url.createUser, params)
		return res.data
	},

	updateUser: async (id: string, params: any) => {
		return await api.put(`${url.updateUser}${id}`, params)
	},

	deleteUser: async (id: string) => {
		return await api.delete(`${url.deleteUser}${id}`)
	},

	enableUsers: async () => {
		const res = await api.get(url.enableUsers)
		return res.data
	}
}
