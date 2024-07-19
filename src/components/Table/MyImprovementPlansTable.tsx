'use client'

import { Chip, Progress, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react'
import { columns, statusColorMap } from '../../utils/data_improvement_plans'
import React, { useCallback } from 'react'
import DeleteImprovementPlanModal from '../Modal/ImprovementPlan/DeleteImprovementPlanModal'
import { ImprovementPlans } from '@/types/ImprovementPlan'
import Link from 'next/link'
import EyeIcon from '../Icons/EyeIcon'
import PencilIcon from '../Icons/PencilIcon'
import TrashIcon from '../Icons/TrashIcon'
import { useYearSemesterStore } from '@/store/useYearSemesterStore'

interface MyImprovementPlansTableProps {
  data: ImprovementPlans[]
  handleUsersChanged: () => void
}

export default function MyImprovementPlansTable({
	data,
	handleUsersChanged
}: MyImprovementPlansTableProps) {
	const { isClosed } = useYearSemesterStore()
	const renderCell = useCallback((improvementPlan: ImprovementPlans, columnKey: React.Key) => {
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
						{improvementPlan.nro_standard} {cellValue}
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
				<div className='relative flex gap-4 justify-center items-center h-full'>
					<Tooltip content='Detalle'>
						<Link
							href={`/dashboard/standards/${improvementPlan.standard_id}/evidence_improvements/${improvementPlan.id}/details`}
						>
							<span className='text-default-400 cursor-pointer active:opacity-50'>
								<EyeIcon width={15} height={15} fill='fill-gray-400 hover:fill-gray-900' />
							</span>
						</Link>
					</Tooltip>
					{!isClosed
						? (
							<Tooltip content='Editar Plan de Mejora'>
								<Link
									href={`/dashboard/standards/${improvementPlan.standard_id}/evidence_improvements/${improvementPlan.id}/edit`}
								>
									<span className='text-default-400 cursor-pointer active:opacity-50'>
										<PencilIcon width={15} height={15} fill='fill-warning' />
									</span>
								</Link>
							</Tooltip>
						)
						: (
							<PencilIcon width={15} height={15} fill='fill-gray-300 hover:cursor-not-allowed' />
						)}
					{!isClosed
						? (
							<DeleteImprovementPlanModal
								planId={improvementPlan.id}
								isManager={true}
								setImprovementPlans={handleUsersChanged}
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
	}, [])

	return (
		<Table
			aria-label='Tabla de usuarios'
			removeWrapper
			classNames={{
				base: 'min-h-[445px] h-[445px]'
			}}
		>
			<TableHeader columns={columns}>
				{(column) => (
					<TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody
				items={data}
				emptyContent='No hay planes de mejora encontrados'
			>
				{(item) => (
					<TableRow key={item.id}>
						{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	)
}