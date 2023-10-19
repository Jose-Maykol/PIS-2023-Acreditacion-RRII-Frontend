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
}

const CustomTable = ({
	items,
	columns,
	renderCell,
	topContent,
	bottomContent,
	emptyContent,
	classNames
}: TableProps) => {
	return (
		<Table
			aria-label='Example table with custom cells'
			selectionMode='single'
			onRowAction={(key) => console.log(`Opening item ${key} ...`)}
			topContent={topContent}
			topContentPlacement='outside'
			bottomContent={bottomContent}
			bottomContentPlacement='outside'
			classNames={classNames}
			removeWrapper
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
					<TableRow key={item.id}>
						{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	)
}

export default CustomTable
