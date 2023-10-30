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
import { TINY_API_KEY } from '../../../config'
import { StandardService } from '@/api/Estandar/standardService'
import PdfIcon from '../Icons/PdfIcon'
import PowerPointIcon from '../Icons/PowerPointIcon'
import FileIcon from '../Icons/FileIcon'

interface Evidence {
  value: string
  label: string
  type: string
}

interface NarrativeEditorProps {
  id: number
  content: string
  handleEditNarrative: () => void
}

export default function NarrativeEditor({ id, content, handleEditNarrative }: NarrativeEditorProps) {
	const editorRef = useRef<any>(null)
	const [evidences, setEvidences] = useState<Evidence[]>([])
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
		const evidenceLabel = evidences.find((evidence) => evidence.value == evidenceId)?.label
		const evidenceToInsert = `<a href="/evidences/${evidenceId}/view">${evidenceLabel}</a>`
		const editor = editorRef.current
		if (editor) {
			editor.insertContent(evidenceToInsert)
			console.log(editor.getContent())
		}
	}

	const handleEvidenceSelected = (value: Selection): void => {
		setEvidenceSelected(value)
	}

	return (
		<div className='min-h-[600px]'>
			<div className='flex flex-row py-4 w-full items-end'>
				<Select
					items={evidences}
					placeholder='Selecciona una evidencia'
					label='Insertar evidencia'
					labelPlacement='outside'
					variant='bordered'
					className='w-full'
					onSelectionChange={handleEvidenceSelected}
					listboxProps={{
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
					}}
					renderValue={(items) => {
						return items.map((item) => (
							<div key={item.key} className='flex gap-2 items-center'>
								{item.data?.type === 'pdf' && (<PdfIcon width={20} height={20} fill='fill-red-600'/>)}
								{item.data?.type === 'pptx' && (<PowerPointIcon width={20} height={20} fill='fill-orange-600'/>)}
								<div className='flex flex-col'>
									{item.data?.label}
								</div>
							</div>
						))
					}}
				>
					{(evidence) => (
						<SelectItem key={evidence.value} value={evidence.value}>
							<div className='flex gap-2 items-center'>
								<div className='w-[20px]'>
									{evidence.type === 'pdf' && (<PdfIcon width={20} height={20} fill='fill-red-600'/>)}
									{evidence.type === 'pptx' && (<PowerPointIcon width={15} height={20} fill='fill-orange-600'/>)}
									{!['pdf', 'pptx'].includes(evidence.type) && (<FileIcon width={20} height={20} fill='fill-neutral-700'/>)}
								</div>
								<div className='flex flex-col'>
									{evidence.label}
								</div>
							</div>
						</SelectItem>
					)}
				</Select>
				<Button
					isDisabled={(evidenceSelected as any).size === 0}
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