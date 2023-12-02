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
			orange: 'orange-400',
			blue: 'lightBlue-600',
			green: 'green-400',
			grey: 'gray-400'
		}
		return colors[color]
	}

	return (
		<div className={`border-${cardColor(color)} border-1.5 w-[250px] rounded-md p-4 flex flex-col items-start justify-between gap-3`}>
			<h2 className='font-bold text-md'>{title} </h2>
			<p className='text-sm'>{description}</p>
			<Button className={`bg-${cardColor(color)} text-white font-bold self-end`} onPress={generateReport} >Generar</Button>
		</div>
	)
}