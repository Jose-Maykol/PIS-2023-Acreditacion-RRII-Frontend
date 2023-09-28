'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface SideBarItemProps {
  isOpen: boolean,
  icon: React.ReactNode,
  text: string,
  link: string,
}

export default function SideBarItem ({ isOpen, icon, text, link }: SideBarItemProps) {
	const pathname = usePathname()
	const isCurrentPath = pathname.startsWith(link)
	const backgroundColor = isCurrentPath ? 'bg-lightBlue-600 bg-opacity-30 text-lightBlue-600' : 'text-gray-700'
	const fillClassName = isCurrentPath ? 'fill-lightBlue-600' : 'fill-black'
	const iconFill = React.cloneElement(icon as React.ReactElement, {
		fill: fillClassName
	})

	return (
		<li className={`${isOpen ? 'p-3' : 'p-1'} w-full h-8 my-1 hover:bg-gray-300 rounded-md ${backgroundColor}`}>
			<Link href={link} className={`flex flex-row items-center h-full w-full ${isOpen ? '' : 'justify-center'}`}>
				{iconFill}
				{isOpen && (<span className='pl-2 font-bold uppercase'>{text}</span>)}
			</Link>
		</li>
	)
}