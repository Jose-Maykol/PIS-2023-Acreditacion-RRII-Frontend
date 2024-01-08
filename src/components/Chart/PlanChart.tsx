import { StatisticService } from '@/api/Statistic/StatisticService'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js'
import { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

type ChartData = {
  labels: string[]
  datasets: {
    data: number[]
    backgroundColor: string[]
    hoverBackgroundColor: string[]
  }[]
}

export default function PlanChart() {
	const [chartData, setCharData] = useState<ChartData | null >(null)

	useEffect(() => {
		StatisticService.plansStatistics().then((res) => {
			const labels = res.data.map((plan: any) => plan.label)
			const values = res.data.map((plan: any) => plan.value)

			setCharData({
				labels,
				datasets: [
					{
						data: values,
						backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
						hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
					}
				]
			})
		})
	}, [])

	const options: ChartOptions<'pie'> = {
		plugins: {
			legend: {
				position: 'right'
			}
		}
	}

	return (
		<div className='h-[400px] max-h-[400px] w-[400px] max-w-[400px] border border-lightBlue-600 border-dashed rounded-lg p-4'>
			<h2 className='text-lg font-semibold text-lightBlue-600'>Planes de mejora</h2>
			{chartData && <Pie data={chartData} options={options}/>}
		</div>
	)
}