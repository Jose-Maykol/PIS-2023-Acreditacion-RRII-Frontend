import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";

function CustomDropdown({ triggerElement, items, handleAction }: any) {
    return (
        <Dropdown
            placement="bottom-end"
        >
            <DropdownTrigger>
                {triggerElement}
            </DropdownTrigger>
            <DropdownMenu
                variant="solid"
                aria-label="Custom dropdown menu"
                onAction={(key) => handleAction(key)}>
                {items.map((item: any) => (
                    <DropdownItem
                        key={item.key}
                        className={`${item.className} py-2`}
                        color={item.color}
                        startContent={item.startContent}
                    >
                        {item.label}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
}

export default CustomDropdown;
