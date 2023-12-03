'use client'

import { useState } from 'react'
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import BoardIcon from '@/components/Icons/BoardIcon'
import CloseIcon from '@/components/Icons/CloseIcon'
import PencilIcon from '@/components/Icons/PencilIcon'
import PlusIcon from '@/components/Icons/PlusIcon'
import CreateSemesterModal from '@/components/Modal/Panel/CreateSemesterModal'
import EditSemesterModal from '@/components/Modal/Panel/EditSemesterModal'
import { Button, useDisclosure } from '@nextui-org/react'

export default function PanelPage() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [isCreateSemesterOpen, setCreateSemesterOpen] = useState(false)
	const [isEditSemesterOpen, setEditSemesterOpen] = useState(false)

	const handleCreateSemesterOpen = () => {
		setCreateSemesterOpen(true)
		setEditSemesterOpen(false)
	}

	const handleEditSemesterOpen = () => {
		setCreateSemesterOpen(false)
		setEditSemesterOpen(true)
	}

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
				<h3 className='text-xl font-semibold uppercase'>Acciones</h3>
				<div className='py-8 px-4 w-full'>
					<div className='flex flex-row gap-4'>
						<div className='flex flex-col gap-4 max-w-[700px]'>
							<div className='flex-1 opacity-70 rounded-lg p-4 border border-lightBlue-600 border-dashed'>
								<h2 className='font-bold text-lg'>Configurar semestre</h2>
								<p className='my-3'>Usted puede configurar el semestre actual, crear un nuevo semestre o cerrar el semestre actual</p>
								<div className='pt-4 flex justify-center gap-4'>
									<Button
										color='success'
										className='w-[150px] h-[150px] font-bold p-4 text-white'
										onPress={handleCreateSemesterOpen}
									>
										<div className='flex gap-4 flex-col items-center justify-center'>
											<PlusIcon width={35} height={35} fill='fill-white'/>
											<p>Crear semestre</p>
										</div>
									</Button>
									<CreateSemesterModal isOpen={isCreateSemesterOpen} onOpenChange={setCreateSemesterOpen}/>
									<Button
										color='primary'
										className='w-[150px] h-[150px] font-bold p-4'
										onPress={handleEditSemesterOpen}
									>
										<div className='flex gap-4 flex-col items-center justify-center'>
											<PencilIcon width={35} height={35} fill='fill-white'/>
											<p>Editar semestre</p>
										</div>
									</Button>
									<EditSemesterModal isOpen={isEditSemesterOpen} onOpenChange={setEditSemesterOpen}/>
									<Button
										color='danger'
										className='w-[150px] h-[150px] font-bold p-4'
										onPress={onOpen}
									>
										<div className='flex gap-4 flex-col items-center justify-center'>
											<CloseIcon width={40} height={40} fill='fill-white'/>
											<p>Cerrar semestre</p>
										</div>
									</Button>

								</div>
							</div>

						</div>
						<div className='flex-1 bg-lightBlue-200 opacity-70 rounded-lg p-4 min-w-[400px] flex justify-center items-center'>
							Disponible en la proxima actualizacion
						</div>
					</div>
				</div>
			</ContentWrapper>
		</div>
	)
}