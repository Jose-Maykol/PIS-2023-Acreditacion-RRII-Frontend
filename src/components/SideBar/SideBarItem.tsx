'use client'

import { Tooltip } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import React from 'react'
import { useNarrativeStore } from '@/store/useNarrativeStore'
import { useToast } from '@/hooks/toastProvider'

interface SideBarItemProps {
  isOpen: boolean
  icon: React.ReactNode
  text: string
  link: string
  disabled?: boolean
}

export default function SideBarItem({
	isOpen,
	icon,
	text,
	link,
	disabled = false
}: SideBarItemProps) {
	const pathname = usePathname()
	const isCurrentPath =
    link === '/dashboard' ? pathname === link : pathname.startsWith(link)
	const backgroundColor = isCurrentPath
		? 'bg-lightBlue-600 bg-opacity-30 text-lightBlue-600'
		: 'text-gray-700'
	const fillClassName = isCurrentPath ? 'fill-lightBlue-600' : 'fill-black'
	const iconFill = React.cloneElement(icon as React.ReactElement, {
		fill: fillClassName
	})
	const { isEditingNarrative } = useNarrativeStore()
	const { showToast, updateToast } = useToast()
	const router = useRouter()

	const handleClick = (link: any) => {
		if (isEditingNarrative) {
			const notification = showToast('verificando...')
			updateToast(notification, 'No es posible realizar esta acción mientras la narrativa este siendo editada', 'info')
			return
		}
		router.push(link)
	}

	return (
		<>
			{disabled
				? (
					<li
						className={`${
							isOpen ? 'p-3' : 'p-1'
						} w-full h-8 my-1 rounded-md text-gray-400 bg-gray-200 cursor-not-allowed`}
					>
						<div
							className={`text-base-regular flex flex-row items-center h-full w-full ${
								isOpen ? '' : 'justify-center'
							}`}
						>
							{iconFill}
							{isOpen && (
								<span className='pl-2 font-bold uppercase'>{text}</span>
							)}
						</div>
					</li>
				)
				: (
					<>
						{!isOpen
							? (
								<Tooltip
									placement='right'
									content={
										<div className='text-sm font-semibold uppercase'>
											{text}
										</div>
									}
								>
									<li
										className={`${
											isOpen ? 'p-3' : 'p-1'
										} w-full h-8 my-1 hover:bg-gray-300 rounded-md ${backgroundColor}`}
									>
										{/* <Link
											href={link}
											className={`text-base-regular flex flex-row items-center h-full w-full ${
												isOpen ? '' : 'justify-center'
											}`}
										>
											{iconFill}
											{isOpen && <span className='pl-2 font-bold uppercase'>{text}</span>}
										</Link> */}
										<div
											onClick={() => handleClick(link)}
											className={`text-base-regular flex flex-row items-center h-full w-full ${
												isOpen ? '' : 'justify-center'
											}`}
										>
											{iconFill}
											{isOpen && <span className='pl-2 font-bold uppercase'>{text}</span>}
										</div>
									</li>
								</Tooltip>
							)
							: (
								<li
									className={`${
										isOpen ? 'p-3' : 'p-1'
									} w-full h-8 my-1 hover:bg-gray-300 rounded-md ${backgroundColor}`}
								>
									<Link
										href={link}
										className={`text-base-regular flex flex-row items-center h-full w-full ${
											isOpen ? '' : 'justify-center'
										}`}
									>
										{iconFill}
										{isOpen && <span className='pl-2 font-bold uppercase'>{text}</span>}
									</Link>
								</li>
							)}
					</>
				)}
		</>
	)
}
