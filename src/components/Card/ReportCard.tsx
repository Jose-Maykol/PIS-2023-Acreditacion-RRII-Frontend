'use client'

import { Button } from '@nextui-org/react'


interface ReportCardProps {
  color: 'orange' | 'blue' | 'green' | 'grey'
  title: string
  description: string
  generateReport: () => void
}

export default function ReportCard ({ color, title, description, generateReport }: ReportCardProps) {
	const cardColor = (color: 'orange' | 'blue' | 'green' | 'grey') => {
		const colors = {
			orange: { border: 'border-orange-600', bg: 'bg-orange-600' },
			blue: { border: 'border-blue-600', bg: 'bg-blue-600' },
			green: { border: 'border-green-600', bg: 'bg-green-600' },
			grey: { border: 'border-gray-600', bg: 'bg-gray-600' }
		}
		return colors[color]
	}

	return (
		<div className={`${cardColor(color).border} border-1.5 w-[250px] rounded-md p-4 flex flex-col items-start justify-between gap-3`}>
			<h2 className='font-bold text-md'>{title} </h2>
			<p className='text-sm'>{description}</p>
			<Button className={`${cardColor(color).bg} text-white font-bold self-end`} onPress={generateReport} >Generar</Button>
		</div>
	)
}