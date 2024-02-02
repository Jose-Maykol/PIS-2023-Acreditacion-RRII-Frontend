/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import SemesterConfigurationsCard from '@/components/Card/SemesterConfigurationsCard'
import PlanChart from '@/components/Chart/PlanChart'
import PlanPerStandardChart from '@/components/Chart/PlanPerStandardChart'
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import GenerateReportForm from '@/components/Form/Report/GenerateReportForm'
import ReportIcon from '@/components/Icons/ReportIcon'
import AdminRolePage from '@/components/Role/AdminRolePage'

export default function AdminPage() {
	return (
		<AdminRolePage>
			<div className='h-full bg-gray-100 flex-col'>
				<ContentWrapper className='bg-lightBlue-600 p-5 h-[300px]'>
					<div className='flex items-center gap-2 pt-16 pl-6'>
						<ReportIcon width={40} height={40} fill='fill-white'/>
						<div className='text-white'>
							<h1 className='text-xl font-bold uppercase' >Panel de administrador</h1>
							<p className='text-base'>Aqui se muestran las opciones de administrador</p>
						</div>
					</div>
				</ContentWrapper>
				<ContentWrapper className='bg-white -top-24 m-auto w-[96%] rounded-md p-6 flex-1'>
					<div className='flex flex-row justify-between gap-8'>
						<div className='flex flex-col flex-wrap my-4 gap-4 items-start'>
							<SemesterConfigurationsCard/>
							<GenerateReportForm />
						</div>
						<div className='flex-1 flex flex-col my-4 gap-4 items-start'>
							<PlanPerStandardChart/>
							<PlanChart/>
						</div>
					</div>
				</ContentWrapper>
			</div>
		</AdminRolePage>
	)
}