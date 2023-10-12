'use client'

import React from 'react'

import {
	Chip,
	Tooltip,
	ChipProps,
	Pagination,
	Selection,
	Button,
	Progress
} from '@nextui-org/react'
import EyeIcon from '../Icons/EyeIcon'
import PencilIcon from '../Icons/PencilIcon'
import TrashIcon from '../Icons/TrashIcon'
import { PlusIcon } from '../Icons/PlusIcon'
import { SearchIcon } from '../Icons/SearchIcon'
import { ChevronDownIcon } from '../Icons/ChevronDownIcon'
import { columns, improvementPlans, statusOptions } from '../../utils/data_improvement_plans'
import CustomTable from './CustomTable'
import CustomInput from '../Input/CustomInput'
import CustomDropdown from '../Dropdown/CustomDropdown'
import Link from 'next/link'

const statusColorMap: Record<string, ChipProps['color']> = {
	Planificado: 'secondary',
	'En desarrollo': 'primary',
	Completado: 'success',
	Postergado: 'warning',
	Anulado: 'danger'
}

// Create a type with properties of improvementPlans
type ImprovementPlans = typeof improvementPlans[0];

type TableProps = {
	id: string
}

export default function ImprovementPlansTable({ id }: TableProps) {
	const [filterValue, setFilterValue] = React.useState('')
	const [page, setPage] = React.useState(1)
	const [statusFilter, setStatusFilter] = React.useState<Selection>('all')

	const rowsPerPage = 7
	const hasSearchFilter = Boolean(filterValue)


	const filteredItems = React.useMemo(() => {
		let filteredPlans = [...improvementPlans]

		if (hasSearchFilter) {
			filteredPlans = filteredPlans.filter((plan) =>
				plan.code.toLowerCase().includes(filterValue.toLowerCase())
			)
		}
		if (statusFilter !== 'all' && Array.from(statusFilter).length !== statusOptions.length) {
			filteredPlans = filteredPlans.filter((plan) =>
				Array.from(statusFilter).includes(plan.status)
			)
		}

		return filteredPlans
	}, [improvementPlans, filterValue, statusFilter])

	const pages = Math.ceil(filteredItems.length / rowsPerPage)

	const items = React.useMemo(() => {
		const start = (page - 1) * rowsPerPage
		const end = start + rowsPerPage

		return filteredItems.slice(start, end)
	}, [page, filteredItems, rowsPerPage])

	const renderCell = React.useCallback((improvementPlan: ImprovementPlans, columnKey: React.Key) => {
		const cellValue = improvementPlan[columnKey as keyof ImprovementPlans]

		switch (columnKey) {
		case 'code':
			return (
				<div className='flex flex-col'>
					<p className='text-bold text-sm capitalize'>{cellValue}</p>
				</div>
			)
		case 'standard':
			return (
				<div className='flex flex-col'>
					<p className='text-bold text-sm text-default-600'>{cellValue}</p>
				</div>
			)
		case 'assigned':
			return (
				<div className='flex flex-col'>
					<p className='text-bold text-sm capitalize text-default-600'>{cellValue}</p>
				</div>
			)
		case 'advance':
			return (
				<div className='flex flex-col'>
					<p className='text-bold text-sm text-default-600 text-center'>{cellValue}%</p>
					<Progress aria-label='Loading...' color='primary' size='sm' value={improvementPlan.advance} />
				</div>
			)
		case 'status':
			return (
				<Chip className='capitalize' color={statusColorMap[improvementPlan.status]} size='sm' variant='flat'>
					{cellValue}
				</Chip>
			)
		case 'actions':
			return (
				<div className='relative flex items-center gap-4 justify-center'>
					<Tooltip content='Detalle'>
						<span className='text-default-400 cursor-pointer active:opacity-50'>
							<EyeIcon width={15} height={15} />
						</span>
					</Tooltip>
					<Tooltip content='Editar Usuario'>
						<span className='text-default-400 cursor-pointer active:opacity-50'>
							<PencilIcon width={15} height={15} fill='fill-warning' />
						</span>
					</Tooltip>
					<Tooltip color='danger' content='Eliminar usuario'>
						<span className='text-danger cursor-pointer active:opacity-50'>
							<TrashIcon width={15} height={15} fill='fill-danger' />
						</span>
					</Tooltip>
				</div>
			)
		default:
			return cellValue
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
					<CustomInput
						isClearable
						className='w-full sm:max-w-[44%]'
						placeholder='Buscar por código...'
						startContent={<SearchIcon />}
						defaultValue={filterValue}
						onClear={() => onClear()}
						onValueChange={onSearchChange}
					/>
					<div className='flex gap-3'>
						<CustomDropdown
							mode='selector'
							triggerElement={
								<Button endContent={<ChevronDownIcon className='text-small' />} variant='flat'>
                                    Estado
								</Button>
							}
							triggerClassName='hidden sm:flex'
							items={statusOptions}
							itemsClassName='capitalize'
							disallowEmptySelection
							closeOnSelect={false}
							selectedKeys={statusFilter}
							selectionMode='multiple'
							onSelectionChange={setStatusFilter}

						/>
						<Link href={`/dashboard/standards/${id}/evidence_improvements/new`}>
							<Button color='primary' endContent={<PlusIcon />}>
								Asignar PM
							</Button>
						</Link>
					</div>
				</div>
			</div>
		)
	}, [
		filterValue,
		statusFilter,
		onSearchChange,
		improvementPlans.length,
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
