import React, { useEffect, useState } from 'react'
import { Switch, Button, Divider, Progress } from '@nextui-org/react'
import { EvidenceService } from '@/api/Evidence/EvidenceService'
import CloseIcon from '../Icons/CloseIcon'

const PdfVisualizer = ({ id, onClose }: { id: string, onClose: () => void }) => {
	const [blobURL, setBlobURL] = useState('')
	const [isSelected, setIsSelected] = useState(true)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		EvidenceService.viewEvidence(id).then((res) => {
			if (res.data.extension === 'pdf') {
				const base64Data = res.data.content
				const binaryString = atob(base64Data)
				const byteArray = new Uint8Array(binaryString.length)
				for (let i = 0; i < binaryString.length; i++) {
					byteArray[i] = binaryString.charCodeAt(i)
				}
				const pdfBlob = new Blob([byteArray], { type: 'application/pdf' })
				const pdfUrl = URL.createObjectURL(pdfBlob)
				setBlobURL(pdfUrl)
			}
		}).finally(() => setIsLoading(false))
	}, [])

	return (
		<div className={`fixed top-0 bottom-0 ${isSelected ? 'right-0 translate-x-0' : 'left-0 translate-x-[0%]'} w-1/2 h-screen bg-white rounded-lg p-4 z-50 transition-transform duration-3000 ease-in-out`}>
			<div className='w-full h-10 flex flex-col mb-2'>
				<div className='flex items-center justify-between'>
					<h2 className='text-md font-medium'>Previsualización de evidencias</h2>
					<div className='flex items-center gap-1'>
						<Switch
							defaultSelected
							size='sm'
							color='success'
							thumbIcon={({ isSelected }) =>
								isSelected
									? (
										<div className='font-semibold'>R</div>)
									: (
										<div className='font-semibold'>L</div>
									)
							}
							onValueChange={() => setIsSelected(!isSelected)}
						/>
						<Button
							isIconOnly
							size='sm'
							onPress={() => { onClose(); setBlobURL('') }}
							className='bg-transparent hover:bg-red-500 cursor-pointer rounded-full group'
						>
							<CloseIcon width={20} height={20} fill='fill-default-500 group-hover:fill-white' />
						</Button>
					</div>
				</div>
				<Divider className='bg-default-300 mt-1' />
			</div>
			{
				isLoading && (
					<div className='w-full h-full flex items-center justify-center'>
						<Progress
							label='Cargando previsualización...'
							size='sm'
							isIndeterminate
							className='max-w-sm'
						/>
					</div>
				)
			}
			{
				blobURL && (
					<embed
						src={blobURL}
						type='application/pdf'
						width='100%'
						height='92%'
					/>
				)
			}
		</div>
	)
}

export default PdfVisualizer