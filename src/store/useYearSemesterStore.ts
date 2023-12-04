import { create } from 'zustand'

type YearSemesterStore = {
  year: number | null
  semester: 'A' | 'B' | null
  closingDate: Date | null
  isClosed: boolean | null
  setYear (year: number | null): void
  setSemester (semester: 'A' | 'B' | null): void
  setClosingDate (closingDate: Date | null): void
  setIsClosed (isClosed: boolean | null): void
}

export const useYearSemesterStore = create<YearSemesterStore>((set) => ({
	year: null,
	semester: null,
	closingDate: null,
	isClosed: null,
	setYear: (year) => set({ year }),
	setSemester: (semester) => set({ semester }),
	setClosingDate: (closingDate) => set({ closingDate }),
	setIsClosed: (isClosed) => set({ isClosed })
}))
