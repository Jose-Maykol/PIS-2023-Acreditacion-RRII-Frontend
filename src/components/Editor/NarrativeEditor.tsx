/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable eqeqeq */
import { Autocomplete, AutocompleteItem, Button } from '@nextui-org/react'
import { Key, useEffect, useMemo, useRef, useState } from 'react'
import CloseIcon from '../Icons/CloseIcon'
import SaveIcon from '../Icons/SaveIcon'
import { useYearSemesterStore } from '@/store/useYearSemesterStore'
import { NarrativeService } from '@/api/Narrative/narrativeService'
import { StandardService } from '@/api/Estandar/StandardService'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/toastProvider'
import { getFileIcon } from '@/utils/utils'
import ReactQuill from 'react-quill'
import 'quill/dist/quill.snow.css'

interface Evidence {
  value: string
  label: string
  type: string
}

interface NarrativeEditorProps {
	id: number
}

export default function NarrativeEditor({ id } : NarrativeEditorProps) {
	const quillRef = useRef<any>(null)
	const router = useRouter()
	const [content, setContent] = useState<string>('')
	const [evidences, setEvidences] = useState<Evidence[]>([])
	const [evidenceSelected, setEvidenceSelected] = useState<Key | null>(null)
	const { year, semester } = useYearSemesterStore()
	const { showToast, updateToast } = useToast()

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
	}, [year, semester, loadNarrative])

	const handleNotSaveNarrative = () => {
		router.push(`/dashboard/standards/${id}/narrative`)
	}

	const handleSaveNarrative = () => {
		const notification = showToast('Procesando...')
		const contentNarrative = content
		if (year && semester) {
			NarrativeService.updateNarrative(id, { narrative: contentNarrative }).then((res) => {
				if (res.status === 1) {
					updateToast(notification, res.message, 'success')
				} else {
					updateToast(notification, res.message, 'error')
				}
			})
			router.push(`/dashboard/standards/${id}/narrative`)
		}
	}

	useEffect(() => {
		StandardService.getEvidences(id.toString()).then((res) => {
			setEvidences(res.data)
		})
	}, [])

	const insertEvidence = () => {
		const evidenceId = evidenceSelected
		const evidenceLabel = evidences.find((evidence) => evidence.value == evidenceId)?.label

		console.log('evidenceLabel', evidenceLabel)

		const evidenceToInsert = `<a href="/evidences/${evidenceId}" style="color: blue;" target="_blank">${evidenceLabel}</a>`

		const quill = quillRef.current?.getEditor()

		console.log('quill', quill)
		if (quill) {
			const range = quill.getSelection(true)
			quill.clipboard.dangerouslyPasteHTML(range.index, evidenceToInsert)
			quill.setSelection(range.index + evidenceToInsert.length)
			quill.focus()
		}
	}

	const handleEvidenceSelected = (key: Key): void => {
		setEvidenceSelected(key)
	}

	const modules = {
		toolbar: [
			[{ size: ['small', false, 'large', 'huge'] }],
			['bold', 'italic', 'underline', 'strike', 'blockquote'],
			[{ list: 'ordered' }, { list: 'bullet' }],
			['link', 'image'],
			[
				{ list: 'ordered' },
				{ list: 'bullet' },
				{ indent: '-1' },
				{ indent: '+1' },
				{ align: [] }
			],
			[{ color: ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466', 'custom-color'] }]
		]
	}

	const formats = [
		'header', 'height', 'bold', 'italic',
		'underline', 'strike', 'blockquote',
		'list', 'color', 'bullet', 'indent',
		'link', 'image', 'align', 'size'
	]

	const handleContentChange = (content: any) => {
		console.log('content---->', content)
		setContent(content)
	}

	return (
		<div className='min-h-[600px]'>
			<div className='flex flex-row py-4 w-full items-end'>
				<Autocomplete
					defaultItems={evidences}
					placeholder='Selecciona una evidencia'
					label='Insertar evidencia'
					labelPlacement='outside'
					variant='bordered'
					className='w-full'
					onSelectionChange={handleEvidenceSelected}
				>
					{(evidence) => (
						<AutocompleteItem key={evidence.value} textValue={evidence.label}>
							<div className='flex gap-2 items-center'>
								<div className='w-[20px]'>
									{getFileIcon(evidence.label, evidence.type, 20)}
								</div>
								<div className='flex flex-col'>
									{evidence.label}
								</div>
							</div>
						</AutocompleteItem>
					)}
				</Autocomplete>
				<Button
					isDisabled={(evidenceSelected === null)}
					color='primary'
					className='ml-2'
					onPress={insertEvidence}>
					Insertar
				</Button>
			</div>
			<div className='h-[600px]'>
				<ReactQuill
					ref={quillRef}
					theme='snow'
					value={content}
					modules={modules}
					formats={formats}
					placeholder='write your content ....'
					onChange={handleContentChange}
					style={{ height: '560px' }}
				>
				</ReactQuill>
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