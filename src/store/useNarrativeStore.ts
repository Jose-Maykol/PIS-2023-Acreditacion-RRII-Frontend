import { create } from 'zustand'
import { Evidence } from '../types/Evidences'
interface NarrativeStore {
    isNarrativeEnabled: boolean
    setNarrativeEnabled: (value: boolean) => void
    evidenceNarrative: Evidence | null
    setEvidenceNarrative: (evidence: Evidence | null) => void
    isEditingNarrative: boolean
    setIsEditingNarrative: (value: boolean) => void
    narrativeBlockedId: number | null
    setNarrativeBlockedId: (id: number | null) => void
    isNarrativeBlock: boolean
    unlockNarrative: (value: boolean) => void
}

export const useNarrativeStore = create<NarrativeStore>((set) => ({
	isNarrativeEnabled: false,
	setNarrativeEnabled: (value: boolean) => set({ isNarrativeEnabled: value }),
	evidenceNarrative: null,
	setEvidenceNarrative: (evidence: Evidence | null) => set({ evidenceNarrative: evidence }),
	isEditingNarrative: false,
	setIsEditingNarrative: (value: boolean) => set({ isEditingNarrative: value }),
	narrativeBlockedId: null,
	setNarrativeBlockedId: (id: number | null) => set({ narrativeBlockedId: id }),
	isNarrativeBlock: false,
	unlockNarrative: (value: boolean) => set({ isNarrativeBlock: value })
}))