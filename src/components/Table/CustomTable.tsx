/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'

type Column = {
	uid: string
	name: string
	sortable?: boolean
}

type TableProps = {
	items: any[]
	columns: Column[]
	renderCell: (item: any, columnKey: React.Key) => React.ReactNode
	topContent?: React.ReactNode
	bottomContent?: React.ReactNode
	emptyContent: React.ReactNode
	classNames?: any
	hideHeader?: boolean
	onRowActionClick?: (key: any) => void
}

const CustomTable = ({
	items,
	columns,
	renderCell,
	topContent,
	bottomContent,
	emptyContent,
	classNames,
	hideHeader,
	onRowActionClick
}: TableProps) => {
	return (
		<Table
			aria-label='Example table with custom cells'
			topContent={topContent}
			topContentPlacement='outside'
			bottomContent={bottomContent}
			bottomContentPlacement='outside'
			classNames={classNames}
			className='no-scrollbar'
			removeWrapper
			hideHeader={hideHeader}
		>
			<TableHeader columns={columns}>
				{(column) => (
					<TableColumn key={column.uid} align='center'>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody items={items} emptyContent={emptyContent}>
				{(item) => (
					<TableRow key={item.id} onDoubleClick={() => onRowActionClick?.(item.id)}>
						{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	)
}

export default CustomTable
