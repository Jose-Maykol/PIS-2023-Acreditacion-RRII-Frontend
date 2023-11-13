import React, { useEffect, useState } from 'react'

import {
	Selection,
	Input,
	Button
} from '@nextui-org/react'
import PencilIcon from '../Icons/PencilIcon'
import PlusIcon from '../Icons/PlusIcon'
import SearchIcon from '../Icons/SearchIcon'
import ChevronDownIcon from '../Icons/ChevronDownIcon'
import UploadIcon from '../Icons/UploadIcon'
import FolderPlusIcon from '../Icons/FolderPlusIcon'
import EllipsisVerticalIcon from '../Icons/EllipsisVerticalIcon'
import EyeIcon from '../Icons/EyeIcon'
import DownloadIcon from '../Icons/DownloadIcon'
import { typeFiles } from '../../utils/StandardData'
import CustomTable from './CustomTable'
import CustomDropdown from '../Dropdown/CustomDropdown'
import { EvidenceService } from '@/api/Evidence/evidenceService'
import { Evidence } from '@/types/Evidences'
import { getFileIcon } from '@/utils/utils'
import TrashIcon from '../Icons/TrashIcon'
import PdfVisualizer from '@/components/PdfVisualizer/PdfVisualizer'


export default function EvidencesTable({ id, reload, onReload, onOpenModal } : {id: string, type: string, reload:boolean, onReload: () => void, onOpenModal: (id: string) => void}) {
	const [filterValue, setFilterValue] = useState('')
	const [page, setPage] = React.useState(1)
	const [statusFilter, setStatusFilter] = useState<Selection>('all')
	const rowsPerPage = 8
	const hasSearchFilter = Boolean(filterValue)
	const [evidencesManagement, setEvidencesManagement] = useState<Evidence[]>([])
	const [params, setParams] = useState<{ parent_id: string | number }>({
		parent_id: 2
	})
	const [blobURL, setBlobURL] = useState<string>('')
	const columns = [
		{ name: 'NOMBRE', uid: 'name', sortable: true },
		{ name: 'SUBIDO POR', uid: 'full_name', sortable: true },
		{ name: 'ULTIMA MODIFICACION', uid: 'updated_at' },
		{ name: 'ACCIONES', uid: 'actions' }
	]

	useEffect(() => {
		EvidenceService.getEvidencesByType('1', '1', params).then((res) => {
			const arr : Evidence[] = [...res.data.folders, ...res.data.evidences].map((evidence: Evidence) => {
				evidence.id = `${evidence.type}-${evidence.id}`
				return evidence
			})
			console.log('useeffect', res.data)
			setEvidencesManagement([...arr])
		})
		onReload()
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

	const handleSelectOption = (key: string) => {
		switch (key) {
		case 'upload-evidence':
			onOpenModal(id)
			break
		case 'create-folder':
			alert('create folder')
			break
		}
	}

	const renderCell = React.useCallback((evidence: Evidence, columnKey: React.Key) => {
		// const cellValue = evidence[columnKey as keyof Evidence]

		switch (columnKey) {
		case 'name':
			return (
				<div className='flex gap-2'>
					{getFileIcon(undefined, evidence.extension ?? 'folder', 24)}
					<p className='text-bold text-lg capitalize'>{evidence.name}</p>
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
					<p className='text-bold text-md capitalize'>{new Date(evidence.updated_at).getDate().toString()}</p>
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
								uid: 'view-evidence',
								label: 'Ver Evidencia',
								color: 'primary',
								startContent: <EyeIcon width={25} height={25} />
							},
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
						onAction={(key: string) => handleSelectOption(key)}
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

	const onRowActionClick = React.useCallback((key: string) => {
		console.log(evidencesManagement)
		const evidence = evidencesManagement.find((e) => e.id === key)
		const type = key.split('-')[0]
		const id = key.split('-')[1]
		console.log(evidence, type, id)
		if (type === 'folder') {
			onReload()
			setParams({
				parent_id: 6
			})
		} else {
			EvidenceService.viewEvidence(id).then((res) => {
				const base64Data = res.base64_content
				const binaryString = atob(base64Data)
				const byteArray = new Uint8Array(binaryString.length)
				for (let i = 0; i < binaryString.length; i++) {
					byteArray[i] = binaryString.charCodeAt(i)
				}
				const pdfBlob = new Blob([byteArray], { type: 'application/pdf' })
				const pdfUrl = URL.createObjectURL(pdfBlob)
				setBlobURL(pdfUrl)
			})
		}
	}, [])

	const topContent = React.useMemo(() => {
		return (
			<div className='flex flex-col gap-4 mb-4'>
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
			tr: ['hover:bg-default-300 focus:bg-red-200']
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
		</>
	)
}
