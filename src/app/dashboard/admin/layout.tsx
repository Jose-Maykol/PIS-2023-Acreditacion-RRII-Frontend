import { Metadata } from 'next'
import { FC, ReactNode } from 'react'

interface RootLayoutProps {
	children: ReactNode
}

export const metadata: Metadata = {
	title: 'Sistema de Gestión de Calidad',
	description: 'Sistema de Gestión de Calidad'
}

const AdminLayout: FC<RootLayoutProps> = ({ children }) => {
	return (
		<>
			{children}
		</>
	)
}

export default AdminLayout