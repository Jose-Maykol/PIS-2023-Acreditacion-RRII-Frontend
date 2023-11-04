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
			<ContentWrapper className='flex flex-col bg-lightBlue-600 p-5 h-[290px]'>
				<div className='grow items-center gap-1 pl-8'>
					<div className='uppercase text-white'>
						<h1 className='my-5 font-BebasNeue text-h1 '>administración de usuarios</h1>
						<p className='my-2.5 mb-2 font-BebasNeue text-h3'>Sección de usuarios del sistema</p>
					</div>
					<hr className='my-6 w-full'></hr>
				</div>
			</ContentWrapper>
			{children}
		</div>
	)
}

export default UserLayout
