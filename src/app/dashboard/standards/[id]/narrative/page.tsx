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
import EnableNarrativeModal from '@/components/Modal/Narrative/EnableNarrativeModal'
import { useNarrativeStore } from '@/store/useNarrativeStore'
import { useToast } from '@/hooks/toastProvider'

type NarrativePageParams = {
	params: {
		id: string
	}
}

export default function NarrativePage({ params }: NarrativePageParams) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const { year, semester } = useYearSemesterStore()
	const { isNarrativeBlock, setNarrativeEnabled } = useNarrativeStore()
	const [narrative, setNarrative] = useState<string>('')
	const [isEditable, setIsEditable] = useState<boolean>(false)
	const [isEditMode, setIsEditMode] = useState<boolean>(false)
	const [openModal, setOpenModal] = useState<boolean>(false)
	const [refresh, setRefresh] = useState<boolean>(false)
	const [data, setData] = useState<any>({})
	const id = Number(params.id)
	const router = useRouter()
	const { showToast, updateToast } = useToast()

	const DeleteNarrativeModal = dynamic(() => import('@/components/Modal/Narrative/DeleteNarrativeModal'), {
		ssr: false
	})

	useEffect(() => {
		if (year && semester) {
			NarrativeService.getNarrative(id).then((res) => {
				setData(res.data)
				setIsEditable(res.data.narrative_is_active)
				setIsEditMode(res.data.narrative_is_active)
				setNarrativeEnabled(res.data.narrative_is_active)
				setNarrative(res.data.narrative)
			}).catch((err: any) => {
				console.log('err de getNarrative', err)
			})
		}
		setRefresh(false)
	}, [year, semester, isNarrativeBlock, refresh])

	const handleEditNarrative = async () => {
		await NarrativeService.blockNarrative(String(id)).then((res) => {
			if (res.data.is_block && res.data.is_same_user) {
				router.push(`/dashboard/standards/${id}/narrative/edit`)
			} else if (res.data.is_block && !res.data.is_same_user) {
				const notification = showToast('verificando')
				updateToast(notification, `La narrativa ya esta siendo editada por ${res.data.user_name}`, 'info')
			}
		}).catch((err: any) => {
			console.log('err de blockNarrative', err)
		})
		setRefresh(true)
	}

	const createMarkup = () => {
		return { __html: narrative || '' }
	}

	const handleOnValueChange = () => {
		setOpenModal(true)
		setIsEditable(true)
	}

	const handleConfirmation = () => {
		setOpenModal(false)
		setIsEditMode(true)
		setIsEditable(true)
	}

	const handleCancel = () => {
		setOpenModal(false)
		setIsEditable(false)
		setIsEditMode(false)
	}

	return (
		<div className='w-[96%] h-full bg-white m-auto flex flex-col gap-5 rounded-md'>
			<div className='p-4 w-full'>
				<div className='my-4 flex flex-row w-full justify-between items-center'>
					<h3 className='text-2xl text-sky-600 font-semibold'>Narrativa</h3>
					{ data.isManager && (<>
						{data.isBlock && (<Popover showArrow placement='bottom' className='w-[280px]'>
							<PopoverTrigger>
								<div>
									<Badge content='' color='success' shape='circle' placement='bottom-right'>
										<Avatar
											showFallback
											isBordered
											color='primary'
											size='sm'
											radius='full'
											name={data.block_user.user_name}
											src={data.block_user.user_avatar}
										/>
									</Badge>
								</div>
							</PopoverTrigger>
							<PopoverContent className='p-1'>
								<Card shadow='none' className='max-w-[300px] border-none bg-transparent'>
									<CardHeader className='justify-between'>
										<div className='flex gap-2 mr-2'>
											<Avatar isBordered showFallback radius='full' size='md' src={data.block_user.user_avatar} name={data.block_user.user_name} />
											<div className='flex flex-col items-start justify-center'>
												<h4 className='text-small font-semibold leading-none text-default-600'>{data.block_user.user_name}</h4>
												<h5 className='text-small tracking-tight text-default-500'>{data.block_user.user_email}</h5>
											</div>
										</div>
										<div className='flex flex-col items-end gap-1'>
											<span className='text-tiny text-default-500'>Estado</span>
											<Chip color='success' size='sm' variant='flat' className='text-tiny'>
												{'Editando'}
											</Chip>
										</div>
									</CardHeader>
								</Card>
							</PopoverContent>
						</Popover>)}
						<div className='flex flex-row gap-2 items-center'>
							<Switch color='primary' isSelected={isEditable} onValueChange={handleOnValueChange} isDisabled={isEditable} className={isEditMode ? 'hidden' : 'block'}>
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
									<DeleteNarrativeModal id={id} isOpen={isOpen} onOpenChange={onOpenChange} onDelete={() => setRefresh(true)} />
								</>
							)}
						</div></>)}
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
			{openModal && <EnableNarrativeModal id={params.id} isOpen={openModal} onConfirmation={handleConfirmation} onCancel={handleCancel} />}
		</div>
	)
}