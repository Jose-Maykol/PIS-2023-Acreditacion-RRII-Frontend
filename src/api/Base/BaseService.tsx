export class BaseService {
	private static _year: number | null = null
	private static _semester: 'A' | 'B' | null = null

	public static configure(year: number, semester: 'A' | 'B'): void {
		this._year = year
		this._semester = semester
	}

	protected static getConfig(): { year: number, semester: 'A' | 'B' } {
		let year = this._year
		let semester = this._semester

		const storedYear = localStorage.getItem('year')
		const storedSemester = localStorage.getItem('semester')

		if (storedYear && storedSemester) {
			year = parseInt(storedYear)
			semester = storedSemester as 'A' | 'B'
		}

		if (year === null || semester === null) {
			throw new Error('Year and semester must be configured before making a request')
		}

		return { year, semester }
	}
}