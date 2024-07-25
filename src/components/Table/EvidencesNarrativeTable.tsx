'use client'

import React, { useEffect, useState, useMemo } from 'react'

import { Input, Button, Breadcrumbs, BreadcrumbItem, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Select, Selection, SelectItem } from '@nextui-org/react'
import { typeFiles } from '../../utils/StandardData'
import CustomTable from './CustomTable'
import { EvidenceService } from '@/api/Evidence/EvidenceService'
import { Evidence } from '@/types/Evidences'
import { getFileIcon, getCommonIcon } from '@/utils/utils'
import { columnsEvidenceNarrative } from '@/utils/data_evidence'
import PdfVisualizer from '@/components/PdfVisualizer/PdfVisualizer'
import LinkToIcon from '../Icons/LinkToIcon'
import { NarrativeService } from '@/api/Narrative/narrativeService'


export default function EvidencesNarrativeTable({
	id
}: {
	id: string
}) {
	const [filterValue, setFilterValue] = useState('')
	const [page, setPage] = React.useState(1)
	const [statusFilter, setStatusFilter] = useState<Selection>('all')
	const [typeEvidence, setTypeEvidence] = useState('1')
	const rowsPerPage = 100
	const hasSearchFilter = Boolean(filterValue)
	const [evidencesManagement, setEvidencesManagement] = useState<Evidence[]>([])
	const [params, setParams] = useState<{ parent_id: number | null }>({
		parent_id: null
	})
	const [breadcrumbs, setBreadcrumbs] = useState<{ name: string; path: string; key: number }[]>([{
		name: 'Mis Evidencias',
		path: '/',
		key: 0
	}])
	const [evidenceId, setEvidenceId] = useState<string>('')
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
	const [reload, setReload] = useState<boolean>(false)
	const [statusValue, setStatusValue] = useState<Selection>(new Set(['1']))

	useEffect(() => {
		EvidenceService.getEvidencesByType(id, typeEvidence, params).then((res) => {
			const arr: Evidence[] = [...res.data.folders, ...res.data.evidences].map(
				(evidence: Evidence) => {
					evidence.id = evidence.type === 'evidence' ? `${evidence.type}-${evidence.file_id}` : `${evidence.type}-${evidence.folder_id}`
					evidence.name = evidence.name ?? evidence.path.split('/').pop()
					return evidence
				}
			)
			setEvidencesManagement([...arr])
		})
		setReload(false)
		console.log('breadcrumbs', breadcrumbs)
	}, [reload, params, typeEvidence])

	const linkEvidence = (evidence: Evidence) => {
		const { protocol, host } = window.location
		const url:string = `${protocol}//${host}/evidences/${evidence.file_id}`
		const code:string = evidence.evidence_code ?? ''
		NarrativeService.insertNarrative(id, {
			evidence_code: code,
			url_evidence: url
		})
	}

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
	}, [evidencesManagement, filterValue, statusFilter])

	const pages = Math.ceil(filteredItems.length / rowsPerPage)

	const items = React.useMemo(() => {
		const start = (page - 1) * rowsPerPage
		const end = start + rowsPerPage

		return filteredItems.slice(start, end)
	}, [page, filteredItems, rowsPerPage])

	const typesEvidences = useMemo(
		() => [
			{ label: 'Planificacion', value: 1 },
			{ label: 'Resultados', value: 2 }
		], [])


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
					<div className='flex justify-start'>
						<p>{evidence.evidence_code}</p>
					</div>
				)
			} else {
				return (
					<div className='flex justify-start'><p className='text-center'>---</p></div>
				)
			}

		case 'actions':
			if (evidence.evidence_id) {
				return (
					<div className='invisible flex items-center justify-end group-hover/item:visible'>
						<Button startContent={<LinkToIcon width={16} height={16} fill='fill-white'/>} color='success' className='text-white' size='sm' onClick={() => linkEvidence(evidence)}>Vincular</Button>
					</div>
				)
			} else {
				return (
					<div className='invisible flex items-center justify-end group-hover/item:visible'>
						No Es Evidencia
					</div>
				)
			}
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
			setEvidenceId(id)
			setIsOpenModal(true)
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
						<Select
							items={typesEvidences}
							variant='bordered'
							size='sm'
							label='Filtrar por tipo'
							disallowEmptySelection
							selectedKeys={statusValue}
							onSelectionChange={setStatusValue}
							classNames={{
								base: 'w-[150px]',
								trigger: 'h-10'
							}}
						>
							{(typesEvidences) =>
								(<SelectItem key={typesEvidences.value} value={typesEvidences.value}>{typesEvidences.label}</SelectItem>)}
						</Select>
						<Button
							color='primary'
							onPress={() => setTypeEvidence(String([...statusValue][0]))}
						>
							Filtrar
						</Button>
					</div>
				</div>
			</div>
		)
	}, [filterValue, statusFilter, onSearchChange, evidencesManagement.length, hasSearchFilter, breadcrumbs, statusValue])

	const classNames = React.useMemo(
		() => ({
			base: 'max-h-[590px] overflow-auto',
			// table: 'min-h-[580px]',
			wrapper: ['min-h-[590px] overflow-auto'],
			th: [
				'bg-default-200',
				'text-default-600',
				'border-b',
				'border-divider',
				'px-2',
				'py-1',
				'text-sm'
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
			tr: ['hover:bg-default-300 focus:bg-neutral-200 group/item py-0']
		}),
		[]
	)

	return (
		<>
			<CustomTable
				items={items}
				columns={columnsEvidenceNarrative}
				renderCell={renderCell}
				topContent={topContent}
				emptyContent={<div>No se encontro elementos</div>}
				classNames={classNames}
				onRowActionClick={onRowActionClick}
			/>
			{isOpenModal && (
				<PdfVisualizer
					id={evidenceId}
					onClose={ () => setIsOpenModal(false) }
				/>
			)}
		</>
	)
}
