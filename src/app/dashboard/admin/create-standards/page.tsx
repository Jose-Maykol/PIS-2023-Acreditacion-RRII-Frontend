'use client'

import CreateStandardContainer from '@/components/Container/CreateStandardContainer'
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import ReportIcon from '@/components/Icons/ReportIcon'
import AdminRolePage from '@/components/Role/AdminRolePage'

export default function CreateStandardPage() {
	return (
		<AdminRolePage>
			<div className='h-full bg-gray-100 flex-col'>
				<ContentWrapper className='bg-lightBlue-600 p-5 h-[300px]'>
					<div className='flex items-center gap-2 pt-16 pl-6'>
						<ReportIcon width={40} height={40} fill='fill-white'/>
						<div className='text-white'>
							<h1 className='text-xl font-bold uppercase' >Panel de administrador</h1>
							<p className='text-base'>Aqui se muestran las opciones de administrador</p>
						</div>
					</div>
				</ContentWrapper>
				<ContentWrapper className='bg-white -top-24 m-auto w-[96%] rounded-md p-6 flex-1'>
					<h3 className='text-xl font-semibold uppercase'>Crear estandares</h3>
					<div className='flex flex-col justify-between gap-8 my-2'>
						<CreateStandardContainer />
					</div>
				</ContentWrapper>
			</div>
		</AdminRolePage>
	)
}