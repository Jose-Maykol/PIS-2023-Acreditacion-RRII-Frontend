/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable eqeqeq */
import { Button } from '@nextui-org/react'
import { Editor } from '@tinymce/tinymce-react'
import { Key, useEffect, useMemo, useRef, useState } from 'react'
import CloseIcon from '../Icons/CloseIcon'
import SaveIcon from '../Icons/SaveIcon'
import { useYearSemesterStore } from '@/store/useYearSemesterStore'
import { NarrativeService } from '@/api/Narrative/narrativeService'
import { TINY_API_KEY } from '../../../config'
import { StandardService } from '@/api/Estandar/StandardService'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/toastProvider'
import { useNarrativeStore } from '@/store/useNarrativeStore'
import { useSidebarStore } from '@/store/useSidebarStore'

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
	const [evidences, setEvidences] = useState<Evidence[]>([])
	const { year, semester } = useYearSemesterStore()
	const { showToast, updateToast } = useToast()
	const { evidenceNarrative, setEvidenceNarrative, setIsEditingNarrative, setNarrativeBlockedId } = useNarrativeStore()
	const { toggleSidebar } = useSidebarStore()


	const loadNarrative = useMemo(() => {
		return (id: number) => {
			NarrativeService.getNarrative(id).then((res) => {
				setContent(res.data.narrative)
			})
		}
	}, [])

	useEffect(() => {
		if (year && semester) {
			loadNarrative(id)
		}
		toggleSidebar(true)
	}, [year, semester, loadNarrative])

	const handleNotSaveNarrative = () => {
		NarrativeService.unlockNarrative(String(id)).then((res) => {
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
			const evidenceToInsert = `<span>(<a href="/evidences/${evidenceNarrative.evidence_id}" style="color: blue; text-decoration: none" target="_blank">${evidenceNarrative.evidence_code}</a>)</span>`
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
				<Editor
					apiKey={TINY_API_KEY}
					onInit={(evt, editor) => { editorRef.current = editor }}
					initialValue={content}
					init={{
						height: 600,
						menubar: true,
						language: 'es',
						plugins: 'anchor link image lists table',
						toolbar: 'undo redo | fontfamily fontsize | bold italic underline forecolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent removeformat',
						content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
					}}
				/>
			</div>
			<div className='flex flex-row w-full justify-end gap-2 pt-4'>
				<Button
					color='danger'
					startContent={<CloseIcon width={15} height={15} fill='fill-white'/>}
					className='text-white'
					onPress={handleNotSaveNarrative}>
						Cancelar
				</Button>
				<Button
					color='success'
					startContent={<SaveIcon width={15} height={15} fill='fill-white'/>}
					className='text-white'
					onPress={handleSaveNarrative}>
						Guardar
				</Button>
			</div>
		</div>
	)
}