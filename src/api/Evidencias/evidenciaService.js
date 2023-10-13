import api from '../axios'

const url = {
	viewEvidencias: '/2023/A/evidences',
	uploadEvidencias: '/2023/A/evidences/various',
	donwloadEvidencia: '/2023/A/evidences/',
	updateEvidencia: '/2023/A/evidences/',
	renameEvidencia: '/2023/A/evidences/',
	deleteEvidencia: ''
}

class EvidenciaService {
	async listEvidencias(id, tipo, params) {
		try {
			const response = await api.get(`2023/A/standards/${id}/type-evidence/${tipo}/`, params)

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

	async uploadEvidencias(params) {
		try {
			const response = await api.post(`${url.uploadEvidencias}`, params, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			console.log(response)

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

	async donwloadEvidencia(id) {
		try {
			const response = await api.get(url.donwloadEvidencia + id + '/download')

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

	async updateEvidencia(id, params) {
		try {
			const response = await api.put(`${url.updateEvidencia}${id}`)

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

	async renameEvidencia(id, params) {
		try {
			const response = await api.post(`${url.renameEvidencia}/${id}/rename`, params)

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

	async deleteEvidencia() {
		try {
			const response = await api.delete(`${url.deleteEvidencia}`)

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

export default new EvidenciaService()
