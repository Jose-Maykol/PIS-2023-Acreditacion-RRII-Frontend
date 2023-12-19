/* eslint-disable multiline-ternary */
'use client'

import React from 'react'

import { Tooltip, Pagination, Input } from '@nextui-org/react'
import PencilIcon from '@/components/Icons/PencilIcon'
import SearchIcon from '@/components/Icons/SearchIcon'
import CustomTable from '../CustomTable'
import { memberColumns } from '@/utils/reports'
import TrashIcon from '@/components/Icons/TrashIcon'
import { QualityMember } from '@/types/Reports'

type TableProps = {
	qualityMembers: Array<QualityMember>
	onDelete: (id: number) => void
	onEdit: (id: number) => void
}

export default function QualityCommitteeTable({ qualityMembers, onDelete, onEdit }: TableProps) {
	const [filterValue, setFilterValue] = React.useState('')
	const [page, setPage] = React.useState(1)

	const rowsPerPage = 10
	const hasSearchFilter = Boolean(filterValue)

	const filteredItems = React.useMemo(() => {
		let filteredMembers = [...qualityMembers]

		if (hasSearchFilter) {
			filteredMembers = filteredMembers.filter((member) => {
				const nameMatches = member.name.toLowerCase().includes(filterValue.toLowerCase())
				const lastnameMatches = member.lastname.toLowerCase().includes(filterValue.toLowerCase())
				// const emailMatches = member.email.toLowerCase().includes(filterValue.toLowerCase())

				return nameMatches || lastnameMatches
			})
		}
		return filteredMembers
	}, [qualityMembers, filterValue])

	const pages = Math.ceil(filteredItems.length / rowsPerPage)

	const items = React.useMemo(() => {
		const start = (page - 1) * rowsPerPage
		const end = start + rowsPerPage

		return filteredItems.slice(start, end)
	}, [page, filteredItems, rowsPerPage])

	const renderCell = React.useCallback((member: QualityMember, columnKey: React.Key) => {
		const cellValue = member[columnKey as keyof QualityMember]

		switch (columnKey) {
		case 'fullname':
			return (
				<div className='flex flex-col'>
					<p className='text-bold text-sm capitalize'>{`${member.name} ${member.lastname}`}</p>
				</div>
			)
		case 'email':
			return (
				<div className='flex flex-col'>
					<p className='text-bold text-sm'>{cellValue}</p>
				</div>
			)
		case 'position':
			return (
				<div className='flex flex-col'>
					<p className='text-bold text-sm text-default-600'>{cellValue}</p>
				</div>
			)
		case 'telephone':
			return (
				<div className='flex flex-col'>
					<p className='text-bold text-sm capitalize text-default-600'>{cellValue}</p>
				</div>
			)
		case 'actions':
			return (
				<div className='flex gap-4 items-center justify-center'>
					<Tooltip content='Editar'>
						<span
							className='text-default-400 cursor-pointer active:opacity-50'
							onClick={() => onEdit(member.id)}
						>
							<PencilIcon width={15} height={15} fill='fill-warning' />
						</span>
					</Tooltip>
					<Tooltip content='Eliminar'>
						<span
							className='text-default-400 cursor-pointer active:opacity-50'
							onClick={() => onDelete(member.id)}
						>
							<TrashIcon width={15} height={15} fill='fill-gray-400 hover:fill-red-500' />
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
			<div className='grid grid-cols-2 items-center mb-4'>
				<p className='text-sm font-normal'>
					Miembros agregados: <span className='font-bold'>{qualityMembers.length}</span>
				</p>
				<Input
					isClearable
					className='w-full'
					placeholder='Buscar por nombres o email...'
					startContent={<SearchIcon width={15} height={15} fill='fill-gray-600' />}
					defaultValue={filterValue}
					onClear={() => onClear()}
					onValueChange={onSearchChange}
				/>
			</div>
		)
	}, [filterValue, onSearchChange, qualityMembers.length, hasSearchFilter])

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
	}, [items.length, page, pages, hasSearchFilter])

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
				'group-data-[first=true]:first:before:rounded-none',
				'group-data-[first=true]:last:before:rounded-none',
				'group-data-[middle=true]:before:rounded-none',
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
			columns={memberColumns}
			renderCell={renderCell}
			topContent={topContent}
			bottomContent={bottomContent}
			emptyContent={
				<div className='flex justify-center items-center min-h-[100px] w-full'>
					No se encontró elementos
				</div>
			}
			classNames={classNames}
		/>
	)
}
