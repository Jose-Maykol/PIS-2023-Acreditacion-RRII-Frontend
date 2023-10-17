'use client'

import React, { useState, useEffect } from 'react'
import { Textarea, Button } from '@nextui-org/react'
import RatingSwitch from '../RatingSwitch/RatingSwitch'
import PencilIcon from '../Icons/PencilIcon'
import { StandardService } from '@/api/Estandar/standardService'

const HeaderStandards = ({ id }: { id: string }) => {
	const [standardDescription, setStandardDescription] = useState('')
	const [dimension, setDimension] = useState('')
	const [factor, setFactor] = useState('')
	const [standardRelated, setStandardRelated] = useState('')
	const [status, setStatus] = useState('')

	const [isEdit, setIsEdit] = useState(true)

	const handleSave = () => {
	}
	useEffect(() => {
		StandardService.getHeader(id).then((res) => {
			console.log(res)
			setDimension(res.data.dimension)
			console.log(res.data.dimension)
			setFactor(res.data.factor)
			console.log(res.data.factor)
			setStandardRelated(res.data.related_standards)
			console.log(res.data.related_standards)
			// setStandardDescription(res.descripcion)
			setStatus(res.data.standard_status)
		})
	}, [])

	return (
		<div className='text-white flex flex-col gap-1 pl-8'>
			<div className='grow'>
				<h2 className='text-white'>Propósitos Articulados</h2>
				<p className='text-white text-xl mb-2'>Estandar #{id}</p>
				<hr className='my-4 w-full'></hr>
				<Textarea
					isReadOnly={isEdit}
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
						isReadOnly={isEdit}
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
						isReadOnly={isEdit}
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
					isReadOnly={isEdit}
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
					<RatingSwitch valoration={status} />
				</div>
				{isEdit ? <Button className='text-white self-end uppercase' onPress={() => setIsEdit(!isEdit)} color='success' startContent={<PencilIcon width={15} height={15} fill='fill-white' />}>Editar</Button> :
					<>
						<Button className='text-white self-end uppercase' onPress={() => setIsEdit(!isEdit)} color='danger' startContent={<PencilIcon width={15} height={15} fill='fill-white' />}>Cancelar</Button>
						<Button className='text-white self-end uppercase' onPress={() => handleSave} color='success' startContent={<PencilIcon width={15} height={15} fill='fill-white' />}>Guardar</Button>
					</>
				}
			</div>
		</div>
	)
}

export default HeaderStandards