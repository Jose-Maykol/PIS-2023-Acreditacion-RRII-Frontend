/* eslint-disable multiline-ternary */
'use client'

import React, { Dispatch, SetStateAction } from 'react'

import { Chip, Tooltip, Pagination, Selection, Input, Button, Progress } from '@nextui-org/react'
import EyeIcon from '../Icons/EyeIcon'
import PencilIcon from '../Icons/PencilIcon'
import PlusIcon from '../Icons/PlusIcon'
import SearchIcon from '../Icons/SearchIcon'
import ChevronDownIcon from '../Icons/ChevronDownIcon'
import { columns, statusColorMap, statusOptions } from '../../utils/data_improvement_plans'
import CustomTable from './CustomTable'
import CustomDropdown from '../Dropdown/CustomDropdown'
import Link from 'next/link'
import DeleteImprovementPlanModal from '../Modal/ImprovementPlan/DeleteImprovementPlanModal'
import { ImprovementPlans, StandardOption } from '@/types/ImprovementPlan'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/toastProvider'
import TrashIcon from '../Icons/TrashIcon'

type TableProps = {
	id?: string
	improvementPlans: Array<ImprovementPlans>
	setImprovementPlans: Dispatch<SetStateAction<ImprovementPlans[]>>
	standardsOptions?: Array<StandardOption>
	isManager: boolean
}

export default function ImprovementPlansTable({
	id,
	improvementPlans,
	setImprovementPlans,
	standardsOptions,
	isManager,
}: TableProps) {
	const router = useRouter()
	const [filterValue, setFilterValue] = React.useState('')
	const [page, setPage] = React.useState(1)

	const [statusFilter, setStatusFilter] = React.useState<Selection>('all')
	const [standardFilter, setStandardFilter] = React.useState<Selection>('all')

	const rowsPerPage = 10
	const hasSearchFilter = Boolean(filterValue)

	const { showToast, updateToast } = useToast()

	const filteredItems = React.useMemo(() => {
		let filteredPlans = [...improvementPlans]

		if (hasSearchFilter) {
			filteredPlans = filteredPlans.filter((plan) => {
				const codeMatches = plan.code.toLowerCase().includes(filterValue.toLowerCase())
				const nameMatches = plan.name.toLowerCase().includes(filterValue.toLowerCase())

				return codeMatches || nameMatches
			})
		}

		if (statusFilter !== 'all' && Array.from(statusFilter).length !== statusOptions.length) {
			filteredPlans = filteredPlans.filter((plan) =>
				Array.from(statusFilter).includes(plan.plan_status)
			)
		}

		if (id === '8' && standardsOptions) {
			if (
				standardFilter !== 'all' &&
				Array.from(standardFilter).length !== standardsOptions.length
			) {
				filteredPlans = filteredPlans.filter((plan) =>
					Array.from(standardFilter).includes(plan.nro_standard.toString())
				)
			}
		}

		return filteredPlans
	}, [improvementPlans, filterValue, statusFilter, standardFilter])

	const pages = Math.ceil(filteredItems.length / rowsPerPage)

	const items = React.useMemo(() => {
		const start = (page - 1) * rowsPerPage
		const end = start + rowsPerPage

		return filteredItems.slice(start, end)
	}, [page, filteredItems, rowsPerPage])

	const handleVerifyPermission = (path: string) => {
		if (!isManager) {
			const notification = showToast('Procesando...')
			updateToast(notification, 'Usted no tiene permisos para realizar esta acción', 'error')
			return
		}
		router.push(path)
	}

	const renderCell =
		(improvementPlan: ImprovementPlans, columnKey: React.Key) => {
			const cellValue = improvementPlan[columnKey as keyof ImprovementPlans]

			switch (columnKey) {
			case 'code':
				return (
					<div className='flex flex-col'>
						<p className='text-bold text-sm capitalize'>{cellValue}</p>
					</div>
				)
			case 'name':
				return (
					<div className='flex flex-col'>
						<p className='text-bold text-sm capitalize'>{cellValue}</p>
					</div>
				)
			case 'standard_name':
				return (
					<div className='flex flex-col'>
						<p className='text-bold text-sm text-default-600'>
							{(id === '8' || !id) ? `(${improvementPlan.nro_standard})` : null} {cellValue}
						</p>
					</div>
				)
			case 'user_name':
				return (
					<div className='flex flex-col'>
						<p className='text-bold text-sm capitalize text-default-600'>{cellValue}</p>
					</div>
				)
			case 'advance':
				return (
					<div className='flex flex-col'>
						<p className='text-bold text-sm text-default-600 text-center'>{cellValue}%</p>
						<Progress
							aria-label='Loading...'
							color='primary'
							size='sm'
							value={improvementPlan.advance}
						/>
					</div>
				)
			case 'plan_status':
				return (
					<Chip
						className='capitalize'
						color={statusColorMap[improvementPlan.plan_status]}
						size='sm'
						variant='flat'
					>
						{cellValue}
					</Chip>
				)
			case 'actions':
				return (
					<div className='relative flex gap-4'>
						<Tooltip content='Detalle'>
							<Link
								href={`/dashboard/standards/${id}/evidence_improvements/${improvementPlan.id}/details`}
							>
								<span className='text-default-400 cursor-pointer active:opacity-50'>
									<EyeIcon width={15} height={15} fill='fill-gray-400 hover:fill-gray-900' />
								</span>
							</Link>
						</Tooltip>
						{improvementPlan.isSemesterClosed !== true
							? (
								<Tooltip content='Editar Plan de Mejora'>
									<div
										onClick={() => handleVerifyPermission(`/dashboard/standards/${id}/evidence_improvements/${improvementPlan.id}/edit`)}
									>
										<span className='text-default-400 cursor-pointer active:opacity-50'>
											<PencilIcon width={15} height={15} fill='fill-warning' />
										</span>
									</div>
								</Tooltip>
							)
							: (
								<PencilIcon width={15} height={15} fill='fill-gray-300 hover:cursor-not-allowed' />
							)}
						{improvementPlan.isSemesterClosed !== true
							? (
								<DeleteImprovementPlanModal
									planId={improvementPlan.id}
									setImprovementPlans={setImprovementPlans}
									isManager={isManager}
								/>
							)
							: (
								<TrashIcon width={15} height={15} fill='fill-gray-300 hover:cursor-not-allowed' />
							)
						}
					</div>
				)
			default:
				return cellValue
			}
		}

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
						placeholder='Buscar por código o nombre...'
						startContent={<SearchIcon width={15} height={15} fill='fill-gray-600' />}
						defaultValue={filterValue}
						onClear={() => onClear()}
						onValueChange={onSearchChange}
					/>
					<div className='flex gap-3'>
						{id === '8' && standardsOptions ? (
							<CustomDropdown
								mode='selector'
								triggerElement={
									<Button endContent={<ChevronDownIcon width={10} height={10} />} variant='faded'>
										Estándar
									</Button>
								}
								triggerClassName='hidden sm:flex'
								items={standardsOptions}
								itemsClassName='capitalize'
								disallowEmptySelection
								closeOnSelect={false}
								selectedKeys={standardFilter}
								selectionMode='multiple'
								onSelectionChange={setStandardFilter}
							/>
						) : null}

						<CustomDropdown
							mode='selector'
							triggerElement={
								<Button endContent={<ChevronDownIcon width={10} height={10} />} variant='faded'>
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

						{id ? (
							<Button
								color='primary'
								endContent={<PlusIcon width={15} height={15} fill='fill-white' />}
								onClick={() => handleVerifyPermission(`/dashboard/standards/${id}/evidence_improvements/new`)}
							>
								Crear PM
							</Button>
						) : null}
					</div>
				</div>
			</div>
		)
	}, [
		filterValue,
		statusFilter,
		standardFilter,
		onSearchChange,
		improvementPlans.length,
		hasSearchFilter,
		isManager
	])

	const bottomContent = React.useMemo(() => {
		return (
			<div className='py-2 px-2 flex justify-center'>
				{pages !== 1 && (
					<Pagination
						isCompact
						showControls
						showShadow
						color='primary'
						page={page}
						total={pages}
						onChange={setPage}
					/>
				)}
			</div>
		)
	}, [items.length, page, pages, hasSearchFilter, isManager])

	const classNames = React.useMemo(
		() => ({
			wrapper: ['min-h-[590px]'],
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
			emptyContent={
				<div className='flex justify-center items-center min-h-[400px] w-full'>
					No se encontro elementos
				</div>
			}
			classNames={classNames}
		/>
	)
}
