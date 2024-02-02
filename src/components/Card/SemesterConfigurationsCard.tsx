import { useRouter } from 'next/navigation'

import { Button, Chip, ChipProps, Spinner, Tooltip } from '@nextui-org/react'
import PencilIcon from '../Icons/PencilIcon'
import CloseIcon from '../Icons/CloseIcon'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useYearSemesterStore } from '@/store/useYearSemesterStore'
import DateSemesterService from '@/api/DateSemester/DateSemester'
import Link from 'next/link'
import { useQuery } from 'react-query'

const statusColorMap: Record<string, ChipProps['color']> = {
	completado: 'success',
	faltante: 'danger'
}

interface DateSemesterStatus {
	faculty_staff: string
	identification_context: string
	standards: string
}

export default function SemesterConfigurationsCard() {
	const router = useRouter()

	const { year, semester } = useYearSemesterStore()
	const [isCreateSemesterOpen, setCreateSemesterOpen] = useState(false)
	const [isEditSemesterOpen, setEditSemesterOpen] = useState(false)
	const [isCloseSemesterOpen, setCloseSemesterOpen] = useState(false)

	const CreateSemesterModal = dynamic(() => import('@/components/Modal/Panel/CreateSemesterModal'), { ssr: false })
	const EditSemesterModal = dynamic(() => import('@/components/Modal/Panel/EditSemesterModal'), { ssr: false })
	const CloseSemesterModal = dynamic(() => import('@/components/Modal/Panel/CloseSemesterModal'), { ssr: false })

	const handleCreateSemesterOpen = () => {
		setCreateSemesterOpen(true)
		setEditSemesterOpen(false)
		setCloseSemesterOpen(false)
	}

	const handleEditSemesterOpen = () => {
		setCreateSemesterOpen(false)
		setEditSemesterOpen(true)
		setCloseSemesterOpen(false)
	}

	const handleCloseSemesterOpen = () => {
		setCloseSemesterOpen(true)
		setCreateSemesterOpen(false)
		setEditSemesterOpen(false)
	}

	const { data: dateSemesterStatus, isLoading } = useQuery(
		['dateSemesterStatus', year, semester],
		() => DateSemesterService.status(), {
			retry: 2,
			staleTime: Infinity
		}
	)

	if (isLoading) {
		return (
			<div className='flex justify-center content-center rounded-lg p-4 border border-lightBlue-600 border-dashed w-full min-w-[320px] h-[300px]'>
				<Spinner/>
			</div>
		)
	}

	return (
		<div className='flex-1 rounded-lg p-4 border border-lightBlue-600 border-dashed w-full min-w-[300px] max-h-[300px]'>
			<div className='flex flex-row justify-between items-center w-full'>
				<h2 className='text-lg font-semibold text-lightBlue-600'>Configurar semestre actual</h2>
				<Button
					color='primary'
					onPress={handleCreateSemesterOpen}
				>
					Crear nuevo semestre
				</Button>
				<CreateSemesterModal isOpen={isCreateSemesterOpen} onOpenChange={setCreateSemesterOpen}/>
			</div>
			<div className='pt-4 flex justify-between items-center gap-4'>
				<p>{year} - {semester}</p>
				<div>
					<Tooltip content='Editar semestre'>
						<Button
							isIconOnly
							startContent={<PencilIcon width={16} height={16} fill='fill-lightBlue-600'/>}
							onPress={handleEditSemesterOpen}/>
					</Tooltip>
					<EditSemesterModal isOpen={isEditSemesterOpen} onOpenChange={setEditSemesterOpen}/>
					<Tooltip content='Cerrar semestre'>
						<Button
							isIconOnly
							startContent={<CloseIcon width={18} height={18} fill='fill-red-500'/>}
							onPress={handleCloseSemesterOpen}
						/>
					</Tooltip>
					<CloseSemesterModal isOpen={isCloseSemesterOpen} onOpenChange={setCloseSemesterOpen}/>
				</div>
			</div>
			<div className='pt-4 flex flex-col gap-4'>
				<div className='flex flex-row justify-between w-full items-center'>
					<p>Creación de estándares</p>
					<div className='flex flex-row gap-2 items-center'>
						<Chip className='capitalize' color={statusColorMap[dateSemesterStatus.data.standards]} size='sm' variant='flat'>{dateSemesterStatus.data.standards}</Chip>
						<Tooltip content='Crear estándares'>
							{dateSemesterStatus.data.standards === 'completado'
								? (
									<Button
										isIconOnly
										isDisabled
										startContent={<PencilIcon width={16} height={16} fill='fill-lightBlue-600'/>}
									/>
								)
								: (
									<Link
										className='px-2'
										href='/dashboard/admin/create-standards'
									>
										<PencilIcon width={16} height={16} fill='fill-lightBlue-600'/>
									</Link>
								)
							}
						</Tooltip>
					</div>
				</div>
				<div className='flex flex-row justify-between w-full items-center'>
					<p>Datos indentificación y contexto</p>
					<div className='flex flex-row gap-2 items-center'>
						<Chip className='capitalize' color={statusColorMap[dateSemesterStatus.data.identification_context]} size='sm' variant='flat'>{dateSemesterStatus.data.identification_context}</Chip>
						<Tooltip content='Editar datos de indentificación y contexto'>
							<Button
								isIconOnly
								startContent={<PencilIcon width={16} height={16} fill='fill-lightBlue-600'/>}
								onPress={() => router.push('/dashboard/reports/identification-and-context')}
							/>
						</Tooltip>
					</div>
				</div>
				<div className='flex flex-row justify-between w-full items-center'>
					<p>Datos personal docente</p>
					<div className='flex flex-row gap-2 items-center'>
						<Chip className='capitalize' color={statusColorMap[dateSemesterStatus.data.faculty_staff]} size='sm' variant='flat'>{dateSemesterStatus.data.faculty_staff}</Chip>
						<Tooltip content='Editar datos personal docente'>
							<Button
								isIconOnly
								startContent={<PencilIcon width={16} height={16} fill='fill-lightBlue-600'/>}
								onPress={() => router.push('/dashboard/reports/annual')}
							/>
						</Tooltip>
					</div>
				</div>
			</div>
		</div>
	)
}