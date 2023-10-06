'use client'

import ContentWrapper from '@/components/atoms/ContentWrapper/ContentWrapper'
import StandardTable from '@/components/molecules/Tables/StandardTable'
import CustomModal from '@/components/atoms/Modal/CustomModal'

const page = () => {
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
			<ContentWrapper className='bg-white h-[670px] -top-24 w-[96%] m-auto rounded-md py-5 px-10'>
				<div className='flex w-full mb-5'>
					<h2>Encargados de estándares del sistema</h2>
				</div>
				<StandardTable />
			</ContentWrapper>
		</div>
	)
}

export default page