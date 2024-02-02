/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import DateSemesterService from '@/api/DateSemester/DateSemester'
import { ReportService } from '@/api/Report/ReportService'
import { useToast } from '@/hooks/toastProvider'
import { useYearSemesterStore } from '@/store/useYearSemesterStore'
import { Button, Select, SelectItem, Selection, Spinner } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

type Semester = 'A' | 'B'

interface YearSemester {
	year: number
	semester: Semester[]
}

export default function GenerateReportForm() {
	const { year, semester } = useYearSemesterStore()
	const [years, setYears] = useState<{ value: string }[]>([{ value: year?.toString() || '2023' }])
	const [semesters, setSemesters] = useState<{ value: string }[]>([{ value: semester || 'B' }])
	const [yearIndex, setYearIndex] = useState(0)
	const [semesterIndex, setSemesterIndex] = useState(0)
	const [activeFilters, setActiveFilters] = useState(false)
	const { showToast, updateToast } = useToast()

	const downloadEvidenceReport = (params: any) => {
		const notification = showToast('Generando reporte...')
		ReportService.generateEvidencesReport(params)
			.then((res) => {
				const url = window.URL.createObjectURL(new Blob([res.data]))
				const link = document.createElement('a')
				link.href = url
				link.setAttribute('download', 'reporte_evidencias.docx')
				document.body.appendChild(link)
				link.click()
				updateToast(notification, 'Reporte generado', 'success')
			}).catch((err) => {
				updateToast(notification, err.message, 'error')
			})
	}

	const downloadNarrativeReport = (params: any) => {
		const notification = showToast('Generando reporte...')
		ReportService.generateNarrativesReport(params)
			.then((res) => {
				const url = window.URL.createObjectURL(new Blob([res.data]))
				const link = document.createElement('a')
				link.href = url
				link.setAttribute('download', 'reporte_narrativas.docx')
				document.body.appendChild(link)
				link.click()
				updateToast(notification, 'Reporte generado', 'success')
			}).catch((err) => {
				updateToast(notification, err.message, 'error')
			})
	}

	const downloadPlanReport = () => {
		const notification = showToast('Generando reporte...')
		ReportService.generateSummaryPlansReport()
			.then((res) => {
				const url = window.URL.createObjectURL(new Blob([res.data]))
				const link = document.createElement('a')
				link.href = url
				link.setAttribute('download', 'reporte_plan_resumen.docx')
				document.body.appendChild(link)
				link.click()
				updateToast(notification, 'Reporte generado', 'success')
			}).catch((err) => {
				updateToast(notification, err.message, 'error')
			})
	}

	const downloadContextReport = () => {
		const notification = showToast('Generando reporte...')
		ReportService.generateContextReport()
			.then((res) => {
				const url = window.URL.createObjectURL(new Blob([res.data]))
				const link = document.createElement('a')
				link.href = url
				link.setAttribute('download', 'reporte_identificacion_contexto.docx')
				document.body.appendChild(link)
				link.click()
				updateToast(notification, 'Reporte generado', 'success')
			}).catch((err) => {
				updateToast(notification, err.message, 'error')
			})
	}

	const reports = [
		{ label: 'Reporte de evidencias', value: 'evidences' },
		{ label: 'Reporte de narrativas', value: 'narratives' },
		{ label: 'Reporte de plan de mejora', value: 'plan' },
		{ label: 'Reporte de identificación y contexto', value: 'context' }
		// { label: 'Reporte anual RRII', value: 'rrhh' }
	]

	const handleReport = (value: Selection): void => {
		const reportType = (value as any).values().next().value
		if (reportType === 'evidences') {
			setActiveFilters(false)
		} else if (reportType === 'narratives') {
			setActiveFilters(false)
		} else if (reportType === 'plan') {
			setActiveFilters(true)
		} else if (reportType === 'context') {
			setActiveFilters(true)
		}
	}

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

	const { isLoading } = useQuery(
		['generateReports', year, semester],
		() => DateSemesterService.getAll(), {
			onSuccess(res) {
				const data = res.data as YearSemester[]
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
			},
			retry: 2,
			staleTime: Infinity,
			enabled: !!year && !!semester
		}
	)

	useEffect(() => {
		setYearIndex(years.findIndex(item => item.value === (year?.toString())))
		setSemesterIndex(semesters.findIndex(item => item.value === (semester?.toString())))
	}, [year, semester])

	if (isLoading) {
		return (
			<div className='border border-lightBlue-600 border-dashed rounded-lg p-4 w-[600px] h-[276px] flex justify-center content-center'>
				<Spinner/>
			</div>
		)
	}

	return (
		<div className='border border-lightBlue-600 border-dashed rounded-lg p-4'>
			<h2 className='text-lg font-semibold text-lightBlue-600'>Generar reporte</h2>
			<form className='pt-4 w-[600px] flex flex-row flex-wrap gap-5' onSubmit={handleSubmit}>
				<Select
					defaultSelectedKeys={[reports[0].value]}
					name='report'
					labelPlacement='outside'
					label='Tipo de reporte'
					placeholder='Seleccione un reporte'
					disallowEmptySelection
					onSelectionChange={handleReport}
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
						isDisabled={activeFilters}
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
						isDisabled={activeFilters}
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
						isDisabled={activeFilters}
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
						isDisabled={activeFilters}
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
		</div>
	)
}