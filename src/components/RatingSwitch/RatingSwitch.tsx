import React, { useState } from 'react'

const RatingSwitch = () => {
	const ratings = ['No Logrado', 'Logrado', 'Logrado Plenamente']
	const [selectedRating, setSelectedRating] = useState(0) // Start with 'Regular'

	const handleSwitchClick = () => {
		setSelectedRating((prev) => (prev + 1) % 3)
	}

	return (
		<div className='flex flex-col items-center gap-2'>
			<div className='flex gap-2'>
				{ratings.map((rating, index) => (
					<div className='flex flex-col gap-1 items-center'>
						<span key={rating} className={`text-sm ${selectedRating === index ? 'font-bold' : ''}`}>
							{rating}
						</span>
						<div
							key={index}
							className={`w-20 h-6 rounded-full ${selectedRating === index ? 'bg-green-500' : 'bg-gray-300'}`}
							onClick={handleSwitchClick}
						>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default RatingSwitch
