'use client'

import DateSemesterService from '@/api/DateSemester/DateSemester'
import { ReportService } from '@/api/Report/ReportService'
import ReportCard from '@/components/Card/ReportCard'
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import ReportIcon from '@/components/Icons/ReportIcon'
import { useYearSemesterStore } from '@/store/useYearSemesterStore'
import { Button, Select, SelectItem, Selection } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

type Semester = 'A' | 'B'

interface YearSemester {
	year: number
	semester: Semester[]
}

export default function ReportPage() {
	const { year, semester } = useYearSemesterStore()
	const [years, setYears] = useState<{ value: string }[]>([{ value: year?.toString() || '2023' }])
	const [semesters, setSemesters] = useState<{ value: string }[]>([{ value: semester || 'C' }])
	const [yearSemester, setYearSemester] = useState<YearSemester[]>([])
	const [yearIndex, setYearIndex] = useState(0)
	const [semesterIndex, setSemesterIndex] = useState(0)

	const downloadEvidenceReport = (params: any) => {
		ReportService.generateEvidencesReport(params)
			.then((res) => {
				const url = window.URL.createObjectURL(new Blob([res.data]))
				const link = document.createElement('a')
				link.href = url
				link.setAttribute('download', 'reporte_evidencias.docx')
				document.body.appendChild(link)
				link.click()
			}
			)
	}

	const downloadNarrativeReport = (params: any) => {
		ReportService.generateNarrativesReport(params)
			.then((res) => {
				const url = window.URL.createObjectURL(new Blob([res.data]))
				const link = document.createElement('a')
				link.href = url
				link.setAttribute('download', 'reporte_narrativas.docx')
				document.body.appendChild(link)
				link.click()
			}
			)
	}

	const downloadPlanReport = () => {
		ReportService.generateSummaryPlansReport()
			.then((res) => {
				const url = window.URL.createObjectURL(new Blob([res.data]))
				const link = document.createElement('a')
				link.href = url
				link.setAttribute('download', 'reporte_plan_resumen.docx')
				document.body.appendChild(link)
				link.click()
			}
			)
	}

	const downloadContextReport = () => {
		ReportService.generateContextReport()
			.then((res) => {
				const url = window.URL.createObjectURL(new Blob([res.data]))
				const link = document.createElement('a')
				link.href = url
				link.setAttribute('download', 'reporte_identificacion_contexto.docx')
				document.body.appendChild(link)
				link.click()
			}
			)
	}

	const reports = [
		{ label: 'Reporte de evidencias', value: 'evidences' },
		{ label: 'Reporte de narrativas', value: 'narratives' },
		{ label: 'Reporte de plan de mejora', value: 'plan' },
		{ label: 'Reporte de identificación y contexto', value: 'context' }
		// { label: 'Reporte anual RRII', value: 'rrhh' }
	]

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const data = new FormData(e.currentTarget)
		const reportType = data.get('report')
		const params = {
			startYear: data.get('startYear'),
			startSemester: data.get('startSemester'),
			endYear: data.get('endYear'),
			endSemester: data.get('endSemester')
		}

		if (reportType === 'evidences') {
			downloadEvidenceReport(params)
		} else if (reportType === 'narratives') {
			downloadNarrativeReport(params)
		} else if (reportType === 'plan') {
			downloadPlanReport()
		} else if (reportType === 'context') {
			downloadContextReport()
		}
	}

	useEffect(() => {
		DateSemesterService.getAll().then((res) => {
			const data: YearSemester[] = res.data
			setYearSemester(res.data)
			const valueYear = Array.from(new Set(data.map(data => data.year)))
				.map(year => ({ value: year.toString() }))
			setYears(valueYear)
			const valueSemesters = data.reduce((result, data) => {
				if (data.year === parseInt(years[0].value)) {
					const semesterValues = data.semester.map(s => ({ value: s }))
					result.push(...semesterValues)
				}
				return result
			}, [] as { value: string }[])
			setSemesters(valueSemesters)
		})
		setYearIndex(years.findIndex(item => item.value === (year?.toString())))
		setSemesterIndex(semesters.findIndex(item => item.value === (semester)))
	}, [])

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
				<form className='py-8 w-[600px] flex flex-row flex-wrap gap-5' onSubmit={handleSubmit}>
					<Select
						defaultSelectedKeys={[reports[0].value]}
						name='report'
						labelPlacement='outside'
						label='Tipo de reporte'
						placeholder='Seleccione un reporte'
						disallowEmptySelection
					>
						{reports.map((report) => (
							<SelectItem key={report.value} value={report.value}>
								{report.label}
							</SelectItem>
						))}
					</Select>
					<div className='flex flex-row justify-between gap-4 w-full'>
						<Select
							defaultSelectedKeys={[years[yearIndex]?.value]}
							name='startYear'
							placeholder='Año'
							label='Semestre inicial'
							labelPlacement='outside'
							size='sm'
							selectionMode='single'
							disallowEmptySelection
							// onSelectionChange={handleYearValue}
						>
							{
								years.map((year) => (
									<SelectItem key={year.value} value={year.value}>
										{year.value}
									</SelectItem>
								))
							}
						</Select>
						<Select
							defaultSelectedKeys={[semesters[semesterIndex]?.value]}
							name='startSemester'
							placeholder='Semestre'
							label=''
							labelPlacement='outside'
							size='sm'
							selectionMode='single'
							className='pr-8'
							disallowEmptySelection
							// onSelectionChange={handleSemesterValue}
						>
							{
								semesters.map((semester) => (
									<SelectItem key={semester.value} value={semester.value}>
										{semester.value}
									</SelectItem>
								))
							}
						</Select>
						<Select
							defaultSelectedKeys={[years[yearIndex]?.value]}
							name='endYear'
							placeholder='Año'
							label='Semestre final'
							labelPlacement='outside'
							size='sm'
							selectionMode='single'
							disallowEmptySelection
							// onSelectionChange={handleYearValue}
						>
							{
								years.map((year) => (
									<SelectItem key={year.value} value={year.value}>
										{year.value}
									</SelectItem>
								))
							}
						</Select>
						<Select
							defaultSelectedKeys={[semesters[semesterIndex]?.value]}
							name='endSemester'
							placeholder='Semestre'
							label=''
							labelPlacement='outside'
							size='sm'
							selectionMode='single'
							disallowEmptySelection
							// onSelectionChange={handleSemesterValue}
						>
							{
								semesters.map((semester) => (
									<SelectItem key={semester.value} value={semester.value}>
										{semester.value}
									</SelectItem>
								))
							}
						</Select>
					</div>
					<Button
						radius='sm'
						color='primary'
						className='w-full'
						type='submit'
					>
						<strong className='mx-2 uppercase text-xs'>Generar reporte</strong>
					</Button>
				</form>
			</ContentWrapper>
		</div>
	)
}