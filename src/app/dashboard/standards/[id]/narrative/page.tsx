/* eslint-disable no-return-assign */
'use client'

import PencilIcon from '@/components/Icons/PencilIcon'
import TrashIcon from '@/components/Icons/TrashIcon'
import { Button } from '@nextui-org/react'
import NarrativeEditor from '@/components/Editor/NarrativeEditor'
import { useEffect, useMemo, useState } from 'react'
import { NarrativeService } from '@/api/Narrative/narrativeService'
import { useYearSemesterStore } from '@/store/useYearSemesterStore'
import { toast } from 'react-toastify'

type NarrativePageParams = {
	params: {
		id: string
	}
}

export default function NarrativePage({ params }: NarrativePageParams) {
	const [editNarrative, setEditNarrative] = useState(false)
	const { year, semester } = useYearSemesterStore()
	const [narrative, setNarrative] = useState<string>('')
	const id = Number(params.id)

	const loadNarrative = useMemo(() => {
		return (id: number) => {
			NarrativeService.getNarrative(id).then((res) => {
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
		setEditNarrative(!editNarrative)
	}

	const deleteNarrative = () => {
		const notification = toast.loading('Procesando...')
		NarrativeService.deleteNarrative(id).then((res) => {
			if (res.status === 1) {
				toast.update(notification, {
					render: res.message,
					type: 'success',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					isLoading: false,
					theme: 'light'
				})
			} else {
				toast.update(notification, {
					render: res.message,
					type: 'error',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					isLoading: false,
					theme: 'light'
				})
			}
		})
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
						{ !editNarrative && (
							<>
								<Button
									color='primary'
									startContent={<PencilIcon width={15} height={15} fill='fill-white'/>}
									onPress={handleEditNarrative}>
								Editar
								</Button>
								<Button
									color='danger'
									isDisabled={narrative === ''}
									startContent={<TrashIcon width={15} height={15} fill='fill-white'/>}
									onPress={deleteNarrative}>
								Eliminar
								</Button>
							</>
						)}
					</div>
				</div>
				{editNarrative
					? (
						<NarrativeEditor id={id} content={narrative as string} handleEditNarrative={handleEditNarrative}/>
					)
					: (
						<div>
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
					)}
			</div>
		</div>
	)
}