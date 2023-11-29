import api from '../axios'


const url = {
	listDateSemester: '/date-semester'
}

export default class DateSemesterService {
	public static async getAll () {
		const res = await api.get(url.listDateSemester)
		return res.data
	}
}