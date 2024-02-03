import { BaseService } from '../Base/BaseService'
import api from '../axios'

const url = {
	narratives: 'standards/narratives/export',
	summaryPlans: 'plans/export',
	evidences: 'evidences/export',
	plan: 'plans/:id/export',
	context: 'standards/context/export',
	anual: 'standards/anual/export',
	createContextIdentification: 'ident-context/',
	facultyStaff: 'faculty-staff'
}

interface reportParams {
	startYear: string
	endYear: string
	semester: string
	standardId: string
}

export class ReportService extends BaseService {
	public static async generateNarrativesReport(params: reportParams) {
		const config = {
			timeout: 60000,
			responseType: 'blob' as 'json' | 'blob' | 'text' | 'arraybuffer' | 'stream'
		}
		const { year, semester } = BaseService.getConfig()
		const res = await api.get(`/${year}/${semester}/${url.narratives}`, {
			...config,
			params
		})
		return res
	}

	public static async generateSummaryPlansReport() {
		const config = {
			timeout: 60000,
			responseType: 'blob' as 'json' | 'blob' | 'text' | 'arraybuffer' | 'stream'
		}
		const { year, semester } = BaseService.getConfig()
		const res = await api.get(`/${year}/${semester}/${url.summaryPlans}`, config)
		return res
	}

	public static async generateEvidencesReport(params: reportParams) {
		const config = {
			timeout: 60000,
			responseType: 'blob' as 'json' | 'blob' | 'text' | 'arraybuffer' | 'stream'
		}
		const { year, semester } = BaseService.getConfig()
		const res = await api.get(`/${year}/${semester}/${url.evidences}`, {
			...config,
			params
		})
		return res
	}

	public static async generatePlanReport(id: string) {
		const config = {
			timeout: 60000,
			responseType: 'blob' as 'json' | 'blob' | 'text' | 'arraybuffer' | 'stream'
		}
		const { year, semester } = BaseService.getConfig()
		const res = await api.get(`/${year}/${semester}/${url.plan.replace(':id', id)}`, config)
		return res
	}

	public static async generateContextReport() {
		const config = {
			timeout: 60000,
			responseType: 'blob' as 'json' | 'blob' | 'text' | 'arraybuffer' | 'stream'
		}
		const { year, semester } = BaseService.getConfig()
		const res = await api.get(`/${year}/${semester}/${url.context}`, config)
		return res
	}

	public static async generateAnualReport(params: reportParams) {
		const config = {
			timeout: 60000,
			responseType: 'blob' as 'json' | 'blob' | 'text' | 'arraybuffer' | 'stream'
		}
		const { year, semester } = BaseService.getConfig()
		const res = await api.get(`/${year}/${semester}/${url.anual}`, {
			...config,
			params
		})
		return res
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public static async createContextIdentificationReport(params: any) {
		const { year, semester } = BaseService.getConfig()
		const res = await api.post(`/${year}/${semester}/${url.createContextIdentification}`, params)
		return res
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public static async createFacultyStaffReport(params: any) {
		const { year, semester } = BaseService.getConfig()
		const res = await api.post(`/${year}/${semester}/${url.facultyStaff}`, params)
		return res
	}

	public static async readFacultyStaff() {
		const { year, semester } = BaseService.getConfig()
		const res = await api.get(`/${year}/${semester}/${url.facultyStaff}`)
		return res
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public static async updateFacultyStaff(params: any) {
		const { year, semester } = BaseService.getConfig()
		const res = await api.put(`/${year}/${semester}/${url.facultyStaff}`, params)
		return res
	}
}
