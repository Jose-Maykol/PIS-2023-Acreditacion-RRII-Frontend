"use client"

import React from "react";

import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

export default function TabStandard({ children }: { children: React.ReactNode }) {
    let tabs = [
        {
            id: "narrativa",
            label: "narrativas",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            id: "panificacion",
            label: "evidencia de planificacion",
            content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        },
        {
            id: "resultados",
            label: "evidencia de resultados",
            content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            id: "mejoras",
            label: "evidencia de mejoras",
            content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            id: "actas",
            label: "actas",
            content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    ];

    return (
        <div className="flex h-full w-full flex-col absolute -top-11 -left-1 -right-">
            <Tabs aria-label="Dynamic tabs" items={tabs} variant="light" classNames={{ base: '', tab: 'rounded-t-xl rounded-b-none h-10', tabContent: 'text-white text-lg uppercase', cursor: 'bg-gray-200 rounded-t-xl rounded-b-none', panel: 'absolute top-[42px] bg-gray-200 h-full p-10 w-full' }}>
                {(item) => (
                    <Tab key={item.id} title={item.label}>
                        {children}
                    </Tab>
                )}
            </Tabs>
        </div>
    );
}
