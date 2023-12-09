import { create } from 'zustand'

type YearSemesterStore = {
  id: number | null
  year: number | null
  semester: 'A' | 'B' | null
  closingDate: string | null
  isClosed: boolean | null
  setId (id: number | null): void
  setYear (year: number | null): void
  setSemester (semester: 'A' | 'B' | null): void
  setClosingDate (closingDate: string | null): void
  setIsClosed (isClosed: boolean | null): void
}

export const useYearSemesterStore = create<YearSemesterStore>((set) => ({
	id: null,
	year: null,
	semester: null,
	closingDate: null,
	isClosed: null,
	setId: (id) => set({ id }),
	setYear: (year) => set({ year }),
	setSemester: (semester) => set({ semester }),
	setClosingDate: (closingDate) => set({ closingDate }),
	setIsClosed: (isClosed) => set({ isClosed })
}))
