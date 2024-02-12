import { create } from 'zustand'

type PermissionsStore = {
  permissions: {
    createStandard: boolean
    readStandard: boolean
    updateStandard: boolean
    deleteStandard: boolean
    createPlan: boolean
    readPlan: boolean
    updatePlan: boolean
    deletePlan: boolean
    createEvidence: boolean
    readEvidence: boolean
    updateEvidence: boolean
    deleteEvidence: boolean
    createUser: boolean
    readUser: boolean
    updateUser: boolean
    deleteUser: boolean
  }
  role: string
  // eslint-disable-next-line no-unused-vars
  setPermissions(permissions: Partial<PermissionsStore['permissions']> & { [K in keyof PermissionsStore['permissions']]: boolean }): void;
  setRole (role: string): void
}

export const usePermissionsStore = create<PermissionsStore>((set) => ({
	permissions: {
		createStandard: false,
		readStandard: false,
		updateStandard: false,
		deleteStandard: false,
		createPlan: false,
		readPlan: false,
		updatePlan: false,
		deletePlan: false,
		createEvidence: false,
		readEvidence: false,
		updateEvidence: false,
		deleteEvidence: false,
		createUser: false,
		readUser: false,
		updateUser: false,
		deleteUser: false
	},
	role: '',
	setPermissions: (permissions) => set({ permissions }),
	setRole: (role) => set({ role })
}))