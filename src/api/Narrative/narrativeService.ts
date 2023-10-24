import api from '../axios'

const url = {
	getNarrative: 'narratives',
	updateNarrative: 'narratives',
	deleteNarrative: 'narratives'
}

export const NarrativeService = {
	getNarrative: async (year: number, semester: 'A' | 'B', id: number) => {
		const res = await api.get(`/${year}/${semester}/standards/${id}/${url.getNarrative}`)
		return res.data
	},

	updateNarrative: async (year: number, semester: 'A' | 'B', id: number, params: any) => {
		const res = await api.put(`/${year}/${semester}/standards/${id}/${url.updateNarrative}`, params)
		return res.data
	}
}
