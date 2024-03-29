'use client'

import React, { useCallback, useEffect, useState } from 'react'

import { Selection, Input, Button, Breadcrumbs, BreadcrumbItem, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'
import PlusIcon from '../Icons/PlusIcon'
import UploadIcon from '../Icons/UploadIcon'
import FolderPlusIcon from '../Icons/FolderPlusIcon'
import EllipsisVerticalIcon from '../Icons/EllipsisVerticalIcon'
import { typeFiles } from '../../utils/StandardData'
import CustomTable from './CustomTable'
import CustomDropdown from '../Dropdown/CustomDropdown'
import { EvidenceService } from '@/api/Evidence/EvidenceService'
import { Evidence } from '@/types/Evidences'
import { getFileIcon, getCommonIcon, formatIsoDateToCustom } from '@/utils/utils'
import { columns, columnsPlans } from '@/utils/data_evidence'
import PdfVisualizer from '@/components/PdfVisualizer/PdfVisualizer'
import UploadEvidenceModal from '@/components/Modal/Evidence/UploadEvidenceModal'
import RenameEvidenceModal from '../Modal/Evidence/RenameEvidenceModal'
import DeleteEvidenceModal from '../Modal/Evidence/DeleteEvidenceModal'
import CreateFolderModal from '../Modal/Evidence/CreateFolderModal'
import MoveEvidenceModal from '../Modal/Evidence/MoveEvidenceModal'
import { useNarrativeStore } from '@/store/useNarrativeStore'
import { useToast } from '@/hooks/toastProvider'

export default function EvidencesTable({
	id,
	typeEvidence,
	plandId
}: {
	id: string
	typeEvidence: string
	plandId?: string
}) {
	const [filterValue, setFilterValue] = useState('')
	const [page, setPage] = React.useState(1)
	const [statusFilter, setStatusFilter] = useState<Selection>('all')
	const rowsPerPage = 100
	const hasSearchFilter = Boolean(filterValue)
	const [evidencesManagement, setEvidencesManagement] = useState<Evidence[]>([])
	const [isManager, setIsManager] = useState<boolean>(true)
	const [evidence, setEvidence] = useState<Evidence>({
		id: '',
		code: '',
		name: '',
		path: '',
		user_id: 0,
		evidence_type_id: 0,
		file_id: 0,
		folder_id: 0,
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
	const [breadcrumbs, setBreadcrumbs] = useState<{ name: string; path: string; key: number }[]>([{
		name: 'Mis Evidencias',
		path: '/',
		key: 0
	}])
	const [reload, setReload] = useState<boolean>(false)
	const [modalManager, setModalManager] = useState({
		showModalUpload: false,
		showModalRename: false,
		showModalDelete: false,
		showModalCreateFolder: false,
		showModalMove: false,
		showPreviewPdf: false
	})
	const { isNarrativeEnabled } = useNarrativeStore()
	const { showToast, updateToast } = useToast()

	useEffect(() => {
		EvidenceService.getEvidencesByType(id, typeEvidence, params, plandId).then((res) => {
			const arr: Evidence[] = [...res.data.folders, ...res.data.evidences].map(
				(evidence: Evidence) => {
					evidence.id = evidence.type === 'evidence' ? `${evidence.type}-${evidence.file_id}` : `${evidence.type}-${evidence.folder_id}`
					evidence.name = evidence.name ?? evidence.path.split('/').pop()
					return evidence
				}
			)
			setIsManager(res.data.isManager)
			setEvidencesManagement([...arr])
		})
		setReload(false)
	}, [reload, params])

	const filteredItems = React.useMemo(() => {
		let filteredEvidences = [...evidencesManagement]

		if (hasSearchFilter) {
			filteredEvidences = filteredEvidences.filter((evidence) =>
				evidence.name.toLowerCase().includes(filterValue.toLowerCase())
			)
		}
		if (statusFilter !== 'all' && Array.from(statusFilter).length !== typeFiles.length) {
			filteredEvidences = filteredEvidences.filter((evidence) =>
				Array.from(statusFilter).includes(evidence.extension ?? evidence.type)
			)
		}

		return filteredEvidences
	}, [evidencesManagement, filterValue, statusFilter, isManager])

	const pages = Math.ceil(filteredItems.length / rowsPerPage)

	const items = React.useMemo(() => {
		const start = (page - 1) * rowsPerPage
		const end = start + rowsPerPage

		return filteredItems.slice(start, end)
	}, [page, filteredItems, rowsPerPage, isManager])

	const handleSelectOption = useCallback((key: string, fileId?: number) => {
		if (!isManager && key !== 'download-evidence') {
			const notification = showToast('Procesando...')
			updateToast(notification, 'Usted no tiene permisos para realizar esta acción', 'error')
			return
		}
		switch (key) {
		case 'upload-evidence':
			setModalManager({
				...modalManager,
				showModalUpload: true
			})
			break
		case 'create-folder':
			setModalManager({
				...modalManager,
				showModalCreateFolder: true
			})
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
		case 'move-evidence':
			setModalManager({
				...modalManager,
				showModalMove: true
			})
		}
	}, [evidence, modalManager, isManager])

	const renderCell = React.useCallback((evidence: Evidence, columnKey: React.Key) => {
		switch (columnKey) {
		case 'name':
			return (
				<div className='flex gap-2'>
					{getFileIcon(undefined, evidence.file?.split('.').pop() ?? 'folder', 24)}
					<p className='text-bold text-md'>{evidence.name}</p>
				</div>
			)
		case 'evidence_code':
			if (evidence.evidence_code) {
				return (
					<div className='flex'>
						<p>{evidence.evidence_code}</p>
					</div>
				)
			} else {
				return (
					<div className='flex'><p className='text-center'>---</p></div>
				)
			}
		case 'full_name':
			return (
				<div className='flex flex-col'>
					<p className='text-bold text-md capitalize'>{evidence.full_name}</p>
				</div>
			)

		case 'updated_at':
			return (
				<div className='flex flex-col'>
					<p className='text-bold text-md capitalize'>
						{formatIsoDateToCustom(evidence.updated_at)}
					</p>
				</div>
			)

		case 'actions':
			console.log('isManager', isManager)
			return (
				<div className='relative flex items-center gap-2 justify-center'>
					<CustomDropdown
						triggerElement={
							<Button isIconOnly className='rounded-full bg-transparent hover:bg-default-400'>
								<EllipsisVerticalIcon width={15} height={15} />
							</Button>
						}
						items={[
							{
								uid: 'rename-evidence',
								label: evidence.type === 'folder' ? 'Renombrar carpeta' : 'Renombrar archivo',
								color: 'primary',
								startContent: getCommonIcon('pencil', 20, 'group-hover/dropdown:fill-white')
							},
							{
								uid: 'download-evidence',
								label: 'Descargar archivo',
								className: evidence.type === 'folder' ? 'hidden' : undefined,
								color: 'primary',
								startContent: getCommonIcon('download', 20, 'group-hover/dropdown:fill-white')
							},
							{
								uid: 'move-evidence',
								label: evidence.type === 'folder' ? 'Mover carpeta' : 'Mover archivo',
								color: 'primary',
								startContent: getFileIcon('moveFolder', '', 20, 'group-hover/dropdown:fill-white')
							},
							{
								uid: 'delete-evidence',
								label: evidence.type === 'folder' ? 'Eliminar carpeta' : 'Eliminar archivo',
								color: 'danger',
								className: isNarrativeEnabled ? 'hidden' : undefined,
								startContent: (
									getCommonIcon('trash', 20, 'fill-red-500 group-hover/dropdown:fill-white')
								)
							}
						]}
						placement='bottom-end'
						mode='action'
						onAction={(key: string) => {
							setEvidence(evidence)
							handleSelectOption(key, evidence.file_id)
						}}
					/>
				</div>
			)
		}
	}, [isManager, isNarrativeEnabled])

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

	const handleDownload = React.useCallback((fileId?: number) => {
		if (fileId) {
			const notification = showToast('Procesando...')
			updateToast(notification, 'Preparando el archivo para descargar', 'info')
			EvidenceService.downloadFile(String(fileId)).then((res) => {
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
		} else {
			console.log('Error al descargar el archivo')
		}
	}, [])

	const onRowActionClick = React.useCallback((key: string) => {
		const type = key.split('-')[0]
		const id = key.split('-')[1]
		if (type === 'folder') {
			const evidence = evidencesManagement.filter((evidence) => evidence.folder_id === Number(id))[0]
			if (evidence.folder_id) {
				setBreadcrumbs([
					...breadcrumbs,
					{
						name: evidence.name,
						path: evidence.path,
						key: evidence.folder_id
					}
				])
			}
			setParams({
				parent_id: Number(id)
			})
		} else {
			setEvidence(evidencesManagement.filter((evidence) => evidence.file_id === Number(id))[0])
			setModalManager({ ...modalManager, showPreviewPdf: true })
		}
	}, [evidencesManagement])

	const onBreadcrumbClick = React.useCallback((type: string, key: string) => {
		let index = 0
		if (type === 'B') {
			index = breadcrumbs.findIndex((breadcrumb) => String(breadcrumb.key) === String(key))
		} else {
			index = breadcrumbs.findIndex((breadcrumb) => breadcrumb.name === String(key))
		}
		setBreadcrumbs(
			breadcrumbs.slice(0, index + 1)
		)
		Number(key) ? setParams({ parent_id: Number(key) }) : setParams({ parent_id: null })
	}, [breadcrumbs])

	const topContent = React.useMemo(() => {
		return (
			<div className='flex flex-col gap-4 mb-4'>
				<Breadcrumbs
					maxItems={3}
					itemsBeforeCollapse={0}
					itemsAfterCollapse={2}
					renderEllipsis={({ items, ellipsisIcon, separator }) => (
						<div className='flex items-center'>
							<Dropdown>
								<DropdownTrigger>
									<Button
										isIconOnly
										className='min-w-unit-6 w-unit-6 h-unit-6'
										size='sm'
										variant='flat'
									>
										{ellipsisIcon}
									</Button>
								</DropdownTrigger>
								<DropdownMenu color='primary' variant='solid' aria-label='Routes'>
									{items.map((item, index) => (
										<DropdownItem key={index} onClick={() => onBreadcrumbClick('D', String(item.children))}>
											{item.children}
										</DropdownItem>
									))}
								</DropdownMenu>
							</Dropdown>
							{separator}
						</div>
					)}
					onAction={(key) => onBreadcrumbClick('B', String(key))}>
					{breadcrumbs && breadcrumbs.map(({ name, key }) => (
						<BreadcrumbItem key={key}>{name}</BreadcrumbItem>
					))}
				</Breadcrumbs>
				<div className='flex justify-between gap-3 items-end'>
					<Input
						isClearable
						className='w-full sm:max-w-[44%]'
						placeholder='Buscar evidencia por nombre'
						startContent={getCommonIcon('search', 15, 'fill-gray-500')}
						defaultValue={filterValue}
						onClear={() => onClear()}
						onValueChange={onSearchChange}
					/>
					<div className='flex gap-3'>
						<CustomDropdown
							mode='selector'
							triggerElement={
								<Button endContent={getCommonIcon('chevron', 10)} variant='faded'>
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
								<Button
									color='primary'
									endContent={<PlusIcon width={15} height={15} fill='fill-white' />}
								>
									Crear
								</Button>
							}
							items={[
								{
									uid: 'upload-evidence',
									label: 'Subir Evidencias',
									color: 'primary',
									startContent: <UploadIcon width={25} height={25} fill='group-hover/dropdown:fill-white'/>
								},
								{
									uid: 'create-folder',
									label: 'Crear Carpeta',
									color: 'primary',
									startContent: <FolderPlusIcon width={25} height={25} fill='group-hover/dropdown:fill-white'/>
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
	}, [filterValue, statusFilter, onSearchChange, evidencesManagement.length, hasSearchFilter, breadcrumbs, isManager])

	const classNames = React.useMemo(
		() => ({
			base: 'max-h-[590px] overflow-auto select-none',
			// table: 'min-h-[580px]',
			wrapper: ['min-h-[590px] overflow-auto'],
			th: [
				'bg-default-200',
				'text-default-600',
				'border-b',
				'border-divider',
				'px-4',
				'py-3',
				'text-md'
			],
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
				columns={ plandId ? columnsPlans : columns}
				renderCell={renderCell}
				topContent={topContent}
				// bottomContent={bottomContent}
				emptyContent={<div>No se encontro elementos</div>}
				classNames={classNames}
				onRowActionClick={onRowActionClick}
			/>
			{modalManager.showPreviewPdf && (
				<PdfVisualizer
					id={String(evidence.file_id)}
					onClose={() => setModalManager({
						...modalManager,
						showPreviewPdf: false
					})}
				/>
			)}
			{modalManager.showModalUpload && (
				<UploadEvidenceModal
					id={id}
					typeEvidence={typeEvidence}
					path={breadcrumbs[breadcrumbs.length - 1].path}
					folderId = {String(breadcrumbs[breadcrumbs.length - 1].key)}
					openModal={modalManager.showModalUpload}
					onCloseModal={() => setModalManager({ ...modalManager, showModalUpload: false })}
					onReload={() => setReload(true)}
					planId={plandId}
				/>
			)}
			{modalManager.showModalRename && (
				<RenameEvidenceModal
					evidence={evidence}
					openModal={modalManager.showModalRename}
					onCloseModal={() => setModalManager({ ...modalManager, showModalRename: false })}
					onReload={() => setReload(true)}
				/>
			)}
			{modalManager.showModalDelete && (
				<DeleteEvidenceModal
					id={String(evidence.type === 'folder' ? evidence.folder_id : evidence.file_id)}
					type={evidence.type}
					openModal={modalManager.showModalDelete}
					onCloseModal={() => setModalManager({ ...modalManager, showModalDelete: false })}
					onReload={() => setReload(true)}
				/>
			)}
			{modalManager.showModalCreateFolder && (
				<CreateFolderModal
					id={parseInt(id)}
					typeEvidence={parseInt(typeEvidence)}
					path={breadcrumbs[breadcrumbs.length - 1].path}
					folderId = {breadcrumbs[breadcrumbs.length - 1].key}
					openModal={modalManager.showModalCreateFolder}
					onCloseModal={() => setModalManager({ ...modalManager, showModalCreateFolder: false })}
					onReload={() => setReload(true)}
				/>
			)}
			{modalManager.showModalMove && (
				<MoveEvidenceModal
					evidence={evidence}
					breadcrumbs={breadcrumbs}
					openModal={modalManager.showModalMove}
					onCloseModal={() => setModalManager({ ...modalManager, showModalMove: false })}
					onReload={() => setReload(true)}
				/>
			)}
		</>
	)
}
