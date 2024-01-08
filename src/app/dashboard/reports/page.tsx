/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import SemesterConfigurationsCard from '@/components/Card/SemesterConfigurationsCard'
import PlanChart from '@/components/Chart/PlanChart'
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import GenerateReportForm from '@/components/Form/Report/GenerateReportForm'
import ReportIcon from '@/components/Icons/ReportIcon'

export default function ReportPage() {
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
				<div className='flex flex-row flex-wrap my-4 gap-4 items-start'>
					<PlanChart/>
					<SemesterConfigurationsCard/>
					<GenerateReportForm />
				</div>
			</ContentWrapper>
		</div>
	)
}