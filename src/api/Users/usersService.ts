/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateUser } from '@/types/User'
import api from '../axios'

const url = {
	listUsers: '/users',
	detailUser: '/users/profile',
	createUser: '/users',
	updateUser: '/users/',
	deleteUser: '/users/update_status/',
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
		try {
			const res = await api.post(url.createUser, params)
			return res.data
		} catch (error: any) {
			if (error.response.status === 422) {
				return error.response.data
			}
		}
	},

	updateUser: async (id: number, params: any) => {
		return await api.put(`${url.updateUser}${id}`, params)
	},

	deleteUser: async (id: number, params: any) => {
		const res = await api.put(`${url.deleteUser}${id}`, params)
		return res.data
	},

	enableUsers: async () => {
		const res = await api.get(url.enableUsers)
		return res.data
	}
}
