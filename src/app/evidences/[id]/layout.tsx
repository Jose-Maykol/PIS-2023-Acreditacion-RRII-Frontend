'use client'

import { EvidenceService } from '@/api/Evidence/EvidenceService'
import { useEffect, useState } from 'react'
import { Progress, Tooltip, Divider, Spinner } from '@nextui-org/react'
import UnsupportedFileIcon from '@/components/Icons/UnsupportedFIleIcon'
import DownloadIcon from '@/components/Icons/DownloadIcon'
import ChevronDownIcon from '@/components/Icons/ChevronDownIcon'

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
	const [loadingManager, setLoadingManager] = useState<{loadingPage: boolean, loadingPreview: boolean}>({ loadingPage: true, loadingPreview: false })
	const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false)
	const [activeRowId, setActiveRowId] = useState<number>(0)

	useEffect(() => {
		EvidenceService.viewEvidenceNarrative(id).then((res) => {
			if (Array.isArray(res.data)) {
				console.log(res.data)
				setListEvidences(res.data)
				setActiveRowId(res.data[0].id)
				handlePreview(res.data[0].id).then(() => {
					setLoadingManager({ ...loadingManager, loadingPage: false })
				})
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
				setLoadingManager({ ...loadingManager, loadingPage: false })
			}
		})
	}, [])

	const toggleSidebar = () => setIsOpenSidebar(!isOpenSidebar)

	const allowedMimeTypes = [
		'application/pdf',
		'image/jpeg',
		'image/png',
		'image/jpg',
		'image/gif'
	]

	const handlePreview = async (id: string) => {
		setActiveRowId(Number(id))
		setLoadingManager({ ...loadingManager, loadingPreview: true })
		await EvidenceService.viewEvidence(id).then((res) => {
			console.log('marrativa evidencia', res.data)
			if (res.data.extension === 'pdf') {
				const base64Data = res.data.content
				const binaryString = atob(base64Data)
				const byteArray = new Uint8Array(binaryString.length)
				for (let i = 0; i < binaryString.length; i++) {
					byteArray[i] = binaryString.charCodeAt(i)
				}
				const pdfBlob = new Blob([byteArray], { type: 'application/pdf' })
				const pdfUrl = URL.createObjectURL(pdfBlob)
				setContent(pdfUrl)
			}
		}).finally(() => setLoadingManager({ ...loadingManager, loadingPreview: false }))
	}

	const handleDownload = async () => {
		if (evidenceData) {
			EvidenceService.downloadFile(String(activeRowId)).then((res) => {
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

	// if (!evidenceData) {
	// 	return null
	// }

	if (loadingManager.loadingPage) {
		return (
			<div className='flex items-center justify-center w-full h-screen bg-neutral-800 '>
				<Progress
					label='La página se esta cargando...'
					size='sm'
					color='primary'
					isIndeterminate
					className='max-w-md'
					classNames={{
						label: 'font-bold text-white'
					}}
				/>
			</div>
		)
	}

	// if (!allowedMimeTypes.includes(evidenceData.type)) {
	// 	return (
	// 		<div className='flex flex-col gap-4 items-center justify-center w-full h-screen bg-neutral-800 text-white'>
	// 			<UnsupportedFileIcon width={400} height={400} fill='fill-white' />
	// 			<p>Esta evidencia no se puede visualizar.</p>
	// 			<Button
	// 				color='primary'
	// 				startContent={<DownloadIcon width={20} height={20} fill='fill-white' />}
	// 				onPress={handleDownload}
	// 				className='font-bold'
	// 			>
	// 				Descargar evidencia
	// 			</Button>
	// 		</div>
	// 	)
	// }

	return (
		<div className='w-full h-full flex gap-1'>
			<div className={`flex justify-between ${isOpenSidebar ? 'w-[220px]' : 'w-[20px]'} h-full absolute left-0 top-0 bg-neutral-700`}>
				<div className={isOpenSidebar ? 'w-[200px] h-full' : 'hidden'}>
					<h2 className='text-white font-semibold p-2 text-md'>Evidencias</h2>
					<Divider className='my-2 bg-white' />
					{listEvidences.map((evidence) => (
						<div className={`flex items-center justify-between mx-2 p-1 hover:bg-default-400 cursor-pointer rounded-md mb-1 text-white text-sm active:bg-default-100 ${activeRowId === evidence.id && 'bg-default-500'}`} onClick={() => handlePreview(evidence.id)}>
							<p>{evidence.name}</p>
							<div className='bg-transparent w-4 h-4 hover:bg-slate-400' onClick={handleDownload}>
								<DownloadIcon width={16} height={16} fill='fill-white' />
							</div>
						</div>
					))}
				</div>
				<div className='w-[20px] h-full flex items-center justify-center bg-neutral-800'>
					<Tooltip
						showArrow
						placement='right'
						content={isOpenSidebar ? 'Ocultar menu' : 'Mostrar menu'}
						classNames={{
							base: [
							// arrow color
								'before:bg-neutral-800 dark:before:bg-white'
							],
							content: [
								'py-1 px-2 shadow-xl',
								'text-white bg-neutral-800'
							]
						}}
					>
						<div className={`${isOpenSidebar ? 'rotate-90' : '-rotate-90'} w-5 h-5 bg-transparent group`} onClick={toggleSidebar}>
							<ChevronDownIcon width={20} height={20} fill='fill-default-400 group-hover:fill-white' />
						</div>
					</Tooltip>
				</div>
			</div>
			{ loadingManager.loadingPreview
				? (
					<div style={{ position: 'absolute', right: 0, top: 0, width: ` ${isOpenSidebar ? 'calc(100% - 220px)' : 'calc(100% - 20px)'}`, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgb(82, 82, 91)' }} >
						<Spinner label='Cargando...' color='primary' classNames={{ label: 'font-bold text-white' }}/>
					</div>
					// <div className={`absolute right-0 top-0 ${isOpenSidebar ? 'w-[calc(100% - 220px)]' : 'w-[calc(100% - 20px)]'} flex items-center justify-center h-screen bg-red-800`}>
					// <Spinner label='Loading...' labelColor='foreground' color='primary' />
					// </div>
				)
				: (
					<embed
						// title={evidenceData.name}
						// id={evidenceData.name}
						style={{ position: 'absolute', right: 0, top: 0, width: ` ${isOpenSidebar ? 'calc(100% - 220px)' : 'calc(100% - 20px)'}`, height: '100%' }}
						// width='100%'
						// height='100%'
						src={content}
						// type={evidenceData.type}
					/>
				)
			}
		</div>
	)
}