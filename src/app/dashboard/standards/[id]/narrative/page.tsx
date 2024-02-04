/* eslint-disable no-return-assign */
'use client'

import PencilIcon from '@/components/Icons/PencilIcon'
import TrashIcon from '@/components/Icons/TrashIcon'
import { Button, useDisclosure, Switch, Avatar, Badge, Popover, PopoverTrigger, PopoverContent, Card, CardHeader, Chip } from '@nextui-org/react'
import { useEffect, useMemo, useState } from 'react'
import { NarrativeService } from '@/api/Narrative/narrativeService'
import { useYearSemesterStore } from '@/store/useYearSemesterStore'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import ConfirmationEditModal from '@/components/Modal/Narrative/ConfirmationEditModal'
import { useNarrativeStore } from '@/store/useNarrativeStore'

type NarrativePageParams = {
	params: {
		id: string
	}
}

export default function NarrativePage({ params }: NarrativePageParams) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const { year, semester } = useYearSemesterStore()
	const { isNarrativeEnabled, setIsEditingNarrative } = useNarrativeStore()
	const [narrative, setNarrative] = useState<string>('')
	const [isEditable, setIsEditable] = useState<boolean>(false)
	const [isEditMode, setIsEditMode] = useState<boolean>(false)
	const [openModal, setOpenModal] = useState<boolean>(false)
	const [data, setData] = useState<any>({})
	const id = Number(params.id)
	const router = useRouter()

	const DeleteNarrativeModal = dynamic(() => import('@/components/Modal/Narrative/DeleteNarrativeModal'), {
		ssr: false
	})

	const loadNarrative = useMemo(() => {
		return (id: number) => {
			NarrativeService.getNarrative(id).then((res) => {
				setData(res.data)
				setNarrative(res.data.narrative)
			})
		}
	}, [])

	useEffect(() => {
		if (year && semester) {
			loadNarrative(id)
		}
		setIsEditable(isNarrativeEnabled)
		setIsEditMode(isNarrativeEnabled)
	}, [year, semester, isNarrativeEnabled, loadNarrative])

	const handleEditNarrative = () => {
		setIsEditingNarrative(true)
		router.push(`/dashboard/standards/${id}/narrative/edit`)
	}

	const createMarkup = () => {
		return { __html: narrative || '' }
	}

	return (
		<div className='w-[96%] h-full bg-white m-auto flex flex-col gap-5 rounded-md'>
			<div className='p-4 w-full'>
				<div className='my-4 flex flex-row w-full justify-between items-center'>
					<h3 className='text-2xl text-sky-600 font-semibold'>Narrativa</h3>
					<Popover showArrow placement='bottom' className='w-[200px]'>
						<PopoverTrigger>
							<div>
								<Badge content='' color='success' shape='circle' placement='bottom-right'>
									<Avatar
										radius='full'
										src='https://i.pravatar.cc/150?u=a04258114e29026702d'
									/>
								</Badge>
							</div>
						</PopoverTrigger>
						<PopoverContent className='p-1'>
							<Card shadow='none' className='max-w-[300px] border-none bg-transparent'>
								<CardHeader className='justify-between'>
									<div className='flex gap-3'>
										<Avatar isBordered radius='full' size='md' src='https://i.pravatar.cc/150?u=a04258114e29026702d' />
										<div className='flex flex-col items-start justify-center'>
											<h4 className='text-small font-semibold leading-none text-default-600'>Zoey Lang</h4>
											<h5 className='text-small tracking-tight text-default-500'>@zoeylang</h5>
										</div>
									</div>
									<div className='flex flex-col items-end gap-1'>
										<span className='text-tiny text-default-500'>Estado</span>
										<Chip color='success' size='sm' variant='flat'>
											{'Activo'}
										</Chip>
									</div>
								</CardHeader>
							</Card>
						</PopoverContent>
					</Popover>
					{ data.isManager && (
						<div className='flex flex-row gap-2 items-center'>
							<Switch color='primary' isSelected={isEditable} onValueChange={handleOnValueChange} isDisabled={isEditable}>
								{isEditMode ? 'Habilitado' : 'Habilitar Narrativa'}
							</Switch>
							{isEditMode && (
								<>
									<Button
										color='primary'
										startContent={<PencilIcon width={15} height={15} fill='fill-white'/>}
										onPress={handleEditNarrative}
									>
									Editar
									</Button>
									<Button
										color='danger'
										isDisabled={narrative === ''}
										startContent={<TrashIcon width={15} height={15} fill='fill-white'/>}
										onPress={onOpen}>
										Eliminar
									</Button>
									<DeleteNarrativeModal id={id} isOpen={isOpen} onOpenChange={onOpenChange} onDelete={() => loadNarrative(id)} />
								</>
							)}
						</div>)}
				</div>
				{narrative
					? (
						<div className='flex flex-col items-start p-4 border rounded-md divide-gray-600 border-opacity-50 w-full min-h-[656px] outline-dashed outline-1' dangerouslySetInnerHTML={createMarkup()} />
					)
					: (
						<div className='flex flex-col items-center justify-center border rounded-md divide-gray-600 border-opacity-50 w-full min-h-[656px] outline-dashed outline-1 text-gray-400'>
							Aun no hay narrativa
						</div>
					)}
			</div>
			{openModal && <ConfirmationEditModal id={params.id} isOpen={openModal} onConfirmation={handleConfirmation} onCancel={handleCancel} />}
		</div>
	)
}