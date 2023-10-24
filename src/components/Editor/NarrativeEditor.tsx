import { Button } from '@nextui-org/react'
import { Editor } from '@tinymce/tinymce-react'
import { useRef } from 'react'
import { TINY_API_KEY } from '../../../config'
import CloseIcon from '../Icons/CloseIcon'
import SaveIcon from '../Icons/SaveIcon'

interface NarrativeEditorProps {
  handleEditNarrative: () => void;
}

export default function NarrativeEditor({ handleEditNarrative }: NarrativeEditorProps) {
	const editorRef = useRef(null)

	const handleSaveNarrative = () => {
		console.log('Guardando narrativa')
		console.log(editorRef.current?.getContent())
		handleEditNarrative()
	}

	return (
		<div className='min-h-[600px]'>
			<div className='h-[600px]'>
				<Editor
					apiKey={TINY_API_KEY}
					onInit={(evt, editor) => editorRef.current = editor}
					initialValue=''
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