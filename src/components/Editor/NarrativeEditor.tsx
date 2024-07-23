/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable eqeqeq */
import { Button } from '@nextui-org/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import CloseIcon from '../Icons/CloseIcon'
import SaveIcon from '../Icons/SaveIcon'
import { useYearSemesterStore } from '@/store/useYearSemesterStore'
import { NarrativeService } from '@/api/Narrative/narrativeService'
import { StandardService } from '@/api/Estandar/StandardService'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/toastProvider'
import { useNarrativeStore } from '@/store/useNarrativeStore'
import { useSidebarStore } from '@/store/useSidebarStore'
import ArrowIcon from '../Icons/ArrowIcon'

interface Evidence {
  value: string
  label: string
  type: string
}

interface NarrativeEditorProps {
	id: number
}

export default function NarrativeEditor({ id } : NarrativeEditorProps) {
	const editorRef = useRef<any>(null)
	const router = useRouter()
	const [content, setContent] = useState<string>('')
	const [documentId, setDocumentId] = useState<string>('')
	const [evidences, setEvidences] = useState<Evidence[]>([])
	const { year, semester } = useYearSemesterStore()
	const { showToast, updateToast } = useToast()
	const { evidenceNarrative, setEvidenceNarrative, setIsEditingNarrative, setNarrativeBlockedId } = useNarrativeStore()
	const { toggleSidebar } = useSidebarStore()


	const loadNarrative = useMemo(() => {
		return (id: number) => {
			NarrativeService.getNarrative(id).then((res) => {
				setContent(res.data.narrative)
				setDocumentId(res.data.document_id)
			})
		}
	}, [])

	useEffect(() => {
		if (year && semester) {
			loadNarrative(id)
		}
		toggleSidebar(true)
	}, [year, semester, loadNarrative])

	const handleGoBackPage = () => {
		NarrativeService.unlockNarrative(String(id)).then(() => {
			setIsEditingNarrative(false)
			router.push(`/dashboard/standards/${id}/narrative`)
			const notification = showToast('Procesando...')
			updateToast(notification, 'Se ha liberado la narrativa', 'success')
		})
		// toggleSidebar(false)
	}

	const handleSaveNarrative = () => {
		const notification = showToast('Procesando...')
		const contentNarrative = {
			narrative: editorRef.current?.getContent() as string
		}
		if (year && semester) {
			NarrativeService.updateNarrative(String(id), contentNarrative).then((res) => {
				if (res.status === 1) {
					updateToast(notification, res.message, 'success')
				} else {
					updateToast(notification, res.message, 'error')
				}
			})
			router.push(`/dashboard/standards/${id}/narrative`)
		}
		setIsEditingNarrative(false)
		// toggleSidebar(false)
	}

	useEffect(() => {
		StandardService.getEvidences(id.toString()).then((res) => {
			setEvidences(res.data)
		})
		setIsEditingNarrative(true)
		setNarrativeBlockedId(id)
	}, [])

	useEffect(() => {
		if (evidenceNarrative) {
			insertEvidence()
		}
	}, [evidenceNarrative])

	const insertEvidence = () => {
		if (evidenceNarrative && evidenceNarrative.evidence_code) {
			const evidenceToInsert = `<a href="/evidences/${evidenceNarrative.evidence_id}" style="color: blue; text-decoration: none" target="_blank">${evidenceNarrative.evidence_code}</a>`
			const editor = editorRef.current
			if (editor) {
				editor.insertContent(evidenceToInsert)
				editor.focus()
			}
		}
		setEvidenceNarrative(null)
	}

	return (
		<div className='min-h-[600px]'>
			<div className='h-[600px]'>
				<iframe
					className='w-full h-[600px]'
					src={`https://docs.google.com/document/d/${documentId}/edit`}>
				</iframe>
			</div>
			<div className='flex flex-row w-full justify-end gap-2 pt-4'>
				<Button
					color='danger'
					startContent={<ArrowIcon width={15} height={15} fill='fill-white'/>}
					className='text-white'
					onPress={handleGoBackPage}>
						Retroceder
				</Button>
			</div>
		</div>
	)
}