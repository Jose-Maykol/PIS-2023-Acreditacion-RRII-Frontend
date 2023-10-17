'use client'

import React, { useState, useEffect } from 'react'
import { Textarea, Button } from '@nextui-org/react'
import RatingSwitch from '../RatingSwitch/RatingSwitch'
import PencilIcon from '../Icons/PencilIcon'
import { StandardService } from '@/api/Estandar/standardService'
import { StandardHeader } from '@/types/Standard'

const HeaderStandards = ({ id }: { id: string }) => {
	const [standardHeader, setStandardHeader] = useState<StandardHeader>({
		description: '',
		dimension: '',
		factor: '',
		standardRelated: '',
		status: {
			id: 0,
			description: ''
		},
		permissions: {
			isAdministrator: false,
			isManager: false
		}
	})

	const [isEdit, setIsEdit] = useState<boolean>(true)

	const handleSave = () => {
		setIsEdit(false)
	}

	const handleChange = (key: string, value: string) => {
		setStandardHeader((prev) => ({
			...prev,
			[key]: value
		}))
	}

	useEffect(() => {
		StandardService.getHeader(id).then((res) => {
			console.log(res.data)
			const { description, dimension, factor, related_standards: relatedStandards, standard_status: standardStatus, isAdministrator, isManager } = res.data
			setStandardHeader({
				description,
				dimension,
				factor,
				standardRelated: relatedStandards,
				status: standardStatus,
				permissions: {
					isAdministrator,
					isManager
				}
			})
		})
	}, [])

	console.log(standardHeader.permissions)
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
					value={standardHeader.description}
					onValueChange={(value) => handleChange('description', value)}
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
						value={standardHeader.factor}
						onValueChange={(value) => handleChange('factor', value)}
						classNames={{ input: 'scrollbar-hide' }}
					/>
				</div>
				<div className='flex-1'>
					<p className='text-white text-xl mb-1'>Dimensión</p>
					<Textarea
						isReadOnly={isEdit}
						maxRows={1}
						variant='bordered'
						value={standardHeader.dimension}
						onValueChange={(value) => handleChange('dimension', value)}
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
					value={standardHeader.standardRelated}
					onValueChange={(value) => handleChange('standardRelated', value)}
					classNames={{ input: 'scrollbar-hide' }}
				/>
			</div>
			<div className='grow flex justify-between mt-2'>
				<div>
					<p className='text-white text-xl mb-3'>Valoracion Estandar</p>
					<RatingSwitch status={standardHeader.status.description} />
				</div>
				{isEdit
					? <Button className='text-white self-end uppercase' onPress={() => setIsEdit(!isEdit)} color='success' startContent={<PencilIcon width={15} height={15} fill='fill-white' />}>Editar</Button>
					: <>
						<Button className='text-white self-end uppercase' onPress={() => setIsEdit(!isEdit)} color='danger' startContent={<PencilIcon width={15} height={15} fill='fill-white' />}>Cancelar</Button>
						<Button className='text-white self-end uppercase' onPress={() => handleSave} color='success' startContent={<PencilIcon width={15} height={15} fill='fill-white' />}>Guardar</Button>
					</>
				}
			</div>
		</div>
	)
}

export default HeaderStandards