/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable eqeqeq */
import { Button, Select, SelectItem, Selection } from '@nextui-org/react'
import { Editor } from '@tinymce/tinymce-react'
import { useEffect, useRef, useState } from 'react'
import CloseIcon from '../Icons/CloseIcon'
import SaveIcon from '../Icons/SaveIcon'
import { useYearSemesterStore } from '@/store/useYearSemesterStore'
import { NarrativeService } from '@/api/Narrative/narrativeService'
import { toast } from 'react-toastify'
import { StandardService } from '@/api/Estandar/StandardService'
import { TINY_API_KEY } from '../../../config'

interface NarrativeEditorProps {
  id: number
  content: string
  handleEditNarrative: () => void
}

export default function NarrativeEditor({ id, content, handleEditNarrative }: NarrativeEditorProps) {
	const editorRef = useRef<any>(null)
	const [evidences, setEvidences] = useState<{ value: string, label: string, type: string }[]>([])
	const [evidenceSelected, setEvidenceSelected] = useState<Selection>(new Set([]))
	const { year, semester } = useYearSemesterStore()

	const handleSaveNarrative = () => {
		const notification = toast.loading('Procesando...')
		const contentNarrative = {
			narrative: editorRef.current?.getContent() as string
		}
		if (year && semester) {
			NarrativeService.updateNarrative(year, semester, id, contentNarrative).then((res) => {
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
		handleEditNarrative()
	}

	useEffect(() => {
		StandardService.getEvidences(id.toString()).then((res) => {
			setEvidences(res.data)
		})
	}, [])

	const insertEvidence = () => {
		const evidenceId = (evidenceSelected as any).values().next().value
		console.log(evidences)
		const evidenceLabel = evidences.find((evidence) => evidence.value == evidenceId)?.label
		console.log(evidenceId, evidenceLabel)
		const evidenceToInsert = `<a href="/evidences/${evidenceId}/view" style="color: blue; cursor: pointer">${evidenceLabel}</a>`
		const editor = editorRef.current
		if (editor) {
			editor.setContent(editor.getContent() + evidenceToInsert)
		}
	}

	const handleEvidenceSelected = (value: Selection): void => {
		console.log('evidence', value)
		setEvidenceSelected(value)
	}

	return (
		<div className='min-h-[600px]'>
			<div className='flex flex-row py-4 w-full items-end'>
				<Select
					placeholder='Selecciona una evidencia'
					label='Insertar evidencia'
					labelPlacement='outside'
					variant='bordered'
					className='w-full'
					onSelectionChange={handleEvidenceSelected}
				>
					{evidences?.map((evidence) => (
						<SelectItem key={evidence.value} value={evidence.value}>
							{evidence.label}
						</SelectItem>
					))}
				</Select>
				<Button
					color='primary'
					className='ml-2'
					onPress={insertEvidence}>
					Insertar
				</Button>
			</div>
			<div className='h-[600px]'>
				<Editor
					apiKey={TINY_API_KEY}
					onInit={(evt, editor) => { editorRef.current = editor }}
					initialValue={content}
					init={{
						height: 600,
						menubar: true,
						language: 'es',
						plugins: 'anchor link image lists table powerpaste',
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
					onPress={handleEditNarrative}>
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