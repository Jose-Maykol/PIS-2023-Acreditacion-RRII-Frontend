/* eslint-disable no-return-assign */
'use client'

import PencilIcon from '@/components/Icons/PencilIcon'
import TrashIcon from '@/components/Icons/TrashIcon'
import { Button } from '@nextui-org/react'
import { Editor } from '@tinymce/tinymce-react'
import { useRef, useState } from 'react'
import { TINY_API_KEY } from '../../../../../../config'
import SaveIcon from '@/components/Icons/SaveIcon'
import CloseIcon from '@/components/Icons/CloseIcon'

export default function NarrativePage() {
	const editorRef = useRef(null)
	const [editNarrative, setEditNarrative] = useState(false)

	const handleEditNarrative = () => {
		console.log('Editando narrativa')
		setEditNarrative(!editNarrative)
	}

	const handleSaveNarrative = () => {
		console.log('Guardando narrativa')
		console.log(editorRef.current.getContent())
		setEditNarrative(!editNarrative)
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
									startContent={<TrashIcon width={15} height={15} fill='fill-white'/>}>
								Eliminar
								</Button>
							</>
						)}
					</div>
				</div>
				{editNarrative
					? (
						<div className='min-h-[600px]'>
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
					: (
						<div className='flex flex-col items-center justify-center border rounded-md divide-gray-600 border-opacity-50 w-full min-h-[600px] outline-dashed outline-1 text-gray-400'>
							Narrativa vacia
						</div>
					)}
			</div>
		</div>
	)
}