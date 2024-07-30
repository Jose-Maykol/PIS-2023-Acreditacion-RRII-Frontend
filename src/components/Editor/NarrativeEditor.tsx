/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable eqeqeq */
import { Button, Spinner } from '@nextui-org/react'
import { useEffect, useMemo, useState } from 'react'
import { useYearSemesterStore } from '@/store/useYearSemesterStore'
import { NarrativeService } from '@/api/Narrative/narrativeService'
import { useRouter } from 'next/navigation'
import { useSidebarStore } from '@/store/useSidebarStore'
import ArrowIcon from '../Icons/ArrowIcon'

interface NarrativeEditorProps {
	id: number
}

export default function NarrativeEditor({ id }: NarrativeEditorProps) {
	const router = useRouter()
	const [documentId, setDocumentId] = useState<string>('')
	const { year, semester } = useYearSemesterStore()
	const [loading, setLoading] = useState<boolean>(true)
	const { toggleSidebar } = useSidebarStore()

	const loadNarrative = useMemo(() => {
		return (id: number) => {
			NarrativeService.getNarrative(id)
				.then((res) => {
					setDocumentId(res.data.document_id)
				})
				.finally(() => setLoading(false))
		}
	}, [])

	useEffect(() => {
		if (year && semester) {
			loadNarrative(id)
		}
		toggleSidebar(true)
	}, [year, semester, loadNarrative])

	const handleGoBackPage = () => {
		router.push(`/dashboard/standards/${id}/narrative`)
	}

	return (
		<div className='min-h-[600px]'>
			{loading ? (
				<div className='w-full h-[600px] flex items-center justify-center'>
					<Spinner label='Cargando narrativa' color='primary' labelColor='primary' />
				</div>
			) : (
				<div className='h-[600px]'>
					<iframe
						className='w-full h-[600px]'
						src={`https://docs.google.com/document/d/${documentId}/edit`}
					></iframe>
				</div>
			)}
			<div className='flex flex-row w-full justify-end gap-2 pt-4'>
				<Button
					color='danger'
					startContent={<ArrowIcon width={15} height={15} fill='fill-white' />}
					className='text-white'
					onPress={handleGoBackPage}
				>
					Retroceder
				</Button>
			</div>
		</div>
	)
}
