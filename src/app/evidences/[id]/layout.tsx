'use client'

import { EvidenceService } from '@/api/Evidence/evidenceService'
import { useEffect, useState } from 'react'

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

	if (!evidenceData) {
		return null
	}

	if (!allowedMimeTypes.includes(evidenceData.type)) {
		return <div className='flex flex-row items-center justify-center w-full h-screen bg-neutral-800 text-white'>Esta evidencia no se puede visualizar.</div>
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