'use client'

import React, { useEffect, useState } from 'react'

import {
	Selection,
	Input,
	Button,
	Breadcrumbs,
	BreadcrumbItem
} from '@nextui-org/react'
import PencilIcon from '../Icons/PencilIcon'
import PlusIcon from '../Icons/PlusIcon'
import SearchIcon from '../Icons/SearchIcon'
import ChevronDownIcon from '../Icons/ChevronDownIcon'
import UploadIcon from '../Icons/UploadIcon'
import FolderPlusIcon from '../Icons/FolderPlusIcon'
import FolderIcon from '../Icons/FolderIcon'
import EllipsisVerticalIcon from '../Icons/EllipsisVerticalIcon'
import DownloadIcon from '../Icons/DownloadIcon'
import { typeFiles } from '../../utils/StandardData'
import CustomTable from './CustomTable'
import CustomDropdown from '../Dropdown/CustomDropdown'
import { EvidenceService } from '@/api/Evidence/EvidenceService'
import { Evidence } from '@/types/Evidences'
import { getFileIcon, formatIsoDateToCustom } from '@/utils/utils'
import { columns } from '@/utils/data_evidence'
import TrashIcon from '../Icons/TrashIcon'
import PdfVisualizer from '@/components/PdfVisualizer/PdfVisualizer'
import UploadEvidenceModal from '@/components/Modal/Evidence/UploadEvidenceModal'
import RenameEvidenceModal from '../Modal/Evidence/RenameEvidenceModal'
import DeleteEvidenceModal from '../Modal/Evidence/DeleteEvidenceModal'

export default function EvidencesTable({ id, typeEvidence } : {id: string, typeEvidence: string}) {
	const [filterValue, setFilterValue] = useState('')
	const [page, setPage] = React.useState(1)
	const [statusFilter, setStatusFilter] = useState<Selection>('all')
	const rowsPerPage = 100
	const hasSearchFilter = Boolean(filterValue)
	const [evidencesManagement, setEvidencesManagement] = useState<Evidence[]>([])
	const [evidence, setEvidence] = useState<Evidence>({
		id: '',
		uid: 0,
		code: '',
		name: '',
		path: '',
		user_id: 0,
		evidence_type_id: 0,
		standard_id: 0,
		date_id: 0,
		created_at: '',
		updated_at: '',
		full_name: '',
		type: ''
	})
	const [params, setParams] = useState<{ parent_id: number | null }>({
		parent_id: null
	})
	const [path, setPath] = useState<string[]>(['mis evidencias'])
	const [pathKeys, setPathKeys] = useState<string[]>([])
	const [blobURL, setBlobURL] = useState<string>('')
	const [reload, setReload] = useState<boolean>(false)
	const [modalManager, setModalManager] = useState({
		showModalUpload: false,
		showModalRename: false,
		showModalDelete: false,
		shoModalCreateFolder: false
	})


	useEffect(() => {
		EvidenceService.getEvidencesByType(id, typeEvidence, params).then((res) => {
			const arr : Evidence[] = [...res.data.folders, ...res.data.evidences].map((evidence: Evidence) => {
				evidence.uid = Number(evidence.code.split('-')[1])
				evidence.id = `${evidence.code}`
				evidence.name = evidence.name ?? evidence.path.split('/').pop()
				return evidence
			})
			console.log('useeffect', res.data)
			setEvidencesManagement([...arr])
		})
		setReload(false)
	}, [reload, params])

	const filteredItems = React.useMemo(() => {
		let filteredEvidences = [...evidencesManagement]

		if (hasSearchFilter) {
			filteredEvidences = filteredEvidences.filter((evidence) => evidence.name.toLowerCase().includes(filterValue.toLowerCase()))
		}
		if (statusFilter !== 'all' && Array.from(statusFilter).length !== typeFiles.length) {
			filteredEvidences = filteredEvidences.filter((evidence) =>
				Array.from(statusFilter).includes(evidence.extension ?? evidence.type)
			)
		}

		return filteredEvidences
	}, [evidencesManagement, filterValue, statusFilter])

	const pages = Math.ceil(filteredItems.length / rowsPerPage)

	const items = React.useMemo(() => {
		const start = (page - 1) * rowsPerPage
		const end = start + rowsPerPage

		return filteredItems.slice(start, end)
	}, [page, filteredItems, rowsPerPage])

	const handleSelectOption = (key: string, fileId?: string) => {
		switch (key) {
		case 'upload-evidence':
			setModalManager({
				...modalManager,
				showModalUpload: true
			})
			break
		case 'create-folder':
			alert('create folder')
			break
		case 'download-evidence':
			handleDownload(fileId)
			break
		case 'rename-evidence':
			setModalManager({
				...modalManager,
				showModalRename: true
			})
			break
		case 'delete-evidence':
			setModalManager({
				...modalManager,
				showModalDelete: true
			})
			break
		}
	}

	const renderCell = React.useCallback((evidence: Evidence, columnKey: React.Key) => {
		switch (columnKey) {
		case 'name':
			return (
				<div className='flex gap-2'>
					{getFileIcon(undefined, evidence.file?.split('.').pop() ?? 'folder', 24)}
					<p className='text-bold text-md capitalize'>{evidence.name}</p>
				</div>
			)
		case 'full_name':
			return (
				<div className='flex flex-col'>
					<p className='text-bold text-md capitalize'>{evidence.full_name}</p>
				</div>
			)

		case 'updated_at':
			return (
				<div className='flex flex-col'>
					<p className='text-bold text-md capitalize'>{formatIsoDateToCustom(evidence.updated_at)}</p>
				</div>
			)

		case 'actions':
			return (
				<div className='relative flex items-center gap-2 justify-center'>
					<CustomDropdown
						triggerElement={
							<Button isIconOnly>
								<EllipsisVerticalIcon width={15} height={15} />
							</Button>
						}
						items={[
							{
								uid: 'rename-evidence',
								label: 'Renombrar Evidencia',
								color: 'primary',
								startContent: <PencilIcon width={25} height={25} />
							},
							{
								uid: 'download-evidence',
								label: 'Descargar Evidencia',
								color: 'primary',
								startContent: <DownloadIcon width={25} height={25} />
							},
							{
								uid: 'move-evidence',
								label: 'Mover Evidencia',
								color: 'primary',
								startContent: <DownloadIcon width={25} height={25} />
							},
							{
								uid: 'delete-evidence',
								label: 'Eliminar Evidencia',
								className: 'danger',
								color: 'danger',
								startContent: <TrashIcon width={25} height={25} fill='fill-red-500 hover:fill-white'/>
							}
						]}
						placement='bottom-end'
						mode='action'
						onAction={(key: string) => {
							setEvidence(evidence)
							handleSelectOption(key, String(evidence.uid))
						}
						}
					/>
				</div>
			)
		}
	}, [])

	const onSearchChange = React.useCallback((value?: string) => {
		if (value) {
			setFilterValue(value)
			setPage(1)
		} else {
			setFilterValue('')
		}
	}, [])

	const onClear = React.useCallback(() => {
		setFilterValue('')
		setPage(1)
	}, [])

	const handleDownload = React.useCallback((fileId?: string) => {
		if (fileId) {
			EvidenceService.downloadFile(fileId).then((res) => {
				// Obtener el header de Content-Disposition para extraer el nombre del archivo
				const contentDisposition = res.headers['content-disposition']
				let filename = 'descarga'
				if (contentDisposition) {
					const filenameMatch = contentDisposition.match(/filename="?(.+)"?/)
					if (filenameMatch) {
						filename = filenameMatch[1]
					}
				}

				// Crear URL a partir del Blob
				const url = URL.createObjectURL(res.data)
				const link = document.createElement('a')
				link.href = url
				link.download = filename
				document.body.appendChild(link)
				link.click()
				document.body.removeChild(link)
				URL.revokeObjectURL(url)
			})
		}
	}, [])

	const onRowActionClick = React.useCallback((key: string) => {
		const type = key.split('-')[0]
		const id = key.split('-')[1]
		if (type === 'F') {
			setParams({
				parent_id: Number(id)
			})
		} else {
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
				} /* else {
					handleDownload(id)
				} */
			})
		}
	}, [])

	const topContent = React.useMemo(() => {
		return (
			<div className='flex flex-col gap-4 mb-4'>
				<Breadcrumbs >
					<BreadcrumbItem >Mis Evidencias</BreadcrumbItem>
					{evidence.path.split('/').map((path) => (
						<BreadcrumbItem >{path}</BreadcrumbItem>
					))}
				</Breadcrumbs>
				<div className='flex justify-between gap-3 items-end'>
					<Input
						isClearable
						className='w-full sm:max-w-[44%]'
						placeholder='Buscar evidencia por nombre'
						startContent={<SearchIcon width={15} height={15} fill='fill-gray-600'/>}
						defaultValue={filterValue}
						onClear={() => onClear()}
						onValueChange={onSearchChange}
					/>
					<div className='flex gap-3'>
						<CustomDropdown
							mode='selector'
							triggerElement={
								<Button endContent={<ChevronDownIcon width={10} height={10} />} variant='faded'>
									Filtro por tipos
								</Button>
							}
							triggerClassName='hidden sm:flex'
							items={typeFiles}
							itemsClassName='capitalize'
							disallowEmptySelection
							closeOnSelect={false}
							selectedKeys={statusFilter}
							selectionMode='multiple'
							onSelectionChange={setStatusFilter}

						/>
						<CustomDropdown
							triggerElement={
								<Button color='primary' endContent={<PlusIcon width={15} height={15} fill='fill-white'/>}>
									Crear
								</Button>
							}
							items={[
								{
									uid: 'upload-evidence',
									label: 'Subir Evidencias',
									color: 'primary',
									startContent: <UploadIcon width={25} height={25} />
								},
								{
									uid: 'create-folder',
									label: 'Crear Carpeta',
									color: 'primary',
									startContent: <FolderPlusIcon width={25} height={25} />
								}
							]}
							placement='bottom-end'
							mode='action'
							onAction={(key: string) => handleSelectOption(key)}
						/>
					</div>
				</div>
			</div>
		)
	}, [
		filterValue,
		statusFilter,
		onSearchChange,
		evidencesManagement.length,
		hasSearchFilter
	])

	const classNames = React.useMemo(
		() => ({
			base: 'max-h-[590px] overflow-auto',
			// table: 'min-h-[580px]',
			wrapper: ['min-h-[590px] overflow-auto'],
			th: ['bg-default-200', 'text-default-600', 'border-b', 'border-divider', 'px-4', 'py-3', 'text-md'],
			td: [
				// changing the rows border radius
				// first
				'group-data-[first=true]:first:before:rounded-none',
				'group-data-[first=true]:last:before:rounded-none',
				// middle
				'group-data-[middle=true]:before:rounded-none',
				// last
				'group-data-[last=true]:first:before:rounded-none',
				'group-data-[last=true]:last:before:rounded-none'
			],
			tr: ['hover:bg-default-300 focus:bg-neutral-200']
		}),
		[]
	)

	return (
		<>
			<CustomTable
				items={items}
				columns={columns}
				renderCell={renderCell}
				topContent={topContent}
				// bottomContent={bottomContent}
				emptyContent={<div>No se encontro elementos</div>}
				classNames={classNames}
				onRowActionClick={onRowActionClick}
			/>
			{blobURL && (
				<PdfVisualizer blobURL={blobURL} setBlobURL={setBlobURL} />
			)}
			{modalManager.showModalUpload && <UploadEvidenceModal
				id={id}
				typeEvidence={typeEvidence}
				path='/'
				openModal={modalManager.showModalUpload}
				onCloseModal={() => setModalManager({ ...modalManager, showModalUpload: false })}
				onReload={() => setReload(true)}/>}
			{modalManager.showModalRename && <RenameEvidenceModal
				evidence={evidence}
				openModal={modalManager.showModalRename}
				onCloseModal={() => setModalManager({ ...modalManager, showModalRename: false })}
				onReload={() => setReload(true)}/>}
			{modalManager.showModalDelete && <DeleteEvidenceModal
				id={String(evidence.uid)}
				type={evidence.type}
				openModal={modalManager.showModalDelete}
				onCloseModal={() => setModalManager({ ...modalManager, showModalDelete: false })}
				onReload={() => setReload(true)}/>}
		</>
	)
}
