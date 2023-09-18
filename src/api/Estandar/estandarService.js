import api from '../axios'

const url = {
	listEstandar: '/2023/A/standards',
	listEstandarValues: '/2023/A/standards/standard-values',
	detailEstandard: '/2023/A/standards/',
	updateEstandar: '/2023/A/standards/'
}

class EstandarService {
	async listEstandar() {
		try {
			const response = await api.get(url.listEstandar)
			return {
				status: response.status,
				data: response.data
			}
		} catch (error) {
			return {
				status: false,
				data: error.response.data
			}
		}
	}

	async listEstandarValues() {
		try {
			const response = await api.get(url.listEstandarValues)
			return {
				status: response.status,
				data: response.data
			}
		} catch (error) {
			return {
				status: false,
				data: error.response.data
			}
		}
	}

	async showEstandar(id) {
		try {
			const response = await api.get(`${url.detailEstandard}${id}`)
			return {
				status: response.status,
				data: response.data
			}
		} catch (error) {
			return {
				status: false,
				data: error.response.data
			}
		}
	}

	async updateEstandar(id, params) {
		try {
			console.log(params)
			const response = await api.put(`${url.updateEstandar}${id}`, params)
			return {
				status: response.status,
				data: response.data
			}
		} catch (error) {
			return {
				status: false,
				data: error.response.data
			}
		}
	}
}


export default new EstandarService()