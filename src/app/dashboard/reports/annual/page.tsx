'use client'

import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import { Input, Tooltip } from '@nextui-org/react'

export default function AnnualReportPage() {
	return (
		<div
			className='h-full py-10 px-20 '
			style={{ background: 'linear-gradient(to bottom, #F5F6F7 50%, #3982C2 50%)' }}
		>
			<h1 className='text-center text-xl font-extrabold uppercase mb-7'>Reporte Anual RRII</h1>

			<ContentWrapper className='bg-white rounded-md my-10'>
				<div className='py-10 px-10'>
					<h1 className='text-md font-extrabold uppercase mb-3'>Datos del Personal Docente</h1>
				</div>

				<form>
					<TeachingStaffFields />
				</form>
			</ContentWrapper>
		</div>
	)
}

const TeachingStaffFields = () => {
	return (
		<div className='flex flex-col gap-y-5 mx-10'>
			<div className='flex items-center'>
				<label
					className='text-default-600 text-sm whitespace-nowrap mr-3'
					style={{ fontWeight: '900' }}
				>
					Número de docentes extraordinarios:
				</label>
				<Input id='docents_number' name='docents_number' size='sm' type='number' className='w-16' />
			</div>

			<div>
				<Tooltip
					color='foreground'
					placement='top-start'
					content='Ingrese el número para cada situación'
					closeDelay={100}
				>
					<h2 className='mb-3' style={{ fontWeight: 'bold' }}>
						Docentes Ordinarios
					</h2>
				</Tooltip>

				<div className='grid grid-cols-3 gap-4'>
					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[60px]'>
							Principales:
						</label>
						<Input
							id='principals'
							name='principals'
							size='sm'
							type='number'
							className='w-16 ml-2'
						/>
					</div>

					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[60px]'>
							Dedicación exclusiva:
						</label>
						<Input
							id='exclusive_dedication'
							name='exclusive_dedication'
							size='sm'
							type='number'
							className='w-16 ml-2'
						/>
					</div>

					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[60px]'>
							Asociados:
						</label>
						<Input
							id='associates'
							name='associates'
							size='sm'
							type='number'
							className='w-16 ml-2'
						/>
					</div>

					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[60px]'>
							Tiempo completo:
						</label>
						<Input
							id='complete_time'
							name='complete_time'
							size='sm'
							type='number'
							className='w-16 ml-2'
						/>
					</div>

					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[60px]'>
							Auxiliares:
						</label>
						<Input id='auxiliars' name='auxiliars' size='sm' type='number' className='w-16 ml-2' />
					</div>

					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[60px]'>
							Tiempo parcial:
						</label>
						<Input
							id='partial_time'
							name='partial_time'
							size='sm'
							type='number'
							className='w-16 ml-2'
						/>
					</div>
				</div>
			</div>

			<div className='mb-10'>
				<Tooltip
					color='foreground'
					placement='top-start'
					content='Ingrese el número para cada situación'
					closeDelay={100}
				>
					<h2 className='mb-3' style={{ fontWeight: 'bold' }}>
						Docentes Contratados
					</h2>
				</Tooltip>
				<div className='grid grid-cols-3 gap-4'>
					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[130px]'>
							Tiempo completo:
						</label>
						<Input
							id='complete_time'
							name='complete_time'
							size='sm'
							type='number'
							className='w-16 ml-2'
						/>
					</div>

					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[130px]'>
							Tiempo parcial:
						</label>
						<Input
							id='partial_time'
							name='partial_time'
							size='sm'
							type='number'
							className='w-16 ml-2'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
