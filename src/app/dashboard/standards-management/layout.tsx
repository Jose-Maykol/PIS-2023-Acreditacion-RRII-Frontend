import type { ReactNode, FC } from 'react'
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import { Metadata } from 'next'


interface RootLayoutProps {
    children: ReactNode
}

export const metadata: Metadata = {
	title: 'Sistema de Gestión de Calidad',
	description: 'Sistema de Gestión de Calidad'
}

const StandardsLayout: FC<RootLayoutProps> = ({ children }) => {
	return (
		<div className='h-full'>
			<ContentWrapper className='bg-lightBlue-600 p-5 h-[300px]'>
				<div className='flex items-center gap-1 pt-16 pl-8'>
					<div className='text-white'>
						<h1 className='uppercase text-2xl font-bold'>administracion de estándares</h1>
						<p className='text-lg'>Sección de asignación de responsables de los estándares</p>
					</div>
				</div>
			</ContentWrapper>
			{children}
		</div>
	)
}

export default StandardsLayout