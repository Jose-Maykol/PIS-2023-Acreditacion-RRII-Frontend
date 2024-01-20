import { usePermissionsStore } from '@/store/usePermissionsStore'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

interface AdminRolePageProps {
  children: ReactNode;
}

export default function AdminRolePage ({ children } : AdminRolePageProps) {
	const { role } = usePermissionsStore()

	if (role !== 'administrador') {
		redirect('/dashboard')
	}

	return (
		<>
			{children}
		</>
	)
}