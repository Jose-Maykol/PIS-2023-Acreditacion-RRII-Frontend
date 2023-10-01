import React from 'react'

import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@nextui-org/react";

type Column = {
    uid: string;
    name: string;
    sortable?: boolean;
  };
  
  type TableProps = {
    items: any[];
    columns: Column[];
    renderCell: (item: any, columnKey: React.Key) => React.ReactNode;
    topContent?: React.ReactNode;
    bottomContent?: React.ReactNode;
    emptyContent: React.ReactNode;
  };

const CustomTable = (
    {
        items,
        columns,
        renderCell,
        topContent,
        bottomContent,
        emptyContent
      }: TableProps
) => {
    const classNames = React.useMemo(
        () => ({
          wrapper: ["min-h-[590px]"],
          th: ["bg-default-200", "text-default-600", "border-b", "border-divider", "px-4", "py-3", "text-md"],
          td: [
            // changing the rows border radius
            // first
            "group-data-[first=true]:first:before:rounded-none",
            "group-data-[first=true]:last:before:rounded-none",
            // middle
            "group-data-[middle=true]:before:rounded-none",
            // last
            "group-data-[last=true]:first:before:rounded-none",
            "group-data-[last=true]:last:before:rounded-none",
          ],
          tr: ["hover:bg-default-300"],
        }),
        [],
      );

    return (
        <Table
            aria-label="Example table with custom cells"
            selectionMode="single"
            onRowAction={(key) => console.log(`Opening item ${key} ...`)}
            topContent={topContent}
            topContentPlacement="outside"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={classNames}
            removeWrapper
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
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
    );
}

export default CustomTable