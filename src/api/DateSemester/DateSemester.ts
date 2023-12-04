import api from '../axios'


const url = {
	infoSemeseter: '/info',
	createDateSemester: '/date-semester',
	listDateSemester: '/date-semester'
}

export default class DateSemesterService {
	public static async getInfo () {
		const storedYear = localStorage.getItem('year')
		const storedSemester = localStorage.getItem('semester')
		if (storedYear && storedSemester) {
			const year = parseInt(storedYear)
			const semester = storedSemester as 'A' | 'B'
			const res = await api.get(`/${year}/${semester}${url.infoSemeseter}`)
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
}