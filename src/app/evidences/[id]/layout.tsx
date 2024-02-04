'use client'

import { EvidenceService } from '@/api/Evidence/EvidenceService'
import { useEffect, useState } from 'react'
import { Button, Spinner } from '@nextui-org/react'
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
	const [listEvidences, setListEvidences] = useState<any[]>([])
	const [evidenceData, setEvidenceData] = useState<EvidenceData | null >(null)
	const [content, setContent] = useState<string>('')
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		EvidenceService.viewEvidenceNarrative(id).then((res) => {
			if (Array.isArray(res.data)) {
				setListEvidences(res.data)
			} else {
				const byteCharacters = atob(res.data.content)
				const byteNumbers = new Array(byteCharacters.length)
				for (let i = 0; i < byteCharacters.length; i++) {
					byteNumbers[i] = byteCharacters.charCodeAt(i)
				}
				const byteArray = new Uint8Array(byteNumbers)
				const blob = new Blob([byteArray], { type: res.data.type })
				const blobUrl = URL.createObjectURL(blob)
				const anchor = document.createElement('a')
				anchor.href = blobUrl
				anchor.download = res.data.name
				setContent(blobUrl)
				setEvidenceData(res.data)
				setLoading(false)
			}
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

	if (loading) {
		return (
			<div className='flex flex-col gap-4 items-center justify-center w-full h-screen bg-neutral-800 '>
				<Spinner size='lg' />
			</div>
		)
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
					Descargar evidencia
				</Button>
			</div>
		)
	}

	return (
		<>
			{/* <div className='flex flex-row justify-between items-center absolute top-0 left-0 w-full h-14 bg-neutral-800 z-10 px-4'>
				<p className='text-white'>{`${evidenceData.name}.${evidenceData.extension}`}</p>
				<Button
					color='primary'
					startContent={<DownloadIcon width={20} height={20} fill='fill-white' />}
					onPress={handleDownload}
					className='font-bold'
				>
					Descargar evidencia
				</Button>
			</div> */}
			<embed
				title={evidenceData.name}
				id={evidenceData.name}
				style={{ position: 'absolute', left: 0, top: 0 }}
				width='100%'
				height='100%'
				src={content}
				type={evidenceData.type}
			/>
		</>
	)
}