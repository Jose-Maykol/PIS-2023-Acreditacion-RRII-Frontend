import React from 'react'

import PdfIcon from '@/components/Icons/PdfIcon'
import DocIcon from '@/components/Icons/DocIcon'
import ExcelIcon from '@/components/Icons/ExcelIcon'
import PowerPointIcon from '@/components/Icons/PowerPointIcon'
import ZipperIcon from '@/components/Icons/ZipperIcon'
import FolderPlusIcon from '@/components/Icons/FolderPlusIcon'
import FolderIcon from '@/components/Icons/FolderIcon'

import PlusIcon from '@/components/Icons/PlusIcon'
import SearchIcon from '@/components/Icons/SearchIcon'
import LinkIcon from '@/components/Icons/LinkIcon'
import ChevronDownIcon from '@/components/Icons/ChevronDownIcon'
import PencilIcon from '@/components/Icons/PencilIcon'
import FileIcon from '@/components/Icons/FileIcon'


export const getFileIcon = (fileName?: string, type?: string, size: number = 24): React.JSX.Element | null => {
	let fileExtension

	if (fileName) fileExtension = fileName.split('.').pop()?.toLowerCase()
	if (type) fileExtension = type

	switch (fileExtension) {
	case 'pdf':
		return <PdfIcon width={size} height={size} />
	case 'doc':
	case 'docx':
		return <DocIcon width={size} height={size} />
	case 'xls':
	case 'xlsx':
		return <ExcelIcon width={size} height={size} />
	case 'ppt':
	case 'pptx':
		return <PowerPointIcon width={size * 0.75} height={size} />
	case 'zip':
		return <ZipperIcon width={size} height={size} />
	case 'folder':
		return <FolderIcon width={size} height={size} />
	case 'folderPlus':
		return <FolderPlusIcon width={size} height={size} />
	default:
		return <FileIcon width={size} height={size} fill='fill-neutral-700'/>
	}
}

export const getCommonIcon = (name: string, size: number = 24, fillColor?: string) : React.JSX.Element => {
	const icons: Record<string, React.JSX.Element> = {
		plus: <PlusIcon width={size} height={size} fill={fillColor} />,
		search: <SearchIcon width={size} height={size} fill={fillColor} />,
		link: <LinkIcon width={size} height={size} fill={fillColor} />,
		chevron: <ChevronDownIcon width={size} height={size} fill={fillColor} />,
		pencil: <PencilIcon width={size} height={size} fill={fillColor} />
	}

	return name in icons ? icons[name] : <></>
}

export function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

export function formatIsoDateToCustom(isoDateString: string): string {
	const date = new Date(isoDateString)

	const months = [
		'ene', 'feb', 'mar', 'abr', 'may', 'jun',
		'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
	]

	const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()

	const formattedDate = `${day} ${months[date.getMonth()]} ${date.getFullYear()}`
	return formattedDate
}