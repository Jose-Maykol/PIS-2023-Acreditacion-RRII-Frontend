// TODO: Add PM interfaces
// import { AssignedUsers, StandardValues } from '@/types/Standard'
import { BaseService } from '../Base/BaseService'
import api from '../axios'

const url = {
	readByPlan: 'plans/',
	create: 'plans',
	delete: 'plans/',
	update: '/plan/',
	readUser: 'plans/users',
	readByStandard: 'plans?standard_id='
}

export class PlanMejoraService extends BaseService {
	public static async create(params: any) {
		const { year, semester } = BaseService.getConfig()
		const res = await api.post(`/${year}/${semester}/${url.create}`, params)
		return res
	}

	// public static async readUser() {
	// 	const { year, semester } = BaseService.getConfig()
	// 	const res = await api.get(`/${year}/${semester}/${url.readUser}`)
	// 	return res.data
	// }

	public static async readByStandard(standardId: string) {
		const { year, semester } = BaseService.getConfig()
		const res = await api.get(`/${year}/${semester}/${url.readByStandard}${standardId}`)
		return res
	}

	public static async delete(id: number) {
		const { year, semester } = BaseService.getConfig()
		const res = await api.delete(`/${year}/${semester}/${url.delete}${id}`)
		return res
	}

	// TODO: Modify UPDATE endpoint
	public static async update(id: string, params: any) {
		const { year, semester } = BaseService.getConfig()
		const res = await api.put(`/${year}/${semester}/${url.update}${id}/`, params)
		return res
	}

	public static async readByPlan(id: string) {
		const { year, semester } = BaseService.getConfig()
		const res = await api.get(`/${year}/${semester}/${url.readByPlan}${id}`)
		return res
	}

	public static async readUser(year: number, semester: 'A' | 'B') {
		const res = await api.get(`/${year}/${semester}/${url.readUser}`)
		return res.data
	}
}
