import React from "react";

import {
    User,
    Chip,
    Tooltip,
    ChipProps,
    Pagination,
    Selection,
    Button,
} from "@nextui-org/react";
import { EyeIcon } from "../Icons/EyeIcon";
import PencilIcon from "../Icons/PencilIcon";
import TrashIcon from "../Icons/TrashIcon";
import { PlusIcon } from "../Icons/PlusIcon";
import { SearchIcon } from "../Icons/SearchIcon";
import { ChevronDownIcon } from "../Icons/ChevronDownIcon";
import { columns, users, statusOptions } from "../../utils/data";
import CustomTable from "./CustomTable";
import CustomInput from "../Input/CustomInput";
import CustomDropdown from "../Dropdown/CustomDropdown";

const statusColorMap: Record<string, ChipProps["color"]> = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

type User = typeof users[0];

export default function UserTable() {
    const [filterValue, setFilterValue] = React.useState("");
    const [page, setPage] = React.useState(1);
    const [statusFilter, setStatusFilter] = React.useState<Selection>("all");

    const rowsPerPage = 7;
    const hasSearchFilter = Boolean(filterValue);


    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...users];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                user.name.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredUsers = filteredUsers.filter((user) =>
                Array.from(statusFilter).includes(user.status),
            );
        }

        return filteredUsers;
    }, [users, filterValue, statusFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof User];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: user.avatar }}
                        description={user.email}
                        name={cellValue}
                    >
                        {user.email}
                    </User>
                );
            case "role":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                        <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Detalle">
                            <span className="text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon width={15} height={15} />
                            </span>
                        </Tooltip>
                        <Tooltip content="Editar Usuario">
                            <span className="text-default-400 cursor-pointer active:opacity-50">
                                <PencilIcon width={15} height={15} fill="fill-warning" />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Eliminar usuario">
                            <span className="text-danger cursor-pointer active:opacity-50">
                                <TrashIcon width={15} height={15} fill="fill-danger" />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("")
        setPage(1)
    }, [])

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4 mb-4">
                <div className="flex justify-between gap-3 items-end">
                    <CustomInput
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Buscar por nombre..."
                        startContent={<SearchIcon />}
                        defaultValue={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <CustomDropdown
                            mode="selector"
                            triggerElement={
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    Estado
                                </Button>
                            }
                            triggerClassName="hidden sm:flex"
                            items={statusOptions}
                            itemsClassName="capitalize"
                            disallowEmptySelection
                            closeOnSelect={false}
                            selectedKeys={statusFilter}
                            selectionMode="multiple"
                            onSelectionChange={setStatusFilter}

                        />
                        <Button color="primary" endContent={<PlusIcon />}>
                            Añadir Usuario
                        </Button>
                    </div>
                </div>
            </div>
        );
    }, [
        filterValue,
        statusFilter,
        onSearchChange,
        users.length,
        hasSearchFilter,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-center">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
            </div>
        );
    }, [items.length, page, pages, hasSearchFilter]);

    return (
        <CustomTable
            items={items}
            columns={columns}
            renderCell={renderCell}
            topContent={topContent}
            bottomContent={bottomContent}
            emptyContent={<div>No se encontro elementos</div>}
        />
    );
}
