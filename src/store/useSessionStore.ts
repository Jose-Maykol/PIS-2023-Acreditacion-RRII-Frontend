import { create } from 'zustand'

type SessionStore = {
	isModalOpen: boolean
	sessionState: 'active' | 'inactive' | 'expired'
	openModal: () => void
	closeModal: () => void
	setSessionState: (state: 'active' | 'inactive' | 'expired') => void
}

export const useSessionStore = create<SessionStore>((set) => ({
	isModalOpen: false,
	sessionState: 'active',
	openModal: () => set({ isModalOpen: true }),
	closeModal: () => set({ isModalOpen: false }),
	setSessionState: (state) => set({ sessionState: state })
}))
