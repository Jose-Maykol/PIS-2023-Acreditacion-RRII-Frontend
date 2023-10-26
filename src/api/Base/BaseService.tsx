export class BaseService {
	private static _year: number | null = null
	private static _semester: 'A' | 'B' | null = null

	public static configure(year: number, semester: 'A' | 'B'): void {
		console.log('configure', year, semester)
		this._year = year
		this._semester = semester
	}

	protected static getConfig(): { year: number, semester: 'A' | 'B' } {
		if (this._year === null || this._semester === null) {
			throw new Error('Year and semester must be configured before making a request')
		}
		return { year: this._year, semester: this._semester }
	}
}