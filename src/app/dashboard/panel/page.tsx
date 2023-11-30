'use client'

import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import BoardIcon from '@/components/Icons/BoardIcon'
import CloseIcon from '@/components/Icons/CloseIcon'
import PencilIcon from '@/components/Icons/PencilIcon'
import PlusIcon from '@/components/Icons/PlusIcon'
import EditSemeterModal from '@/components/Modal/Panel/EditSemesterModal'
import { Button, Checkbox, CheckboxGroup, useDisclosure } from '@nextui-org/react'

export default function PanelPage() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	return (
		<div className='h-screen bg-gray-100 flex-col'>
			<ContentWrapper className='bg-lightBlue-600 p-5 h-[300px]'>
				<div className='flex items-center gap-2 pt-16 pl-6'>
					<BoardIcon width={40} height={40} fill='fill-white'/>
					<div className='text-white'>
						<h1 className='text-xl font-bold uppercase' >Panel de administrador</h1>
						<p className='text-base'>Aqui se muestran las acciones que puede realizar un administrador</p>
					</div>
				</div>
			</ContentWrapper>
			<ContentWrapper className='bg-white -top-24 m-auto w-[90%] rounded-md p-6 flex-1'>
				<h3 className='text-xl font-semibold uppercase'>Acciones a realizar</h3>
				<div className='py-8 px-4 w-full'>
					<div className='flex flex-row gap-4'>
						<div className='flex flex-col gap-4 max-w-[700px]'>
							<div className='flex-1 bg-lightBlue-200 opacity-70 rounded-lg p-4'>
								<h2 className='text-lightBlue-600 font-bold'>Editar semestre</h2>
								<p>Al editar el semestre, usted puede modificar la fecha de cierre del mismo, ¿Desear editar el semestre?</p>
								<div className='pt-4 flex justify-center'>
									<Button
										color='primary'
										startContent={<PencilIcon width={20} height={20} fill='fill-white'/>}
										className='w-[200px] font-bold'
										onPress={onOpen}
									>
										Editar semestre
									</Button>
									<EditSemeterModal isOpen={isOpen} onOpenChange={onOpenChange}/>
								</div>
							</div>
							<div className='flex-1 bg-red-100 opacity-70 rounded-lg p-4'>
								<h2 className='text-red-600 font-bold'>Cerrar semestre</h2>
								<p>Al cerrar semestre, se prohibira subir más archivos hasta la fecha que usted indique, ¿Desear cerrar el semestre?</p>
								<div className='pt-4 flex justify-center'>
									<Button
										color='danger'
										startContent={<CloseIcon width={20} height={20} fill='fill-white'/>}
										className='w-[200px] font-bold'
									>
										Cerrar semestre
									</Button>
								</div>
							</div>
							<div className='flex-1 bg-green-100 opacity-70 rounded-lg p-4'>
								<h2 className='text-green-600 font-bold'>Crear semestre</h2>
								<p>Al crear semestre, se creara un nuevo periodo con nuevos datos, ¿Desear crear un nuevo semestre?</p>
								<div className='pt-4 flex justify-center'>
									<Button
										color='success'
										className='text-white w-[200px] font-bold'
										startContent={<PlusIcon width={20} height={20} fill='fill-white'/>}
									>
										Crear semestre
									</Button>
								</div>
							</div>
						</div>
						<div className='flex-1 bg-lightBlue-200 opacity-70 rounded-lg p-4 min-w-[400px]'>
							<div className='p-4'>
								<h2 className='font-bold uppercase text-lg text-lightBlue-600 pb-4'>Generar reportes</h2>
								<CheckboxGroup
									color='primary'
								>
									<div className='flex flex-row justify-between'>
										<p>Reporte de listado de evidencias</p>
										<Checkbox value='reporte-evidencias'/>
									</div>
									<div className='flex flex-row justify-between'>
										<p>Reporte de narrativas</p>
										<Checkbox value='reporte-narrativas'/>
									</div>
									<div className='flex flex-row justify-between'>
										<p>Resumen de plan de mejora</p>
										<Checkbox value='reporte-plan-mejora'/>
									</div>
								</CheckboxGroup>
								<div className='pt-12 pb-2 flex justify-end'>
									<Button
										color='primary'
										className='text-white font-bold'
									>
										Generar
									</Button>
								</div>
							</div>
							<hr className='my-4 w-full'></hr>
							<div className='p-4'>
								<h2 className='font-bold uppercase text-lg text-lightBlue-600 pb-4'>Generar informes</h2>
								<CheckboxGroup
									color='primary'
								>
									<div className='flex flex-row justify-between'>
										<p>Reporte de identificación y contexto</p>
										<Checkbox value='reporte-identificacion-contexto'/>
									</div>
									<div className='flex flex-row justify-between'>
										<p>Datos reporte anual RRII</p>
										<Checkbox value='reporte-anual-rrii'/>
									</div>
								</CheckboxGroup>
								<div className='pt-12 pb-2 flex justify-end'>
									<Button
										color='primary'
										className='text-white font-bold'
									>
										Generar
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</ContentWrapper>
		</div>
	)
}