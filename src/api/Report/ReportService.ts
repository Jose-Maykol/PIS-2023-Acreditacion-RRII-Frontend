import { BaseService } from '../Base/BaseService'
import api from '../axios'


const url = {
	narratives: 'standards/narratives/export',
	summaryPlans: 'standards/plans/export',
	evidences: 'evidences/export',
	plan: 'plans/:id/export'
}

export class ReportService extends BaseService {
	public static async generateNarrativesReport () {
		const config = {
			timeout: 60000,
			headers: {
				'Content-Type': 'application/json'
			}
		}
		const { year, semester } = BaseService.getConfig()
		const res = await api.get(`/${year}/${semester}/${url.narratives}`, config)
		return res
	}

	public static async generateSummaryPlansReport () {
		const config = {
			timeout: 60000,
			headers: {
				'Content-Type': 'application/json'
			}
		}
		const { year, semester } = BaseService.getConfig()
		const res = await api.get(`/${year}/${semester}/${url.summaryPlans}`, config)
		return res
	}

	public static async generateEvidencesReport () {
		const config = {
			timeout: 60000,
			headers: {
				'Content-Type': 'application/json'
			}
		}
		const { year, semester } = BaseService.getConfig()
		const res = await api.get(`/${year}/${semester}/${url.evidences}`, config)
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
}

