import { StatisticService } from '@/api/Statistic/StatisticService'
import { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, BarController, Tooltip, Legend, ChartOptions } from 'chart.js'
import { Bar } from 'react-chartjs-2'

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
	const [data, setData] = useState<data[]>([])

	useEffect(() => {
		StatisticService.plansPerStandardStatistics().then((res) => {
			setData(res.data)
			const labels = res.data.map((plan: data) => `E${plan.standard_id}`)
			const values = res.data.map((plan: data) => plan.total_plans)

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
		})
	}, [])

	const options: ChartOptions<'bar'> = {
		plugins: {
			legend: {
				display: false
			},
			tooltip: {
				callbacks: {
					label: function(context) {
						const label = data[context.dataIndex].standard_name
						return label
					}
				}
			}
		}
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