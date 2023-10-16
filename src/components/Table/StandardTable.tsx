import React, { useEffect } from 'react'

import {
	Chip,
	Tooltip,
	ChipProps,
	Pagination,
	Selection,
	Input,
	Button
} from '@nextui-org/react'
import EyeIcon from '../Icons/EyeIcon'
import PencilIcon from '../Icons/PencilIcon'
import PlusIcon from '../Icons/PlusIcon'
import SearchIcon from '../Icons/SearchIcon'
import ChevronDownIcon from '../Icons/ChevronDownIcon'
import { valorationOptions } from '../../utils/StandardData'
import CustomTable from './CustomTable'
import CustomDropdown from '../Dropdown/CustomDropdown'
import { StandardService } from '@/api/Estandar/standardService'

const statusColorMap: Record<string, ChipProps['color']> = {
	'plenamente completado': 'success',
	completado: 'warning',
	'no completado': 'danger'
}


export default function StandardTable({ onOpenModal } : {onOpenModal: (id: string) => void}) {
	const [filterValue, setFilterValue] = React.useState('')
	const [page, setPage] = React.useState(1)
	const [statusFilter, setStatusFilter] = React.useState<Selection>('all')
	const rowsPerPage = 8
	const hasSearchFilter = Boolean(filterValue)
	const [standardsManagement, setStandardsManagement] = React.useState<any>([])
	const columns = [
		{ name: '#', uid: 'nro_standard', sortable: true },
		{ name: 'ESTÁNDAR', uid: 'name', sortable: true },
		{ name: 'ENCARGADOS', uid: 'users', sortable: true },
		{ name: 'VALORACION ESTANDAR', uid: 'valoration' },
		{ name: 'ACCIONES', uid: 'actions' }
	]

	useEffect(() => {
		StandardService.getStandardsAndAssignedUsers().then((res) => {
			setStandardsManagement(res.data)
		})
	})

	type Standard = typeof standardsManagement[0];

	const filteredItems = React.useMemo(() => {
		let filteredStandards = [...standardsManagement]

		if (hasSearchFilter) {
			filteredStandards = filteredStandards.filter((standard) =>
				standard.name.toLowerCase().includes(filterValue.toLowerCase())
			)
		}
		if (statusFilter !== 'all' && Array.from(statusFilter).length !== valorationOptions.length) {
			filteredStandards = filteredStandards.filter((standard) =>
				Array.from(statusFilter).includes(standard.valoration)
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

	const renderCell = React.useCallback((standard: Standard, columnKey: React.Key) => {
		const cellValue = standard[columnKey as keyof Standard]

		switch (columnKey) {
		case 'name':
			return (
				<div className='flex flex-col'>
					<p className='text-bold text-sm capitalize text-default-400'>{standard.name}</p>
				</div>
			)
		case 'users':
			if (Array.isArray(cellValue)) {
				return (
					<div className='flex flex-col'>
						{
							cellValue.map((user, index) => (
								<div key={index}>
									<p className='text-bold text-sm capitalize'>{user.fullname} - {user.email}</p>
								</div>
							))
						}
					</div>
				)
			}
			return ''

		case 'valoration':
			if (typeof cellValue === 'string') {
				return (
					<Chip className='capitalize' color={statusColorMap[standard.valoration]} size='sm' variant='flat'>
						{cellValue}
					</Chip>
				)
			}
			return ''

		case 'actions':
			return (
				<div className='relative flex items-center gap-2'>
					<Tooltip content='Editar Encargados'>
						<span className='text-default-400 cursor-pointer active:opacity-50' onClick={() =>
							onOpenModal(standard.id)
						}>
							<PencilIcon width={15} height={15} fill='fill-warning' />
						</span>
					</Tooltip>
					<Tooltip content='Ver Estandar'>
						<span className='text-default-400 cursor-pointer active:opacity-50'>
							<EyeIcon width={15} height={15} />
						</span>
					</Tooltip>
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
						placeholder='Buscar por nombre de estándar ...'
						startContent={<SearchIcon width={24} height={24}/>}
						defaultValue={filterValue}
						onClear={() => onClear()}
						onValueChange={onSearchChange}
					/>
					<div className='flex gap-3'>
						<CustomDropdown
							mode='selector'
							triggerElement={
								<Button endContent={<ChevronDownIcon width={20} height={20} />} variant='flat'>
									Estado
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
						<Button color='primary' endContent={<PlusIcon width={24} height={24}/>}>
							Añadir Usuario
						</Button>
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
