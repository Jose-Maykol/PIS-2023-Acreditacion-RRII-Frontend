'use client'

import React from 'react'
import { Textarea, Button } from '@nextui-org/react'
import RatingSwitch from '../RatingSwitch/RatingSwitch'
import PencilIcon from '../Icons/PencilIcon'

const HeaderStandards = ({ id }: { id: string }) => {
	const [standardDescription, setStandardDescription] = React.useState(
		'NextUI is a React UI library that provides a set of accessible, reusable, and beautiful components. contenido mas largo aaa ppp'
	)
	const [factor, setFactor] = React.useState('Factor 1')
	const [dimension, setDimension] = React.useState('Dimension 1')
	const [standardRelated, setStandardRelated] = React.useState(
		'Estandar 1 \nEstandar 2 \nEstandar 3'
	)

	return (
		<div className='text-white flex flex-col gap-1 pl-8'>
			<div className='grow'>
				<h2 className='text-white'>Propósitos Articulados</h2>
				<p className='text-white text-xl mb-2'>Estandar #{id}</p>
				<hr className='my-4 w-full'></hr>
				<Textarea
					isReadOnly
					maxRows={2}
					variant='bordered'
					value={standardDescription}
					onValueChange={setStandardDescription}
					classNames={{ input: 'scrollbar-hide' }}
				/>
			</div>
			<div className='flex gap-20 grow mt-2'>
				<div className='flex-1'>
					<p className='text-white text-xl mb-1'>Factor</p>
					<Textarea
						isReadOnly
						maxRows={1}
						variant='bordered'
						value={factor}
						onValueChange={setFactor}
						classNames={{ input: 'scrollbar-hide' }}
					/>
				</div>
				<div className='flex-1'>
					<p className='text-white text-xl mb-1'>Dimensión</p>
					<Textarea
						isReadOnly
						maxRows={1}
						variant='bordered'
						value={dimension}
						onValueChange={setDimension}
						classNames={{ input: 'scrollbar-hide' }}
					/>
				</div>
			</div>
			<div className='grow mt-2'>
				<p className='text-white text-xl mb-2'>Estandares Relacionados</p>
				<Textarea
					isReadOnly
					maxRows={2}
					variant='bordered'
					value={standardRelated}
					onValueChange={setStandardRelated}
					classNames={{ input: 'scrollbar-hide' }}
				/>
			</div>
			<div className='grow flex justify-between mt-2'>
				<div>
					<p className='text-white text-xl mb-3'>Valoracion Estandar</p>
					<RatingSwitch />
				</div>
				<Button
					className='text-white self-end uppercase'
					color='success'
					startContent={<PencilIcon width={15} height={15} fill='fill-white' />}
				>
					Editar
				</Button>
			</div>
		</div>
	)
}

export default HeaderStandards
