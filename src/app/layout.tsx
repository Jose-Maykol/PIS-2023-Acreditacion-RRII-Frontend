'use client'

import './globals.css'
import { ReactNode, useEffect } from 'react'
import type { Metadata } from 'next'
import { Providers } from './providers'
import { useYearSemesterStore } from '@/store/useYearSemesterStore'

// export const metadata: Metadata = {
// 	title: 'Sistema de Gestión de Calidad',
// 	description: 'Sistema de Gestión de Calidad'
// }

export default function RootLayout({ children }: { children: ReactNode }) {
	const { setYear, setSemester } = useYearSemesterStore()

	useEffect(() => {
		if (typeof window !== 'undefined' && window.localStorage) {
			const yearString = localStorage.getItem('year')
			const semesterString = localStorage.getItem('semester')
			if (yearString && semesterString) {
				const yearNumber = parseInt(yearString)
				const semester = semesterString as 'A' | 'B'
				if (yearNumber !== null && yearNumber !== undefined) {
					if (yearNumber !== useYearSemesterStore.getState().year) {
						setYear(yearNumber)
					}
				}
				if (semester !== useYearSemesterStore.getState().semester) {
					setSemester(semester)
				}
			}
		}
	}, [])

	return (
		<html lang='en'>
			<body>
				<Providers>
					<main>{children}</main>
				</Providers>
			</body>
		</html>
	)
}
