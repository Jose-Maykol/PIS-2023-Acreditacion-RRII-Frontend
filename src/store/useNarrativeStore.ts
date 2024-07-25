import { create } from 'zustand'
import { Evidence } from '../types/Evidences'
interface NarrativeStore {
    isNarrativeEnabled: boolean
    setNarrativeEnabled: (value: boolean) => void
    evidenceNarrative: Evidence | null
    setEvidenceNarrative: (evidence: Evidence | null) => void
}

export const useNarrativeStore = create<NarrativeStore>((set) => ({
	isNarrativeEnabled: false,
	setNarrativeEnabled: (value: boolean) => set({ isNarrativeEnabled: value }),
	evidenceNarrative: null,
	setEvidenceNarrative: (evidence: Evidence | null) => set({ evidenceNarrative: evidence })
}))