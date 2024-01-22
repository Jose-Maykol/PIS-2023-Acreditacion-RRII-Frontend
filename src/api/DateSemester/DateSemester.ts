import api from '../axios'

const url = {
	infoSemester: '/info',
	createDateSemester: '/date-semester',
	listDateSemester: '/date-semester',
	editDateSemester: '/date-semester',
	statusDateSemester: '/date-semester/status',
	closeDateSemester: '/close'
}

export default class DateSemesterService {
	public static async getInfo () {
		const storedYear = localStorage.getItem('year')
		const storedSemester = localStorage.getItem('semester')
		if (storedYear && storedSemester) {
			const year = parseInt(storedYear)
			const semester = storedSemester as 'A' | 'B'
			const res = await api.get(`/${year}/${semester}${url.infoSemester}`)
			return res.data
		}
	}

	public static async getAll () {
		const res = await api.get(url.listDateSemester)
		return res.data
	}

	public static async create (data: { year: number, semester: string }) {
		const res = await api.post(url.createDateSemester, data)
		return res.data
	}

	public static async edit (data: {id_date_semester: number, year: number, semester: string, closing_date: Date }) {
		const res = await api.put(url.editDateSemester, data)
		return res.data
	}

	public static async status () {
		const storedYear = localStorage.getItem('year')
		const storedSemester = localStorage.getItem('semester')
		if (storedYear && storedSemester) {
			const year = parseInt(storedYear)
			const semester = storedSemester as 'A' | 'B'
			const res = await api.get(url.statusDateSemester, {
				params: {
					year,
					semester
				}
			})
			return res.data
		}
	}

	public static async close (data: { closing_date: string }) {
		const storedYear = localStorage.getItem('year')
		const storedSemester = localStorage.getItem('semester')
		if (storedYear && storedSemester) {
			const year = parseInt(storedYear)
			const semester = storedSemester as 'A' | 'B'
			const res = await api.post(`/${year}/${semester}${url.closeDateSemester}`, data)
			return res.data
		}
	}
}