import { create } from 'zustand'

type YearSemesterStore = {
  year: number | null
  semester: 'A' | 'B' | null
  setYear (year: number | null): void
  setSemester (semester: 'A' | 'B' | null): void
}

export const useYearSemesterStore = create<YearSemesterStore>((set) => ({
	year: null,
	semester: null,
	setYear: (year) => set({ year }),
	setSemester: (semester) => set({ semester })
}))
