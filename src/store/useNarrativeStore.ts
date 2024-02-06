import { create } from 'zustand'
import { Evidence } from '../types/Evidences'
interface NarrativeStore {
    isNarrativeEnabled: boolean
    setNarrativeEnable: () => void
    setNarrativeDisable: () => void
    evidenceNarrative: Evidence | null
    setEvidenceNarrative: (evidence: Evidence | null) => void
    isEditingNarrative: boolean
    setIsEditingNarrative: (value: boolean) => void
    narrativeBlockedId: number | null
    setNarrativeBlockedId: (id: number | null) => void
}

export const useNarrativeStore = create<NarrativeStore>((set) => ({
	isNarrativeEnabled: false,
	setNarrativeEnable: () => set({ isNarrativeEnabled: true }),
	setNarrativeDisable: () => set({ isNarrativeEnabled: false }),
	evidenceNarrative: null,
	setEvidenceNarrative: (evidence: Evidence | null) => set({ evidenceNarrative: evidence }),
	isEditingNarrative: false,
	setIsEditingNarrative: (value: boolean) => set({ isEditingNarrative: value }),
	narrativeBlockedId: null,
	setNarrativeBlockedId: (id: number | null) => set({ narrativeBlockedId: id })
}))