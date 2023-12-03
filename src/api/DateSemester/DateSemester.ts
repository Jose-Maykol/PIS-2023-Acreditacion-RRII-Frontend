import { parse } from 'path'
import api from '../axios'


const url = {
	createDateSemester: '/date-semester',
	listDateSemester: '/date-semester'
}

export default class DateSemesterService {
	public static async getAll () {
		const res = await api.get(url.listDateSemester)
		return res.data
	}

	public static async create (data: { year: number, semester: string }) {
		const res = await api.post(url.createDateSemester, data)
		return res.data
	}
}