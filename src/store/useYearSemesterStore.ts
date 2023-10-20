import { create } from 'zustand'

type YearSemesterStore = {
  year: number | null
  semester: 'A' | 'B' | null
  setYear (year: number): void
  setSemester (semester: 'A' | 'B'): void
}

export const useYearSemesterStore = create<YearSemesterStore>((set) => ({
	year: null,
	semester: null,
	setYear: (year) => set({ year }),
	setSemester: (semester) => set({ semester })
}))
