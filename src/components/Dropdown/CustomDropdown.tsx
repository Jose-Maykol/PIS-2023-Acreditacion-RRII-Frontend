import React from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'

type DropdownMode = 'selector' | 'action';

interface CustomDropdownProps {
	placement?: any;
	triggerElement: React.ReactNode;
	triggerClassName?: string;
	disallowEmptySelection?: boolean;
	closeOnSelect?: boolean;
	selectedKeys?: any;
	selectionMode?: any;
	items: any[];
	itemsClassName?: string;
	onSelectionChange?: (key: any) => void;
	onAction?: (key: any) => void;
	mode: DropdownMode;
}

function CustomDropdown({
	placement,
	triggerElement,
	triggerClassName,
	disallowEmptySelection,
	closeOnSelect,
	selectedKeys,
	selectionMode,
	items,
	itemsClassName,
	onSelectionChange,
	onAction,
	mode
}: CustomDropdownProps) {
	return (
		<Dropdown placement={placement}>
			<DropdownTrigger className={triggerClassName}>
				{triggerElement}
			</DropdownTrigger>
			<DropdownMenu
				aria-label='Dropdown'
				disallowEmptySelection={disallowEmptySelection}
				closeOnSelect={closeOnSelect}
				selectedKeys={selectedKeys}
				selectionMode={selectionMode}
				onSelectionChange={mode === 'selector' ? onSelectionChange : undefined}
				onAction={mode === 'action' ? onAction : undefined}
			>
				{items.map((item: any) => (
					<DropdownItem
						key={item.uid}
						className={itemsClassName}
						color={item.color}
						startContent={item.startContent}
						endContent={item.endContent}
					>
						{item.label}
					</DropdownItem>
				))}
			</DropdownMenu>
		</Dropdown>
	)
}

export default CustomDropdown
