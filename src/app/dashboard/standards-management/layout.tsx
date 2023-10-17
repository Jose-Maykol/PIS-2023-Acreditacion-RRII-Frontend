import type { ReactNode, FC } from 'react'
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'


interface RootLayoutProps {
    children: ReactNode
}

const StandardsLayout: FC<RootLayoutProps> = ({ children }) => {
	return (
		<div className='h-full'>
			<ContentWrapper className='bg-lightBlue-600 p-5 h-[300px]'>
				<div className='flex items-center gap-1 pt-16 pl-8'>
					<div className='text-white'>
						<h1>administracion de estandares</h1>
						<p className='text-lg'>seccion de asignacion de responsables de los estandares</p>
					</div>
				</div>
			</ContentWrapper>
			{children}
		</div>
	)
}

export default StandardsLayout