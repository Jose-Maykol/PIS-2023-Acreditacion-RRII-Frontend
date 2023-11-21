import { create } from 'zustand'

type PermissionsStore = {
  permissions: string[]
  setPermissions (permissions: string[]): void
}

export const usePermissionsStore = create<PermissionsStore>((set) => ({
	permissions: [],
	setPermissions: (permissions) => set({ permissions })
}))