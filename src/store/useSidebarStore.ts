import { create } from 'zustand'

interface SidebarStoreProps {
    isSidebarOpen: boolean
    toggleSidebar: (value: boolean) => void
}

export const useSidebarStore = create<SidebarStoreProps>((set) => ({
	isSidebarOpen: true,
	toggleSidebar: (value: boolean) => set({ isSidebarOpen: !value })
}))