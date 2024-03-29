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
import RedirectIcon from '@/components/Icons/RedirectIcon'
import ChevronDownIcon from '@/components/Icons/ChevronDownIcon'
import PencilIcon from '@/components/Icons/PencilIcon'
import FileIcon from '@/components/Icons/FileIcon'
import FolderMoveIcon from '@/components/Icons/FolderMoveIcon'
import DownloadIcon from '@/components/Icons/DownloadIcon'
import TrashIcon from '@/components/Icons/TrashIcon'

import CheckIcon from '@/components/Icons/CheckIcon'
import CloseIcon from '@/components/Icons/CloseIcon'

export const getFileIcon = (fileName?: string, type?: string, size: number = 24, fill?: string): React.JSX.Element | null => {
	let fileExtension

	if (fileName) fileExtension = fileName.split('.').pop()?.toLowerCase()
	if (type) fileExtension = type

	switch (fileExtension) {
	case 'pdf':
		return <PdfIcon width={size} height={size} fill={fill}/>
	case 'doc':
	case 'docx':
		return <DocIcon width={size} height={size} fill={fill}/>
	case 'xls':
	case 'xlsx':
		return <ExcelIcon width={size} height={size} fill={fill}/>
	case 'ppt':
	case 'pptx':
		return <PowerPointIcon width={size * 0.75} height={size} fill={fill}/>
	case 'zip':
		return <ZipperIcon width={size} height={size} fill={fill}/>
	case 'folder':
		return <FolderIcon width={size} height={size} fill={fill}/>
	case 'folderMove':
		return <FolderMoveIcon width={size} height={size} fill={fill} />
	default:
		return <FileIcon width={size} height={size} fill={fill}/>
	}
}

export const getCommonIcon = (name: string, size: number = 24, fillColor?: string) : React.JSX.Element => {
	const icons: Record<string, React.JSX.Element> = {
		plus: <PlusIcon width={size} height={size} fill={fillColor} />,
		search: <SearchIcon width={size} height={size} fill={fillColor} />,
		redirect: <RedirectIcon width={size} height={size} fill={fillColor} />,
		chevron: <ChevronDownIcon width={size} height={size} fill={fillColor} />,
		pencil: <PencilIcon width={size} height={size} fill={fillColor} />,
		download: <DownloadIcon width={size} height={size} fill={fillColor} />,
		trash: <TrashIcon width={size} height={size} fill={fillColor} />,
		check: <CheckIcon width={size} height={size} fill={fillColor} />,
		close: <CloseIcon width={size} height={size} fill={fillColor} />
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