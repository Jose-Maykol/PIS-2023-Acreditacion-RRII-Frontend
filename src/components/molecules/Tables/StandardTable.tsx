import React, { useEffect } from 'react'

import {
	User,
	Chip,
	Tooltip,
	ChipProps,
	Pagination,
	Selection,
	Button
} from '@nextui-org/react'
import PencilIcon from '../../atoms/Icons/PencilIcon'
import { PlusIcon } from '../../atoms/Icons/PlusIcon'
import { SearchIcon } from '../../atoms/Icons/SearchIcon'
import { ChevronDownIcon } from '../../atoms/Icons/ChevronDownIcon'
import GoArrowIcon from '../../atoms/Icons/GoArrowIcon'
import { columns, standarsManagement, valorationOptions } from '../../../utils/StandardData'
import CustomTable from '../../atoms/Table/CustomTable'
import CustomInput from '../../atoms/Input/CustomInput'
import CustomDropdown from '../../atoms/Dropdown/CustomDropdown'

import Link from 'next/link'

const statusColorMap: Record<string, ChipProps['color']> = {
	'plenamente completado': 'success',
	'completado': 'warning',
	'no completado': 'danger',
}

type Standard = typeof standarsManagement[0];

export default function StandardTable() {

	const [filterValue, setFilterValue] = React.useState('')
	const [page, setPage] = React.useState(1)
	const [statusFilter, setStatusFilter] = React.useState<Selection>('all')

	const rowsPerPage = 7
	const hasSearchFilter = Boolean(filterValue)


	const filteredItems = React.useMemo(() => {
		let filteredStandards = [...standarsManagement]

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
	}, [standarsManagement, filterValue, statusFilter])

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
			case 'managers':
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
				return '';

			case 'valoration':
				if (typeof cellValue === 'string') {
					return (
						<Chip className='capitalize' color={statusColorMap[standard.valoration]} size='sm' variant='flat'>
							{cellValue}
						</Chip>
					)
				}
				return '';

			case 'actions':
				return (
					<div className='relative flex items-center gap-2'>
						<Tooltip content='Editar Encargados'>
							<span className='text-default-400 cursor-pointer active:opacity-50'>
								<PencilIcon width={24} height={24} fill='fill-warning' />
							</span>
						</Tooltip>
						<Tooltip content='ir a Estandar'>
							<span className='text-default-400 cursor-pointer active:opacity-50'>
								<Link href={`/dashboard/standards/${standard.id}`}>
									<GoArrowIcon width={24} height={24} fill='fill-blue-500'/>
								</Link>
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
					<CustomInput
						isClearable
						className='w-full sm:max-w-[44%]'
						placeholder='Buscar por nombre de estandar ...'
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
							items={valorationOptions}
							itemsClassName='capitalize'
							disallowEmptySelection
							closeOnSelect={false}
							selectedKeys={statusFilter}
							selectionMode='multiple'
							onSelectionChange={setStatusFilter}

						/>
						<Button color='primary' endContent={<PlusIcon />}>
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
		standarsManagement.length,
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
