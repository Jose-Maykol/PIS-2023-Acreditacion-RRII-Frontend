import React, { useEffect, useState } from 'react'

import {
	Chip,
	Tooltip,
	ChipProps,
	Pagination,
	Selection,
	Input,
	Button,
	Popover,
	PopoverTrigger,
	PopoverContent
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
import { valorationOptions } from '../../utils/StandardData'
import CustomTable from './CustomTable'
import CustomDropdown from '../Dropdown/CustomDropdown'
import { StandardService } from '@/api/Estandar/standardService'
import { StandardUsers } from '@/types/Standard'
import TrashIcon from '../Icons/TrashIcon'

const statusColorMap: Record<string, ChipProps['color']> = {
	'plenamente completado': 'success',
	logrado: 'warning',
	'no logrado': 'danger'
}


export default function EvidencesTable({ id, type, reload, onReload, onOpenModal } : {id: string, type: string, reload:boolean, onReload: () => void, onOpenModal: (id: string) => void}) {
	const [filterValue, setFilterValue] = useState('')
	const [page, setPage] = React.useState(1)
	const [statusFilter, setStatusFilter] = useState<Selection>('all')
	const rowsPerPage = 8
	const hasSearchFilter = Boolean(filterValue)
	const [standardsManagement, setStandardsManagement] = useState<StandardUsers[]>([])
	const columns = [
		{ name: '#', uid: 'nro_standard', sortable: true },
		{ name: 'ESTÁNDAR', uid: 'name', sortable: true },
		{ name: 'ENCARGADOS', uid: 'users', sortable: true },
		{ name: 'VALORACION ESTANDAR', uid: 'standard_status' },
		{ name: 'ACCIONES', uid: 'actions' }
	]

	useEffect(() => {
		StandardService.getStandardsAndAssignedUsers().then((res) => {
			setStandardsManagement(res.data)
		})
		onReload()
	}, [reload])

	const filteredItems = React.useMemo(() => {
		let filteredStandards = [...standardsManagement]

		if (hasSearchFilter) {
			filteredStandards = filteredStandards
				.filter((standard) => standard.users.length > 0)
				.filter((standard) => standard.users.some((user) =>
					user.email.toLowerCase().includes(filterValue.toLowerCase()) ||
					user.name.toLowerCase().includes(filterValue.toLowerCase()) ||
					user.lastname.toLowerCase().includes(filterValue.toLowerCase())))
		}
		if (statusFilter !== 'all' && Array.from(statusFilter).length !== valorationOptions.length) {
			filteredStandards = filteredStandards.filter((standard) =>
				Array.from(statusFilter).includes(standard.standard_status)
			)
		}

		return filteredStandards
	}, [standardsManagement, filterValue, statusFilter])

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

	const renderCell = React.useCallback((standard: StandardUsers, columnKey: React.Key) => {
		const cellValue = standard[columnKey as keyof StandardUsers]

		switch (columnKey) {
		case 'name':
			return (
				<div className='flex flex-col'>
					<p className='text-bold text-md capitalize'>{standard.name}</p>
				</div>
			)
		case 'users':
			if (Array.isArray(cellValue)) {
				return (<div className='flex flex-col'>
					{cellValue.length === 0
						? (
							<Popover placement='right'>
								<PopoverTrigger>
									<Button
										color='primary'
										variant='ghost'
										size='sm'
										className='capitalize w-[100px]'>
                Ver encargados
									</Button>
								</PopoverTrigger>
								<PopoverContent>
									{cellValue.map((user, index) => (
										<div key={index}>
											<p className='text-bold text-sm'>{`${user.name} ${user.lastname}`} - {user.email}</p>
										</div>
									))}
								</PopoverContent>
							</Popover>
						)
						: (
							<p>{id} - {type}</p>
						)}
				</div>)
			}
			return ''

		case 'standard_status':
			if (typeof cellValue === 'string') {
				return (
					<Chip className='capitalize' color={statusColorMap[standard.standard_status]} size='md' variant='flat'>
						{cellValue}
					</Chip>
				)
			}
			return ''

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
		default:
			return <div>{cellValue.toString()}</div>
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
							items={valorationOptions}
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
		standardsManagement.length,
		hasSearchFilter
	])

	const bottomContent = React.useMemo(() => {
		return (
			<div className='py-2 px-2 flex justify-center'>
				<Pagination
					isCompact
					showControls
					showShadow
					color='primary'
					page={page}
					total={pages}
					onChange={setPage}
				/>
			</div>
		)
	}, [items.length, page, pages, hasSearchFilter])

	const classNames = React.useMemo(
		() => ({
			wrapper: ['min-h-[590px]'],
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
			tr: ['hover:bg-default-300']
		}),
		[]
	)

	return (
		<CustomTable
			items={items}
			columns={columns}
			renderCell={renderCell}
			topContent={topContent}
			bottomContent={bottomContent}
			emptyContent={<div>No se encontro elementos</div>}
			classNames={classNames}
		/>
	)
}
