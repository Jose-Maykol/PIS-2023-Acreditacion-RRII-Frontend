/* eslint-disable no-return-assign */
'use client'

import PencilIcon from '@/components/Icons/PencilIcon'
import TrashIcon from '@/components/Icons/TrashIcon'
import { Button, useDisclosure } from '@nextui-org/react'
import { useEffect, useMemo, useState } from 'react'
import { NarrativeService } from '@/api/Narrative/narrativeService'
import { useYearSemesterStore } from '@/store/useYearSemesterStore'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

type NarrativePageParams = {
	params: {
		id: string
	}
}

export default function NarrativePage({ params }: NarrativePageParams) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const { year, semester } = useYearSemesterStore()
	const [narrative, setNarrative] = useState<string>('')
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
	}, [year, semester, loadNarrative])

	const handleEditNarrative = () => {
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
					<div className='flex flex-row gap-2 items-center'>
						{(data.isManager || data.isAdministrator) && (
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
					</div>
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
		</div>
	)
}