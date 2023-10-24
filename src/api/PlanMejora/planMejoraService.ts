import api from '../axios'
import { AxiosResponse } from 'axios'

const url = {
	read: '/2023/A/plans',
	create: '/2023/A/plans',
	// delete: '/plan/',
	delete: '/2023/A/plans/',
	update: '/plan/',
	readUser: '/2023/A/plans/users',
	readByStandard: '/2023/A/plans?standard_id='
}

export const PlanMejoraService = {
	read: async (): Promise<AxiosResponse> => {
		return await api.get(url.read)
	},

	readUser: async (): Promise<AxiosResponse> => {
		return await api.get(url.readUser)
	},

	readByStandard: async (standardId: string): Promise<AxiosResponse> => {
		return await api.get(`${url.readByStandard}${standardId}`)
	},

	create: async (params: any): Promise<AxiosResponse> => {
		return await api.post(url.create, params)
	},

	delete: async (id: number): Promise<AxiosResponse> => {
		return await api.delete(`${url.delete}${id}/`)
	},

	update: async (id: string, params: any): Promise<AxiosResponse> => {
		return await api.put(`${url.update}${id}/`, params)
	}
}
