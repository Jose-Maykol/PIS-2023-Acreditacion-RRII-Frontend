/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable eqeqeq */
import { Autocomplete, AutocompleteItem, Button } from '@nextui-org/react'
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
import { getFileIcon } from '@/utils/utils'

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
		const contentNarrative = {
			narrative: editorRef.current?.getContent() as string
		}
		if (year && semester) {
			NarrativeService.updateNarrative(id, contentNarrative).then((res) => {
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
		const evidenceToInsert = `<a href="/evidences/${evidenceId}" style="color: blue;" target="_blank">${evidenceLabel}</a>`
		const editor = editorRef.current
		if (editor) {
			editor.insertContent(evidenceToInsert)
			editor.focus()
		}
	}

	const handleEvidenceSelected = (key: Key): void => {
		setEvidenceSelected(key)
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
					/* listboxProps={{
						itemClasses: {
							base: [
								'rounded-md',
								'text-default-500',
								'transition-opacity',
								'data-[hover=true]:text-foreground',
								'data-[hover=true]:bg-default-100',
								'dark:data-[hover=true]:bg-default-50',
								'data-[selectable=true]:focus:bg-default-50',
								'data-[pressed=true]:opacity-70',
								'data-[focus-visible=true]:ring-default-500'
							]
						}
					}}
					popoverProps={{
						classNames: {
							base: 'p-0 border-small border-divider bg-background',
							arrow: 'bg-default-200'
						}
					}} */
					/* renderValue={(items) => {
						return items.map((item) => (
							<div key={item.key} className='flex gap-2 items-center'>
								{getFileIcon(item.data?.label, item.data?.type, 20)}
								<div className='flex flex-col'>
									{item.data?.label}
								</div>
							</div>
						))
					}} */
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