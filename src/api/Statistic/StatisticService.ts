import { BaseService } from '../Base/BaseService'
import api from './../axios'

export class StatisticService extends BaseService {
	public static async plansStatistics () {
		const { year, semester } = BaseService.getConfig()
		const res = await api.get(`/${year}/${semester}/statistics/plans`)
		return res.data
	}
}