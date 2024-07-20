'use client'

import React, { useState, useRef, useMemo, useEffect } from 'react'
import { Button, Popover, PopoverTrigger, PopoverContent, Input, Tooltip, CircularProgress, Chip } from '@nextui-org/react'
import CustomModal from '@/components/Modal/CustomModal'
import { toast } from 'react-toastify'
import UploadIcon from '@/components/Icons/UploadIcon'
import TrashIcon from '@/components/Icons/TrashIcon'
import { EvidenceService } from '@/api/Evidence/EvidenceService'
import { getFileIcon, getCommonIcon } from '@/utils/utils'
import { useToast } from '@/hooks/toastProvider'
import { v4 as uuid } from 'uuid'
interface FileUpload {
	uuid: string
	file: File
	progress: number
	status: string
}


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

interface Status {
    color: 'default' | 'warning' | 'success' | 'danger';
    text: string;
}

const statusUpload: Record<'pending' | 'incompleted' | 'completed' | 'error', Status> = {
	pending: {
		color: 'default',
		text: 'En espera'
	},
	incompleted: {
		color: 'warning',
		text: 'Duplicado'
	},
	completed: {
		color: 'success',
		text: 'Subido'
	},
	error: {
		color: 'danger',
		text: 'No subido'
	}
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
	const [files, setFiles] = useState<FileUpload[]>([])
	const [totalSize, setTotalSize] = useState<number>(0)
	const fileInputRef = useRef<HTMLInputElement | null>(null)
	const [newNameEvidence, setNewNameEvidence] = useState<string>('')
	const [openPopovers, setOpenPopovers] = useState<{ [key: string]: boolean }>({})
	const [progress, setProgress] = useState<any>({})
	const [filesUploadStatus, setFilesUploadStatus] = useState<{ [key: string]: 'pending' | 'incompleted' | 'completed' | 'error' }>({})
	const [isSendingForm, setIsSendingForm] = useState<boolean>(false)

	const togglePopover = (index: number) => {
		setOpenPopovers(prevState => ({ ...prevState, [index]: !prevState[index] }))
	}

	const validateNewNameEvidence = (newNameEvidence: string) => /^[A-Za-zñÑ][A-Za-z0-9ñÑ.\-_ ]{0,59}$/i.test(newNameEvidence)

	const isInvalid = useMemo(() => {
		if (newNameEvidence === '') return true

		return !validateNewNameEvidence(newNameEvidence)
	}, [newNameEvidence])

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		if (isSendingForm) {
			toast.warning('No se puede realizar esta accion mientras se envian los archivos')
			return
		}
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
				!['pdf'].includes(fileExtension)
			) {
				toast.error('Solo se permiten archivos PDF')
				return
			}
		}
		setFiles(prevFiles => [...prevFiles, ...newFiles.map(file => ({ uuid: uuid(), file, progress: 0, status: 'pending' }))])
		setTotalSize(newTotalSize)
	}

	const removeFile = (uuid: string) => {
		const updatedFiles = [...files].filter((fileUpload: FileUpload) => fileUpload.uuid !== uuid)
		const removedFile = files.find((fileUpload: FileUpload) => fileUpload.uuid === uuid)
		setFiles(updatedFiles)
		setTotalSize(totalSize - (removedFile?.file.size || 0))
	}

	const handleCloseModal = () => {
		setFiles([])
		setTotalSize(0)
		onCloseModal()
		onReload()
	}

	// const handleOpenPopover = (index: number, name: string) => {
	// 	setNewNameEvidence(name)
	// 	togglePopover(index)
	// }

	// const handleRenameFile = (index: number) => {
	// 	const updatedFiles = [...files]
	// 	const newName = newNameEvidence.endsWith('.pdf') ? newNameEvidence : `${newNameEvidence}.pdf`
	// 	updatedFiles[index] = new File([files[index]], newName, { type: 'application/pdf' })
	// 	setFiles(updatedFiles)
	// 	setNewNameEvidence('')
	// 	setOpenPopovers(prevState => ({ ...prevState, [index]: false }))
	// }

	const handleUploadEvidences = async () => {
		setIsSendingForm(true)
		const formDataBase = new FormData()
		formDataBase.append('standard_id', id)
		formDataBase.append('type_evidence_id', typeEvidence)
		formDataBase.append('path', path)
		if (folderId) formDataBase.append('folder_id', folderId)
		if (planId) formDataBase.append('plan_id', planId)

		const uploadPromises = files.map(({ uuid, file }) => {
			const formData = new FormData()
			for (const key of formDataBase.keys()) {
				formData.append(key, String(formDataBase.get(key)))
			}
			formData.append('file', file)
			return new Promise((resolve, reject) => {
				EvidenceService.uploadEvidences(formData, (progressPercentaje: any) => {
					setProgress((prevState: any) => ({ ...prevState, [uuid]: progressPercentaje }))
				}).then(
					(response: any) => {
						console.log(response.data)
						setFilesUploadStatus((prevState: any) => ({ ...prevState, [uuid]: 'completed' }))
						resolve(response)
					}
				).catch(
					(error: any) => {
						if (error.response.status === 422) {
							setFilesUploadStatus((prevState: any) => ({ ...prevState, [uuid]: 'incompleted' }))
						} else {
							setFilesUploadStatus((prevState: any) => ({ ...prevState, [uuid]: 'error' }))
						}
						reject(error)
					}
				)
			})
		})

		try {
			await Promise.all(uploadPromises)
			toast.success('Todos los archivos se han subido exitosamente')
		} catch (error: any) {
			toast.error('Uno o más archivos no se pudieron subir')
		}
	}

	const header: React.ReactNode = (
		<>
			<h2 className='flex justify-center text-lightBlue-600 font-semibold'>
				{!planId
					? `Formulario de subida de archivos para el estandar ${id.toString().padStart(2, '0')}`
					: 'Subir evidencias del Plan de Mejora'}
			</h2>
		</>
	)

	const body: React.ReactNode = (
		<div className='h-full flex flex-row gap-5'>
			<div className='w-[60%] rounded-lg overflow-y-auto py-2 px-4 scrollbar-hide'>
				<p className='text-center text-black text-md font-bold'>Archivos subidos</p>
				{[...files].reverse().map(({ uuid, file }, index) => (
					<div
						key={uuid}
						className='flex items-center justify-between mt-2 h-14 border-b-2 border-lightBlue-300'
					>
						<Tooltip content={file.name}>
							<div className='flex items-center ml-2'>
								{getFileIcon(file.name, '', 30)}
								<div className='flex flex-col'>
									<p className='ml-2 block text-sm text-blue-900 font-normal truncate text-ellipsis max-w-[250px]'>
										{file.name}
									</p>
									<p className='ml-2 text-xs text-blue-900 font-light'>
										{file.size < 1024 * 1024
											? (file.size / 1024).toFixed(2) + 'KB'
											: (file.size / 1024 / 1024).toFixed(2) + 'MB'}
									</p>
								</div>
							</div>
						</Tooltip>
						{isSendingForm
							? (
								<> {
									!(statusUpload[filesUploadStatus[uuid]])?.color
										? (
											<CircularProgress
												aria-label='Loading Files...'
												size='md'
												value={progress[uuid] || 0}
												color={progress[uuid] === 100 ? 'success' : 'primary'}
												showValueLabel={true}
											/>
										)
										: (
											<div>
												<Chip color={(statusUpload[filesUploadStatus[uuid]])?.color ?? 'default'} variant='flat' size='sm'><span className='text-xs'>{(statusUpload[filesUploadStatus[uuid]])?.text}</span></Chip>
											</div>
										)
								}
								</>
							)
							: (
								<div className='flex items-center mr-2'>
									{/* <Popover placement='left' showArrow offset={10} isOpen={openPopovers[index] || false} onOpenChange={() => handleOpenPopover(index, file.name)}>
										<PopoverTrigger>
											<Button isIconOnly color='primary' variant='light' size='sm'>
												{getCommonIcon('pencil', 20, 'fill-primary')}
											</Button>
										</PopoverTrigger>
										<PopoverContent className='w-[240px]'>
											{(titleProps) => (
												<div className='px-1 py-2 w-full'>
													<p className='text-small font-bold text-foreground' {...titleProps}>
														Cambiar nombre
													</p>
													<div className='mt-2 flex flex-col gap-2 w-full'>
														<Input
															autoFocus
															size='sm'
															variant='bordered'
															value={newNameEvidence}
															onValueChange={setNewNameEvidence}
															isInvalid={isInvalid}
															color={isInvalid ? 'danger' : 'default'}
															description={newNameEvidence.length}
															errorMessage={isInvalid && 'Ingresa un nombre válido'}
														/>
														<div className='flex justify-between'>
															<Button color='danger' size='sm' onPress={() => { setOpenPopovers(prevState => ({ ...prevState, [index]: false })) }}>Cancelar</Button>
															<Button color='primary' size='sm' onPress={() => handleRenameFile(index)}>Aceptar</Button>
														</div>
													</div>
												</div>
											)}
										</PopoverContent>
									</Popover> */}
									<Button isIconOnly color='danger' variant='light' size='sm' onClick={() => removeFile(uuid)}>
										{getCommonIcon('trash', 20, 'fill-danger')}
									</Button>
								</div>
							)
						}
					</div>
				))}
			</div>
			<div className={`flex flex-col w-[40%] justify-center items-center p-4 ${isSendingForm ? 'bg-lightBlue-50' : 'bg-lightBlue-100'} border-dashed border-2 border-black rounded-lg`}>
				<div
					className='flex flex-col items-center justify-center'
					onDrop={handleDrop}
					onDragOver={handleDragOver}
				>
					<div className='mb-2 flex flex-col items-center'>
						<UploadIcon width={60} height={60} fill='fill-blue-500' />
						<label className='cursor-pointer'>
							<input
								type='file'
								className='hidden'
								ref={fileInputRef}
								onChange={handleFileInput}
								multiple
							/>
							<p className='text-center text-sm'>Arrastra y suelta tus archivos aqui</p>
							<p className='text-center text-sm'>podras subir archivos pdf</p>
						</label>
					</div>
					<p className='text-sm mt-1 mb-2'>o</p>
					<Button
						isDisabled={isSendingForm}
						color='primary'
						size='sm'
						className='text-white text-sm rounded'
						onClick={() => fileInputRef.current?.click()}
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
			}}
			size='3xl'
			onClose={handleCloseModal}
			header={header}
			body={body}
			footer={
				<div className='w-full flex justify-center gap-10'>
					{
						!isSendingForm
							? (
								<>
									<Button color='danger' variant='flat' onClick={handleCloseModal}>
								Cancelar
									</Button>
									<Button
										className='bg-lightBlue-600 text-white'
										variant='solid'
										isDisabled={!files.length}
										onClick={handleUploadEvidences}
									>
								Subir
									</Button>
								</>
							)
							: (
								<Button
									className='bg-lightBlue-600 text-white'
									variant='solid'
									onClick={() => {
										setIsSendingForm(false)
										handleCloseModal()
									}}
								>
								Continuar
								</Button>
							)
					}
				</div>
			}
		/>
	)
}

export default UploadEvidenceModal
