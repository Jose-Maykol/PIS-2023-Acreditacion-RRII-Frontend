import { create } from 'zustand'

type PermissionsStore = {
  permissions: string[]
  role: string
  setPermissions (permissions: string[]): void
  setRole (role: string): void
}

export const usePermissionsStore = create<PermissionsStore>((set) => ({
	permissions: [],
	role: '',
	setPermissions: (permissions) => set({ permissions }),
	setRole: (role) => set({ role })
}))