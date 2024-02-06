import { useYearSemesterStore } from '@/store/useYearSemesterStore'
import { useEffect, useState } from 'react'

export default function CountdownSemester () {
	const { closingDate } = useYearSemesterStore()
	const [timeLeft, setTimeLeft] = useState({
		days: '00',
		hours: '00',
		minutes: '00'
	})

	useEffect(() => {
		const calculateTimeLeft = () => {
			const parts = closingDate?.split('-') as string[]
			const year = parseInt(parts[0])
			const month = parseInt(parts[1]) - 1
			const day = parseInt(parts[2])
			const targetDate = new Date(year, month, day)
			const now = new Date().getTime()
			const difference = targetDate.getTime() - now

			if (difference > 0) {
				const days = String(Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24)))).padStart(2, '0')
				const hours = String(Math.max(0, Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))).padStart(2, '0')
				const minutes = String(Math.max(0, Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)))).padStart(2, '0')
				setTimeLeft({ days, hours, minutes })
			} else {
				setTimeLeft({ days: '00', hours: '00', minutes: '00' })
			}
		}

		const interval = setInterval(() => {
			calculateTimeLeft()
		}, 1000)
		return () => clearInterval(interval)
	}, [closingDate])

	return (
		<div className='fixed top-20 right-4 bg-red-600 text-white px-3 py-2 rounded-lg shadow-lg flex flex-col w-[240px] justify-center'>
			<div className='flex justify-center text-xs'>El semestre actual acabara en</div>
			<div className='flex flex-row'>
				<div className='flex flex-col items-center mx-4'>
					<p className='text-3xl font-bold'>{timeLeft.days}</p>
					<p className='text-xs'>Días</p>
				</div>
				<div>
					<p className='text-3xl font-bold'>:</p>
				</div>
				<div className='flex flex-col items-center mx-4'>
					<p className='text-3xl font-bold'>{timeLeft.hours}</p>
					<p className='text-xs'>Horas</p>
				</div>
				<div>
					<p className='text-3xl font-bold'>:</p>
				</div>
				<div className='flex flex-col items-center mx-4'>
					<p className='text-3xl font-bold'>{timeLeft.minutes}</p>
					<p className='text-xs'>Minutos</p>
				</div>
			</div>
		</div>
	)
}