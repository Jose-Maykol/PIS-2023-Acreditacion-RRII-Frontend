/* eslint-disable @typescript-eslint/no-explicit-any */
import { AssignedUsers, StandardValues } from '@/types/Standard'
import { BaseService } from '../Base/BaseService'
import api from '../axios'

const url = {
	listStandarPartial: 'standards/partial',
	standardsAssignments: 'standards/users',
	standards: 'standards/:id',
	standardValues: 'standards/standard-values',
	users: 'standards/:id/users',
	assignment: 'standards/:id/assignment',
	header: 'standards/:id/header',
	status: 'standards/:id/status/:statusId',
	evidences: 'standards/:id/evidences'
}

export class StandardService extends BaseService {
	public static async getAll () {
		const res = await api.get('/estandar')
		return res
	}

	public static async getPartial () {
		const { year, semester } = BaseService.getConfig()
		const res = await api.get(`/${year}/${semester}/${url.listStandarPartial}`)
		return res.data
	}

	public static async getStandardsAndAssignedUsers () {
		const { year, semester } = BaseService.getConfig()
		const res = await api.get(`/${year}/${semester}/${url.standardsAssignments}`)
		return res.data
	}

	public static async getHeader (id:string) {
		const { year, semester } = BaseService.getConfig()
		const res = await api.get(`/${year}/${semester}/${url.header.replace(':id', id)}`)
		return res.data
	}

	public static async assignUsersToStandard (id: string, params: AssignedUsers) {
		const { year, semester } = BaseService.getConfig()
		const res = await api.put(`/${year}/${semester}/${url.assignment.replace(':id', id)}`, params)
		return res.data
	}

	public static async getListOfEnabledUsers (id: string) {
		const { year, semester } = BaseService.getConfig()
		const res = await api.get(`/${year}/${semester}/${url.users.replace(':id', id)}`)
		return res.data
	}

	public static async showEstandar (id: string) {
		const { year, semester } = BaseService.getConfig()
		return await api.get(`/${year}/${semester}/${url.standards.replace(':id', id)}`)
	}

	public static async updateHeader (id: string, { name, description, dimension, factor, standardRelated }: StandardValues) {
		const { year, semester } = BaseService.getConfig()
		const params = { name, description, dimension, factor, related_standards: standardRelated }
		const res = await api.put(`/${year}/${semester}/${url.header.replace(':id', id)}}`, params)
		return res.data
	}

	public static async updateStatusStandard (id: string, statusID: number) {
		const { year, semester } = BaseService.getConfig()
		const res = await api.put(`/${year}/${semester}/${url.status.replace(':id', id).replace(':statusId', statusID.toString())}`)
		return res.data
	}

	public static async getEvidences (id: string) {
		const { year, semester } = BaseService.getConfig()
		const res = await api.get(`/${year}/${semester}/${url.evidences.replace(':id', id)}`)
		return res.data
	}
}
