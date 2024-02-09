import React, { useEffect, useState } from 'react'
import { Progress } from '@nextui-org/react'
import { StandardService } from '@/api/Estandar/StandardService'
import { useYearSemesterStore } from '@/store/useYearSemesterStore'
import { useToast } from '@/hooks/toastProvider'

const RatingSwitch = ({ standardID, isManager, statusID } : { standardID: string, isManager: boolean, statusID: number }) => {
	const ratings = ['No Logrado', 'Logrado', 'Logrado Satisfactoriamente']
	const [rating, setRating] = useState<number>(0)
	const { showToast, updateToast } = useToast()
	const { year, semester } = useYearSemesterStore()

	useEffect(() => {
		if (statusID > 0) setRating(statusID - 1)
	}, [statusID, year, semester])

	const handleSwitchClick = async (newRating: number) => {
		const notification = showToast('Procesando...')
		if (!isManager) {
			updateToast(notification, 'No tienes permisos para realizar esta acción', 'error')
			return
		}
		await StandardService.updateStatusStandard(standardID, newRating + 1).then((res) => {
			console.log(res)
			if (res.status === 1) {
				updateToast(notification, res.message, 'success')
			} else {
				updateToast(notification, res.message, 'error')
			}
		})
		setRating(newRating)
	}

	const getPropsRating = (index: number): { value: number; color: string } => {
		const props: { [key: number]: { value: number; color: string } } = {
			0: { value: 0, color: 'bg-red-600' },
			1: { value: 50, color: 'bg-[#FFA500]' },
			2: { value: 100, color: 'bg-[#32CD32]' }
		}
		return index <= rating ? props[rating] : { value: 0, color: 'bg-gray-300' }
	}

	return (
		<div className='flex flex-col items-center w-[350px] px-0 gap-1'>
			<div className='flex flex-wrap justify-between w-full relative pl-7 pr-12 mt-2'>
				<Progress
					className='absolute top-[35%] max-w-[250px] ml-2'
					size='sm'
					aria-label='Loading...'
					value={getPropsRating(rating).value}
					classNames={{
						track: 'drop-shadow-md bg-gray-300',
						indicator: getPropsRating(rating).color
					}}/>
				{ratings.map((_, index) => (
					<div
						key={index}
						onClick={() => handleSwitchClick(index)}
						className={`z-20 cursor-pointer w-5 h-5 rounded-full ${getPropsRating(index).color} `}
					>
					</div>
				))}
			</div>
			<div className='flex flex-wrap justify-stretch items-center w-full gap-4'>
				{ratings.map((label, index) => (
					<div key={index} className={`flex-1 text-sm ${index ? 'text-center' : 'text-start'}`}>
						<span>{label}</span>
					</div>
				))}
			</div>
		</div>
	)
}

export default RatingSwitch
