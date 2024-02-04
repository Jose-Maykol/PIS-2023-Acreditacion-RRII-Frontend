'use client'

import React, { useState, useRef } from 'react'
import { Button } from '@nextui-org/react'
import CustomModal from '@/components/Modal/CustomModal'
import { toast } from 'react-toastify'
import UploadIcon from '@/components/Icons/UploadIcon'
import TrashIcon from '@/components/Icons/TrashIcon'
import { EvidenceService } from '@/api/Evidence/EvidenceService'
import { getFileIcon, getCommonIcon } from '@/utils/utils'
import { useToast } from '@/hooks/toastProvider'

interface UploadEvidenceModalProps {
	id: string
	typeEvidence: string
	path: string
	folderId?: string
	openModal: boolean
	onCloseModal: () => void
	onReload: () => void
	planId?: string
}

const UploadEvidenceModal = ({
	id,
	typeEvidence,
	path,
	folderId,
	openModal,
	onCloseModal,
	onReload,
	planId
}: UploadEvidenceModalProps) => {
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
		let fileExtension
		for (const file of newFiles) {
			newTotalSize += file.size
			if (newTotalSize > 20 * 1024 * 1024) {
				toast.error('El tamaño total de las evidencias debe ser menor a 20MB')
				return
			}
			fileExtension = file.name.split('.').pop()?.toLowerCase()
			if (
				!fileExtension ||
				!['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'zip'].includes(fileExtension)
			) {
				toast.error('Solo se permiten archivos PDF, DOC, XLS, XLSX, PPT, PPTX, ZIP')
				return
			}
		}
		setFiles([...files, ...newFiles])
		setTotalSize(newTotalSize)
	}

	const removeFile = (index: number) => {
		const updatedFiles = [...files]
		const removedFile = updatedFiles.splice(index, 1)[0]
		setFiles(updatedFiles)
		setTotalSize(totalSize - removedFile.size)
	}

	const handleCloseModal = () => {
		setFiles([])
		setTotalSize(0)
		onCloseModal()
	}

	const handleUploadEvidences = async () => {
		const formData = new FormData()
		formData.append('standard_id', id)
		formData.append('type_evidence_id', typeEvidence)
		files.forEach((file, index) => {
			formData.append(`files[${index}]`, file)
		})
		formData.append('path', path)

		if (folderId) {
			formData.append('folder_id', folderId)
		}

		// Add planId when the evidences were uploaded from PM form
		if (planId) {
			formData.append('plan_id', planId)
		}

		const resPromise = EvidenceService.uploadEvidences(formData).then((res) => {
			if (res.status === 1) return Promise.resolve({ message: res.message })
			else return Promise.reject(new Error(res.message))
		})

		toast.promise(
			resPromise,
			{
				pending: 'Subiendo Archivos...',
				success: {
					render({ data }) {
						onReload()
						return `${data?.message}`
					}
				},
				error: {
					render({ data }) {
						return `${data}`
					}
				}
			},
			{
				theme: 'colored'
			}
		)
		handleCloseModal()
	}

	const header: React.ReactNode = (
		<>
			<h2 className='flex flex-col gap-1 text-lightBlue-600 uppercase'>
				{!planId
					? `Formulario de Subida de evidencias para el estandar ${id.toString().padStart(2, '0')}`
					: 'Subir evidencias del Plan de Mejora'}
			</h2>
		</>
	)

	const body: React.ReactNode = (
		<div className='h-full max-h-[96%] flex flex-row gap-5'>
			<div className='flex-1 rounded-lg overflow-y-auto max-h-[310px] py-2 px-4 scrollbar-hide w-[400px] max-w-[400px]'>
				<p className='text-center text-md font-semibold'>Archivos subidos</p>
				{files.reverse().map((file, index) => (
					<div
						key={index}
						className='flex items-center justify-between mt-2 bg-slate-200 h-14 rounded-lg'
					>
						<div className='flex items-center ml-2'>
							{getFileIcon(file.name)}
							<div className='flex flex-col'>
								<p className='ml-2 block text-md font-light truncate text-ellipsis'>
									{file.name.substring(0, 30) + '..' + file.name.substring(file.name.lastIndexOf('.'), file.name.length)}
								</p>
								<p className='ml-2 text-sm text-default-600'>
									{file.size < 1024 * 1024
										? (file.size / 1024).toFixed(2) + 'KB'
										: (file.size / 1024 / 1024).toFixed(2) + 'MB'}
								</p>
							</div>
						</div>
						<Button color='danger' variant='light' size='sm' onPress={() => removeFile(index)}>
							<TrashIcon width={20} height={20} fill='fill-danger' />
						</Button>
					</div>
				))}
			</div>
			<div className='flex flex-col flex-1 justify-center items-center p-4 border-dashed border-4 border-gray-400 rounded-lg'>
				<div
					className='flex flex-col items-center justify-center'
					onDrop={handleDrop}
					onDragOver={handleDragOver}
				>
					<div className='mb-4 flex flex-col items-center'>
						<UploadIcon width={60} height={60} fill='fill-blue-500' />
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
						className='text-white rounded uppercase'
						onPress={() => fileInputRef.current?.click()}
					>
						Seleccionar Archivos
					</Button>
					<p className='mt-3 text-xs'>Maximo tamaño: 20MB</p>
				</div>
			</div>
		</div>
	)

	return (
		<CustomModal
			isOpen={openModal}
			classNames={{
				base: 'h-[80%]'
				/* header: 'p-2 border-b-[2px] border-gray-200',
				body: 'h-[55%] py-2' */
				// footer: 'h-[22%]'
			}}
			size='4xl'
			onClose={handleCloseModal}
			header={header}
			body={body}
			footer={
				<>
					<Button color='danger' variant='solid' onPress={handleCloseModal}>
						Cancelar
					</Button>
					<Button
						className='bg-lightBlue-600 text-white'
						variant='solid'
						isDisabled={!files.length}
						onPress={handleUploadEvidences}
					>
						Guardar
					</Button>
				</>
			}
		/>
	)
}

export default UploadEvidenceModal
