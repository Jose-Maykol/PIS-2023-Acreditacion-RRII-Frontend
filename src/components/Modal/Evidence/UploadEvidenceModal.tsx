'use client'

import React, { useState, useRef } from 'react'
import { Button } from '@nextui-org/react'
import CustomModal from '@/components/Modal/CustomModal'
import { toast } from 'react-toastify'
import UploadIcon from '@/components/Icons/UploadIcon'
import TrashIcon from '@/components/Icons/TrashIcon'
import PdfIcon from '@/components/Icons/PdfIcon'
import DocIcon from '@/components/Icons/DocIcon'
import ExcelIcon from '@/components/Icons/ExcelIcon'
import PowerPointIcon from '@/components/Icons/PowerPointIcon'
import ZipperIcon from '@/components/Icons/ZipperIcon'

const UploadEvidenceModal = ({
	idStandard,
	openModal,
	onCloseModal,
	onReload
}: {
	idStandard: string
	openModal: boolean
	onCloseModal: () => void
	onReload: () => void
}) => {
	const [files, setFiles] = useState<File[]>([])
	const [totalSize, setTotalSize] = useState<number>(0)
	const fileInputRef = useRef<HTMLInputElement | null>(null)

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		const droppedFiles = Array.from(e.dataTransfer.files)
		addFiles(droppedFiles)
	}

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
	}

	const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = Array.from(e.target.files || [])
		addFiles(selectedFiles)
	}

	const addFiles = (newFiles: File[]) => {
		let newTotalSize = totalSize
		for (const file of newFiles) {
			newTotalSize += file.size
		}
		if (newTotalSize <= 20 * 1024 * 1024) {
			setFiles([...files, ...newFiles])
			setTotalSize(newTotalSize)
		} else {
			toast.error('El tamanio total de las evidencias debe ser menor a 10MB')
		}
	}

	const removeFile = (index: number) => {
		const updatedFiles = [...files]
		const removedFile = updatedFiles.splice(index, 1)[0]
		setFiles(updatedFiles)
		setTotalSize(totalSize - removedFile.size)
	}

	const getFileIcon = (fileName: string): React.JSX.Element => {
		const fileExtension = fileName.split('.').pop()?.toLowerCase()
		console.log(fileExtension)
		if (fileExtension === 'pdf') {
			return <PdfIcon width={24} height={24} />
		} else if (fileExtension === 'doc' || fileExtension === 'docx') {
			return <DocIcon width={24} height={24} />
		} else if (fileExtension === 'xls' || fileExtension === 'xlsx') {
			return <ExcelIcon width={24} height={24} />
		} else if (fileExtension === 'ppt' || fileExtension === 'pptx') {
			return <PowerPointIcon width={24} height={24} />
		} else {
			return <ZipperIcon width={24} height={24} />
		}
	}

	const handleCloseModal = () => {
		onCloseModal()
	}

	const handleSaveChanges = async () => {
		// const notification = toast.loading('Procesando...')
		// const users = [...values].map((item) => item.toString())
		// await StandardService.assignUsersToStandard(
		// 	idStandard,
		// 	{ users } as AssignedUsers
		// ).then((res) => {
		// 	if (res.status === 1) {
		// 		onReload()
		// 		toast.update(notification, {
		// 			render: res.message,
		// 			type: 'success',
		// 			autoClose: 5000,
		// 			hideProgressBar: false,
		// 			closeOnClick: true,
		// 			pauseOnHover: true,
		// 			draggable: true,
		// 			isLoading: false,
		// 			theme: 'colored'
		// 		})
		// 	} else {
		// 		toast.update(notification, {
		// 			render: res.message,
		// 			type: 'error',
		// 			autoClose: 5000,
		// 			hideProgressBar: false,
		// 			closeOnClick: true,
		// 			pauseOnHover: true,
		// 			draggable: true,
		// 			isLoading: false,
		// 			theme: 'colored'
		// 		})
		// 	}
		// })
		handleCloseModal()
	}

	const header: React.ReactNode = (
		<>
			<h2 className='text-2xl font-bold text-center'>
				Formulario de Subida de evidencias para el estandar {idStandard}
			</h2>
		</>
	)

	const body: React.ReactNode = (
		<div className='h-full max-h-[96%] flex flex-col gap-5'>
			<div className='p-4 border-dashed border-4 border-gray-400 rounded-lg'>
				<div
					className='flex flex-col items-center justify-center'
					onDrop={handleDrop}
					onDragOver={handleDragOver}
				>
					<div className='mb-4 flex flex-col items-center'>
						<UploadIcon width={60} height={60} fill='fill-blue-500'/>
						<label className='cursor-pointer'>
							<input
								type='file'
								className='hidden'
								ref={fileInputRef}
								onChange={handleFileInput}
								multiple
							/>
							<p className='text-center'>Arrastra y suelta tus archivos aqui</p>
							<p className='text-xs text-center'>Archivos permitidos: PDF, DOC, XLS, PPT</p>
						</label>
					</div>
					<p>O</p>
					<Button
						color='primary'
						className='px-4 mt-2 text-white rounded uppercase'
						onPress={() => fileInputRef.current?.click()}
					>
					Seleccionar Archivos
					</Button>
					<p className='mt-3 text-xs'>Maximo tamaño: 20MB</p>
				</div>
			</div>
			<div className='flex-1 rounded-lg overflow-y-auto max-h-[310px] py-2 px-4 scrollbar-hide'>
				<p className='text-center text-md font-semibold'>Archivos subidos</p>
				{files.map((file, index) => (
					<div key={index} className='flex items-center justify-between mt-2 bg-slate-200 h-14 rounded-lg'>
						<div className='flex items-center ml-2'>
							{getFileIcon(file.name)}
							<p className='ml-2 font-medium'>{file.name} - {(file.size / 1024).toFixed(2)}KB</p>
						</div>
						<Button color='danger' variant='light' size='sm' onPress={() => removeFile(index)}><TrashIcon width={20} height={20} fill='fill-danger'/></Button>
					</div>
				))}
			</div>
		</div>
	)

	return (
		<CustomModal
			isOpen={openModal}
			classNames={{
				base: 'h-[80%]',
				header: 'p-2 border-b-[2px] border-gray-200',
				body: 'h-[55%] py-2'
				// footer: 'h-[22%]'
			}}
			size='4xl'
			onClose={handleCloseModal}
			header={header}
			body={body}
			footer={
				<>
					<Button color='danger' variant='solid' size='lg' onPress={handleCloseModal}>
						Cancelar
					</Button>
					<Button className='bg-lightBlue-600 text-white' variant='solid' size='lg' onPress={handleSaveChanges} >
						Guardar
					</Button>
				</>
			}
		/>
	)
}

export default UploadEvidenceModal
