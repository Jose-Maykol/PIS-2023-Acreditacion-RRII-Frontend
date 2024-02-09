import { StatisticService } from '@/api/Statistic/StatisticService'
import { useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, BarController, Tooltip, Legend, ChartOptions } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useYearSemesterStore } from '@/store/useYearSemesterStore'
import { useQuery } from 'react-query'
import { Spinner } from '@nextui-org/react'

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, BarController, Tooltip, Legend)

type ChartData = {
  labels: string[]
  datasets: {
    data: number[]
    backgroundColor: string[]
    hoverBackgroundColor: string[]
  }[]
}

type data = {
  standard_id: number
  standard_name: string
  total_plans: number
}

export default function PlanPerStandardChart() {
	const [chartData, setCharData] = useState<ChartData | null >(null)
	const { year, semester } = useYearSemesterStore()

	const { data, isLoading } = useQuery(
		['plansPerStandard', year, semester],
		() => StatisticService.plansPerStandardStatistics(), {
			onSuccess(data) {
				const labels = data.data.map((plan: data) => `E${plan.standard_id}`)
				const values = data.data.map((plan: data) => plan.total_plans)
				setCharData({
					labels,
					datasets: [
						{
							data: values,
							backgroundColor: ['#FF6384'],
							hoverBackgroundColor: ['#FF6384']
						}
					]
				})
			},
			retry: 2,
			enabled: !!year && !!semester
		}
	)

	const options: ChartOptions<'bar'> = {
		plugins: {
			legend: {
				display: false
			},
			tooltip: {
				callbacks: {
					label: function(context) {
						const label = data.data[context.dataIndex].standard_name
						return label
					}
				}
			}
		}
	}

	if (isLoading) {
		return (
			<div className='h-[440px] max-h-[440px] w-full border border-lightBlue-600 border-dashed rounded-lg p-4 flex justify-center items-center'>
				<Spinner/>
			</div>
		)
	}

	if (data && data.data.every((plan: data) => plan.total_plans === 0)) {
		return (
			<div className='h-[440px] max-h-[440px] w-full border border-lightBlue-600 border-dashed rounded-lg p-4 flex flex-col items-center justify-center'>
				<p className='text-neutral-400 text-sm'>No hay datos para mostrar</p>
			</div>
		)
	}

	return (
		<div className='h-[440px] max-h-[440px] w-full border border-lightBlue-600 border-dashed rounded-lg p-4'>
			<h2 className='text-lg font-semibold text-lightBlue-600'>Planes de mejora por estándar</h2>
			<div className='flex items-center justify-center h-[350px] max-h-[350px] my-4'>
				{chartData && <Bar data={chartData} options={options}/>}
			</div>
		</div>
	)
}