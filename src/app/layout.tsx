'use client'

import './globals.css'
import { ReactNode, useEffect, useState } from 'react'
import type { Metadata } from 'next'
import { Providers } from './providers'
import { useYearSemesterStore } from '@/store/useYearSemesterStore'
import { usePermissionsStore } from '@/store/usePermissionsStore'
import { useRouter } from 'next/navigation'

// export const metadata: Metadata = {
// 	title: 'Sistema de Gestión de Calidad',
// 	description: 'Sistema de Gestión de Calidad'
// }

export default function RootLayout({ children }: { children: ReactNode }) {
	const { setYear, setSemester } = useYearSemesterStore()
	const { setPermissions, setRole } = usePermissionsStore()
	const [redirected, setRedirected] = useState(false)
	const router = useRouter()

	useEffect(() => {
		if (typeof window !== 'undefined' && window.localStorage) {
			const yearString = localStorage.getItem('year')
			const semesterString = localStorage.getItem('semester')
			const authUser = localStorage.getItem('auth_user')
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
			if (authUser) {
				const jsonAuthUser = JSON.parse(authUser)
				const role = jsonAuthUser.role
				setRole(role)
				if (role === 'administrador') {
					setPermissions({
						createStandard: true,
						readStandard: true,
						updateStandard: true,
						deleteStandard: true,
						createPlan: true,
						readPlan: true,
						updatePlan: true,
						deletePlan: true,
						createEvidence: true,
						readEvidence: true,
						updateEvidence: true,
						deleteEvidence: true,
						createUser: true,
						readUser: true,
						updateUser: true,
						deleteUser: true
					})
				} else if (role === 'docente') {
					setPermissions({
						createStandard: false,
						readStandard: true,
						updateStandard: false,
						deleteStandard: false,
						createPlan: true,
						readPlan: true,
						updatePlan: true,
						deletePlan: true,
						createEvidence: true,
						readEvidence: true,
						updateEvidence: true,
						deleteEvidence: true,
						createUser: false,
						readUser: true,
						updateUser: false,
						deleteUser: false
					})
				}
			}
			if (!authUser && !redirected) {
				setRedirected(true)
				router.push('/auth/login')
			}
		}
	}, [])

	return (
		<html lang='es'>
			<body>
				<Providers>
					<main>{children}</main>
				</Providers>
			</body>
		</html>
	)
}
