import React, { useState } from 'react'
import { Progress } from '@nextui-org/react'
import { StandardService } from '@/api/Estandar/standardService'
import { toast } from 'react-toastify'

const RatingSwitch = ({ standardID, isManager, statusID } : { standardID: string, isManager: boolean, statusID: number }) => {
	const ratings = ['No Logrado', 'Logrado', 'Logrado Plenamente']
	const [rating, setRating] = useState<number>(statusID)

	const handleSwitchClick = async (newRating: number) => {
		const notification = toast.loading('Procesando...')
		if (!isManager) {
			toast.update(notification, {
				render: 'No tienes permisos para realizar esta acción',
				type: 'warning',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				isLoading: false,
				theme: 'colored'
			})
			return
		}
		await StandardService.updateStatusStandard(standardID, newRating).then((res) => {
			console.log(res)
			if (res.status === 1) {
				toast.update(notification, {
					render: res.message,
					type: 'success',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					isLoading: false,
					theme: 'colored'
				})
			} else {
				toast.update(notification, {
					render: res.message,
					type: 'error',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					isLoading: false,
					theme: 'colored'
				})
			}
		})
		setRating(newRating)
	}

	const getPropsRating = (index: number): { value: number; color: string } => {
		const props: { [key: number]: { value: number; color: string } } = {
			0: { value: 0, color: 'bg-red-600' },
			1: { value: 50, color: 'bg-yellow-600' },
			2: { value: 100, color: 'bg-green-600' }
		}

		return index <= rating ? props[rating] : { value: 0, color: 'bg-gray-300' }
	}

	return (
		<div className='flex flex-col items-center w-[350px] px-0 gap-1'>
			<div className='flex flex-wrap justify-stretch items-center w-full gap-4'>
				{ratings.map((label, index) => (
					<div key={index} className={`flex-1 ${index ? 'text-center' : 'text-start'}`}>
						<span>{label}</span>
					</div>
				))}
			</div>
			<div className='flex flex-wrap justify-between w-full relative pl-7 pr-10'>
				<Progress
					className='absolute top-[33%] left-[13%] w-[70%]'
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
		</div>
	)
}

export default RatingSwitch
