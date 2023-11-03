import React, { useEffect, useState, useCallback, useMemo, Key } from 'react'

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
import { columns, valorationOptions } from '../../utils/StandardData'
import CustomTable from './CustomTable'
import CustomDropdown from '../Dropdown/CustomDropdown'
import { StandardService } from '@/api/Estandar/standardService'
import { StandardUsers } from '@/types/Standard'
import { getCommonIcon } from '@/utils/utils'
import Link from 'next/link'
import AssignmentModal from '../Modal/StandardManagement/AssignmentModal'

const statusColorMap: Record<string, ChipProps['color']> = {
	'plenamente completado': 'success',
	logrado: 'warning',
	'no logrado': 'danger'
}


export default function StandardTable () {
	const [filterValue, setFilterValue] = useState<string>('')
	const [page, setPage] = useState<number>(1)
	const [statusFilter, setStatusFilter] = useState<Selection>('all')
	const rowsPerPage = 8
	const hasSearchFilter = Boolean(filterValue)
	const [standardsManagement, setStandardsManagement] = useState<StandardUsers[]>([])
	const [reload, setReload] = useState<boolean>(false)

	useEffect(() => {
		StandardService.getStandardsAndAssignedUsers().then((res) => {
			setStandardsManagement(res.data)
		})
		setReload(false)
	}, [reload])

	const filteredItems = useMemo(() => {
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

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage
		const end = start + rowsPerPage

		return filteredItems.slice(start, end)
	}, [page, filteredItems, rowsPerPage])

	const renderCell = useCallback((standard: StandardUsers, columnKey: Key) => {
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
					{cellValue.length > 0
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
							<p>No se asignaron aun encargados</p>
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
					<AssignmentModal id={standard.id.toString()} onReload={() => setReload(true)} />
					<Tooltip content='Ver Estandar'>
						<Link
							href={`/dashboard/standards/${standard.id}/narrative`}
						>
							{getCommonIcon('link', 17, 'fill-sky-300 hover:fill-sky-600')}
						</Link>
					</Tooltip>
				</div>
			)
		default:
			return <div>{cellValue.toString()}</div>
		}
	}, [])

	const onSearchChange = useCallback((value?: string) => {
		if (value) {
			setFilterValue(value)
			setPage(1)
		} else {
			setFilterValue('')
		}
	}, [])

	const onClear = useCallback(() => {
		setFilterValue('')
		setPage(1)
	}, [])

	const topContent = useMemo(() => {
		return (
			<div className='flex flex-col gap-4 mb-4'>
				<div className='flex justify-between gap-3 items-end'>
					<Input
						isClearable
						className='w-full sm:max-w-[44%]'
						placeholder='Buscar por nombre, apellido o correo'
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
						<Button color='primary' endContent={getCommonIcon('plus', 15, 'fill-white')}>
							Crear Estandares
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

	const bottomContent = useMemo(() => {
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

	const classNames = useMemo(
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
