import React from 'react'

import PdfIcon from '@/components/Icons/PdfIcon'
import DocIcon from '@/components/Icons/DocIcon'
import ExcelIcon from '@/components/Icons/ExcelIcon'
import PowerPointIcon from '@/components/Icons/PowerPointIcon'
import ZipperIcon from '@/components/Icons/ZipperIcon'
import FolderPlusIcon from '@/components/Icons/FolderPlusIcon'

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
		return <PowerPointIcon width={size} height={size} />
	case 'zip':
		return <ZipperIcon width={size} height={size} />
	case 'folder':
		return <FolderPlusIcon width={size} height={size} />
	default:
		return null
	}
}

export function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1)
}
