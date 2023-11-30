'use client'

import { EvidenceService } from '@/api/Evidence/EvidenceService'
import { useEffect, useState } from 'react'
import { Button, Link } from '@nextui-org/react'
import UnsupportedFileIcon from '@/components/Icons/UnsupportedFIleIcon'
import DownloadIcon from '@/components/Icons/DownloadIcon'

interface EvidenceData {
  content: string
  name: string
  extension: string
  type: string
}

export default function EvidencesLayout({ params }: { params: { id: number }}) {
	const id = params.id.toString()
	const [evidenceData, setEvidenceData] = useState<EvidenceData | null >(null)

	useEffect(() => {
		EvidenceService.viewEvidence(id).then((res) => {
			setEvidenceData(res.data)
			console.log(res.data)
		})
	}, [])

	const allowedMimeTypes = [
		'application/pdf',
		'image/jpeg',
		'image/png',
		'image/jpg',
		'image/gif'
	]

	const handleDownload = async () => {
		if (evidenceData) {
			EvidenceService.downloadFile(id).then((res) => {
				const contentDisposition = res.headers['content-disposition']
				let filename = evidenceData.name
				if (contentDisposition) {
					const filenameMatch = contentDisposition.match(/filename="?(.+)"?/)
					if (filenameMatch) {
						filename = filenameMatch[1]
					}
				}
				const url = URL.createObjectURL(res.data)
				const link = document.createElement('a')
				link.href = url
				link.download = filename
				document.body.appendChild(link)
				link.click()
				document.body.removeChild(link)
				URL.revokeObjectURL(url)
			})
		}
	}

	if (!evidenceData) {
		return null
	}

	if (!allowedMimeTypes.includes(evidenceData.type)) {
		return (
			<div className='flex flex-col gap-4 items-center justify-center w-full h-screen bg-neutral-800 text-white'>
				<UnsupportedFileIcon width={400} height={400} fill='fill-white' />
				<p>Esta evidencia no se puede visualizar.</p>
				<Button
					color='primary'
					startContent={<DownloadIcon width={20} height={20} fill='fill-white' />}
					onPress={handleDownload}
					className='font-bold'
				>
					Descargar documento
				</Button>
			</div>
		)
	}

	return (
		<embed
			title={evidenceData.name}
			id={evidenceData.name}
			style={{ position: 'absolute', left: 0, top: 0 }}
			width='100%'
			height='100%'
			src={`data:${evidenceData.type};base64,${evidenceData.content}`}
			type={evidenceData.type}
		/>
	)
}