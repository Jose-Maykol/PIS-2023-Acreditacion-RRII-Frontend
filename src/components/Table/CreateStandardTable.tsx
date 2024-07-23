import { Standard } from '@/types/Standard'
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React, { useCallback } from 'react'
import PencilIcon from '../Icons/PencilIcon'
import TrashIcon from '../Icons/TrashIcon'
import { EmptyData } from './EmptyData'

interface CreateStandardTableProps {
  standards: Standard[],
  deleteStandard: (id: number) => void,
	editStandard: (standard: Standard) => void,
}

export default function CreateStandardTable({
	standards,
	deleteStandard,
	editStandard
}: CreateStandardTableProps) {
	const colums = [
		{ name: 'N°', uid: 'nro_standard' },
		{ name: 'NOMBRE DE ESTANDAR', uid: 'name' },
		{ name: 'DESCRIPCION', uid: 'description' },
		{ name: 'ACCIONES', uid: 'actions' }
	]

	const renderCell = useCallback((standard: Standard, columnKey: React.Key) => {
		const cellValue = standard[columnKey as keyof Standard]
		switch (columnKey) {
		case 'name':
			return (
				<div className='flex flex-col min-w-[325px]'>
					<p className='text-bold text-sm capitalize'>{cellValue}</p>
				</div>
			)
		case 'description':
			return (
				<div className='flex flex-col min-w-[325px]'>
					<p className='text-bold text-sm capitalize'>{cellValue}</p>
				</div>
			)
		case 'actions':
			return (
				<div className='flex flex-row gap-2'>
					<Button
						startContent={<PencilIcon width={20} height={20} fill='fill-lightBlue-500' />}
						isIconOnly={true}
						className='bg-transparent'
						isDisabled={standard.is_editing}
						onPress={() => editStandard(standard)}
					/>
					<Button
						startContent={<TrashIcon width={20} height={20} fill='fill-red-500' />}
						isIconOnly={true}
						isDisabled={standard.is_editing}
						onPress={() => {
							if (typeof standard.id === 'number') {
								deleteStandard(standard.id)
							}
						}}
						className='bg-transparent'
					/>
				</div>
			)
		default:
			return <p className='text-sm capitalize'>{cellValue}</p>
		}
	}, [])

	return (
		<div className='h-[520px]'>
			<Table
				aria-label='Tabla de estándares'
				isHeaderSticky
				classNames={{
					base: 'max-h-[520px] overflow-scroll no-scrollbar'
				}}
			>
				<TableHeader columns={colums}>
					{(column) => (
						<TableColumn key={column.uid}>
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody
					emptyContent={<EmptyData description='No hay estandares registrados' />}
					items={standards}
				>
					{(item) => (
						<TableRow key={item.id}>
							{(columnKey) => <TableCell key={columnKey}>{renderCell(item, columnKey)}</TableCell>}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	)
}