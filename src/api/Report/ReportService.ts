import { BaseService } from '../Base/BaseService'
import api from '../axios'


const url = {
	narratives: 'standards/narratives/export',
	summaryPlans: 'plans/export',
	evidences: 'evidences/export',
	plan: 'plans/:id/export',
	context: 'standards/context/export'
}

interface reportParams {
	startYear: string,
	endYear: string,
	semester: string,
	standardId: string,
}

export class ReportService extends BaseService {
	public static async generateNarrativesReport (params: reportParams) {
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

	public static async generateSummaryPlansReport () {
		const config = {
			timeout: 60000,
			responseType: 'blob' as 'json' | 'blob' | 'text' | 'arraybuffer' | 'stream'
		}
		const { year, semester } = BaseService.getConfig()
		const res = await api.get(`/${year}/${semester}/${url.summaryPlans}`, config)
		return res
	}

	public static async generateEvidencesReport (params: reportParams) {
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

	public static async generatePlanReport (id: string) {
		const config = {
			timeout: 60000,
			responseType: 'blob' as 'json' | 'blob' | 'text' | 'arraybuffer' | 'stream'
		}
		const { year, semester } = BaseService.getConfig()
		const res = await api.get(`/${year}/${semester}/${url.plan.replace(':id', id)}`, config)
		return res
	}

	public static async generateContextReport () {
		const config = {
			timeout: 60000,
			responseType: 'blob' as 'json' | 'blob' | 'text' | 'arraybuffer' | 'stream'
		}
		const { year, semester } = BaseService.getConfig()
		const res = await api.get(`/${year}/${semester}/${url.context}`, config)
		return res
	}
}

