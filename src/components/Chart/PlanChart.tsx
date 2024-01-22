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

type data = {
	label: string
	value: number
}

export default function PlanChart() {
	const [chartData, setCharData] = useState<ChartData | null >(null)

	useEffect(() => {
		StatisticService.plansStatistics().then((res) => {
			const labels = res.data.map((plan: data) => plan.label)
			const values = res.data.map((plan: data) => plan.value)

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
			<h2 className='text-lg font-semibold text-lightBlue-600'>Planes de mejora por estado</h2>
			{chartData && <Pie data={chartData} options={options}/>}
		</div>
	)
}