import api from '../axios'
import { AxiosResponse } from 'axios'

const url = {
	readByPlan: '/2023/A/plans/',
	create: '/2023/A/plans',
	delete: '/2023/A/plans/',
	update: '/plan/',
	readUser: '/2023/A/plans/users',
	readByStandard: '/2023/A/plans?standard_id='
}

export const PlanMejoraService = {
	create: async (params: any): Promise<AxiosResponse> => {
		return await api.post(url.create, params)
	},

	readByStandard: async (standardId: string): Promise<AxiosResponse> => {
		return await api.get(`${url.readByStandard}${standardId}`)
	},

	delete: async (id: number): Promise<AxiosResponse> => {
		return await api.delete(`${url.delete}${id}/`)
	},

	readByPlan: async (id: string): Promise<AxiosResponse> => {
		return await api.get(`${url.readByPlan}${id}`)
	},

	readUser: async (): Promise<AxiosResponse> => {
		return await api.get(url.readUser)
	},

	update: async (id: string, params: any): Promise<AxiosResponse> => {
		return await api.put(`${url.update}${id}/`, params)
	}
}
