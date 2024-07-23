import { StatisticService } from '@/api/Statistic/StatisticService'
import { useYearSemesterStore } from '@/store/useYearSemesterStore'
import { Spinner } from '@nextui-org/react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js'
import { useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { useQuery } from 'react-query'
import EmptyEvidenceIcon from '../Icons/EmptyEvidenceIcon'

ChartJS.register(ArcElement, Tooltip, Legend)

type ChartData = {
  labels: string[]
  datasets: {
    data: number[]
    backgroundColor: string[]
    hoverBackgroundColor: string[]
  }[]
}

type data = {
	label: string
	value: number
}

export default function PlanChart() {
	const [chartData, setCharData] = useState<ChartData | null >(null)
	const { year, semester } = useYearSemesterStore()
	const { data, isLoading } = useQuery(
		['plansStatistics', year, semester],
		StatisticService.plansStatistics, {
			onSuccess(data) {
				const labels = data.data.map((plan: data) => plan.label)
				const values = data.data.map((plan: data) => plan.value)
				setCharData({
					labels,
					datasets: [
						{
							data: values,
							backgroundColor: ['#4CAF50', '#E74C3C', '#FFCD00', '#3498DB', '#FF5733'],
							hoverBackgroundColor: ['#388E3C', '#C0392B', '#FFC500', '#2980B9', '#D35400']
						}
					]
				})
			},
			retry: 2,
			refetchOnWindowFocus: true,
			enabled: !!year && !!semester
		}
	)

	const options: ChartOptions<'pie'> = {
		plugins: {
			legend: {
				position: 'right'
			}
		}
	}

	if (isLoading) {
		return (
			<div className='h-[400px] max-h-[400px] w-full min-w-[400px] border border-lightBlue-600 border-dashed rounded-lg p-4 flex items-center justify-center'>
				<Spinner/>
			</div>
		)
	}

	if (data && data.data.every((plan: data) => plan.value === 0)) {
		return (
			<div className='h-[400px] max-h-[400px] w-full min-w-[400px] border border-lightBlue-600 border-dashed rounded-lg p-4 flex flex-col items-center justify-center'>
				<EmptyEvidenceIcon width={100} height={100} fill='fill-neutral-400'/>
				<h2 className='text-neutral-400 text-sm pt-3'>No hay datos para mostrar</h2>
			</div>
		)
	}

	return (
		<div className='h-[400px] max-h-[400px] w-full min-w-[400px] border border-lightBlue-600 border-dashed rounded-lg p-4 flex flex-col items-center'>
			<h2 className='text-lg font-semibold text-lightBlue-600 self-start'>Planes de mejora por estado</h2>
			{chartData && <Pie data={chartData} options={options}/>}
		</div>
	)
}