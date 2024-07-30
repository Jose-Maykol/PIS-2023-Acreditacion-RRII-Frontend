'use client'

import { EvidenceService } from '@/api/Evidence/EvidenceService'
import { useEffect, useState } from 'react'
import { Progress, Tooltip, Divider, CircularProgress } from '@nextui-org/react'
import ChevronDownIcon from '@/components/Icons/ChevronDownIcon'
import StandardIcon from '@/components/Icons/StandardIcon'

interface EvidenceData {
	id: number
	content: string
	name: string
	extension: string
	type: string
	file: string
}

export default function EvidencesLayout({ params }: { params: { id: number }}) {
	const id = params.id.toString()
	const [listEvidences, setListEvidences] = useState<EvidenceData[]>([])
	const [evidenceData, setEvidenceData] = useState<EvidenceData | null >(null)
	const [content, setContent] = useState<string>('')
	const [loadingManager, setLoadingManager] = useState<{loadingPage: boolean, loadingPreview: boolean}>({ loadingPage: true, loadingPreview: false })
	const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(true)
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
			}
		}).catch((err) => {
			console.log(err.response.data)
		})
	}, [])

	const toggleSidebar = () => setIsOpenSidebar(!isOpenSidebar)

	const handlePreview = async (id: number) => {
		setActiveRowId(id)
		setLoadingManager({ ...loadingManager, loadingPreview: true })
		await EvidenceService.viewEvidence(String(id)).then((res) => {
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

	return (
		<div className='w-full h-full flex gap-1'>
			<div className={`flex justify-between ${isOpenSidebar ? 'w-[220px]' : 'w-[20px]'} h-full absolute left-0 top-0 bg-[#0D0D0D]`}>
				<div className={isOpenSidebar ? 'w-[200px] h-full' : 'hidden'}>
					<h2 className='text-white font-semibold p-2 text-md'>Evidencias</h2>
					<Divider className='my-2 bg-white' />
					{listEvidences.map((evidence) => (
						<div className={`flex items-center justify-between ml-2 mr-1 p-1 hover:bg-[#262626] cursor-pointer rounded-md mb-1 text-white text-tiny active:bg-[#262626] ${activeRowId === evidence.id && 'bg-[#262626]'}`} onClick={() => handlePreview(evidence.id)}>
							<p className='w-[85%] truncate text-ellipsis'>{evidence.name}</p>
							<div className='bg-transparent w-4 h-4'>
								<StandardIcon width={16} height={16} fill='fill-white' />
							</div>
						</div>
					))}
				</div>
				<div className='w-[20px] h-full flex items-center justify-center bg-transparent'>
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
							<ChevronDownIcon width={25} height={20} fill='fill-default-400 group-hover:fill-white' />
						</div>
					</Tooltip>
				</div>
			</div>
			{ loadingManager.loadingPreview
				? (
					<div style={{ position: 'absolute', right: 0, top: 0, width: ` ${isOpenSidebar ? 'calc(100% - 220px)' : 'calc(100% - 20px)'}`, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#525659' }} >
						<CircularProgress
							label='Cargando previsualizacion...'
							size='md'
							color={'primary'}
							showValueLabel={true}
							style={{ color: 'white' }}
						/>
					</div>
				)
				: (
					<embed
						title={evidenceData?.name}
						// id={evidenceData.name}
						style={{ position: 'absolute', right: 0, top: 0, width: ` ${isOpenSidebar ? 'calc(100% - 220px)' : 'calc(100% - 20px)'}`, height: '100%', color: '#171717' }}
						src={content}
						type={evidenceData?.type}
					/>
				)
			}
		</div>
	)
}