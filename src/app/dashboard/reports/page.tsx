'use client'

import { useRouter } from 'next/navigation'

import { ReportService } from '@/api/Report/ReportService'
import ReportCard from '@/components/Card/ReportCard'
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import ReportIcon from '@/components/Icons/ReportIcon'

export default function ReportPage() {
	const router = useRouter()

	const handleDownloadEvidenceReport = () => {
		ReportService.generateEvidencesReport()
			.then((res) => {
				const url = window.URL.createObjectURL(new Blob([res.data]))
				const link = document.createElement('a')
				link.href = url
				link.setAttribute('download', 'reporte_evidencias.docx')
				document.body.appendChild(link)
				link.click()
			})
	}

	const handleDownloadNarrativeReport = () => {
		ReportService.generateNarrativesReport()
			.then((res) => {
				const url = window.URL.createObjectURL(new Blob([res.data]))
				const link = document.createElement('a')
				link.href = url
				link.setAttribute('download', 'reporte_narrativas.docx')
				document.body.appendChild(link)
				link.click()
			})
	}

	const handleDownloadPlanReport = () => {
		ReportService.generateSummaryPlansReport()
			.then((res) => {
				const url = window.URL.createObjectURL(new Blob([res.data]))
				const link = document.createElement('a')
				link.href = url
				link.setAttribute('download', 'reporte_plan_resumen.docx')
				document.body.appendChild(link)
				link.click()
			})
	}

	return (
		<div className='h-screen bg-gray-100 flex-col'>
			<ContentWrapper className='bg-lightBlue-600 p-5 h-[300px]'>
				<div className='flex items-center gap-2 pt-16 pl-6'>
					<ReportIcon width={40} height={40} fill='fill-white'/>
					<div className='text-white'>
						<h1 className='text-xl font-bold uppercase' >Reportes</h1>
						<p className='text-base'>Aqui se muestran los reportes que puede realizar un administrador</p>
					</div>
				</div>
			</ContentWrapper>
			<ContentWrapper className='bg-white -top-24 m-auto w-[96%] rounded-md p-6 flex-1'>
				<h3 className='text-xl font-semibold uppercase'>Generar reportes</h3>
				<div className='py-8 px-4 w-full flex flex-row flex-wrap gap-5'>
					<ReportCard
						color='blue'
						title='Reporte de evidencias'
						description='Genera un reporte de lista de evidencias'
						generateReport={handleDownloadEvidenceReport}
					/>
					<ReportCard
						color='orange'
						title='Reporte de narrativas'
						description='Genera un reporte de lista de narrativas'
						generateReport={handleDownloadNarrativeReport}
					/>
					<ReportCard
						color='green'
						title='Reporte de plan de mejora'
						description='Genera un reporte de plan de mejoras'
						generateReport={handleDownloadPlanReport}
					/>
					<ReportCard
						color='grey'
						title='Reporte de identificación y contexto'
						description='Genera un reporte de identificación y contexto'
						generateReport={() => router.push('/dashboard/reports/identification-and-context')}
					/>
					<ReportCard
						color='grey'
						title='Reporte anual RRII'
						description='Genera un reporte anual de RRII'
						generateReport={() => alert('No disponible')}
					/>
				</div>
			</ContentWrapper>
		</div>
	)
}