import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import { Metadata } from 'next'
import { FC, ReactNode } from 'react'

interface RootLayoutProps {
	children: ReactNode
}

export const metadata: Metadata = {
	title: 'Sistema de Gestión de Calidad',
	description: 'Sistema de Gestión de Calidad'
}

const UserLayout: FC<RootLayoutProps> = ({ children }) => {
	return (
		<div className='h-full'>
			<ContentWrapper className='bg-lightBlue-600 p-5 h-[300px]'>
				<div className='flex items-center gap-1 pt-16 pl-8'>
					<div className='text-white'>
						<h1 className='uppercase text-2xl font-bold'>administración de usuarios</h1>
						<p className='text-lg'>Sección de usuarios del sistema</p>
					</div>
				</div>
			</ContentWrapper>
			{children}
		</div>
	)
}

export default UserLayout
