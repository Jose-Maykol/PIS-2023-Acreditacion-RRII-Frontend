import React from 'react'

interface ContentWrapperProps {
	children?: React.JSX.Element | Array<React.JSX.Element>
	className?: string
}

export default function ContentWrapper({ children, className }: ContentWrapperProps) {
	return <div className={`relative px-4 ${className}`}>{children}</div>
}
