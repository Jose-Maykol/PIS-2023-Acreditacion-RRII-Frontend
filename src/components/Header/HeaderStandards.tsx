'use client'

import React, { useState, useEffect } from 'react'
import { Textarea, Button } from '@nextui-org/react'
import RatingSwitch from '../RatingSwitch/RatingSwitch'
import PencilIcon from '../Icons/PencilIcon'
import { StandardService } from '@/api/Estandar/standardService'
import { StandardHeader, StandardValues } from '@/types/Standard'
import { toast } from 'react-toastify'

const HeaderStandards = ({ id }: { id: string }) => {
	const [standardHeader, setStandardHeader] = useState<StandardHeader>({
		name: '',
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

	const [isRead, setIsRead] = useState<boolean>(true)
	const [isReload, setIsReload] = useState<boolean>(false)

	const handleChange = (key: string, value: string) => {
		setStandardHeader((prev) => ({
			...prev,
			[key]: value
		}))
	}
	console.log(standardHeader.status)

	useEffect(() => {
		StandardService.getHeader(id).then((res) => {
			const { name, description = 'valor defecto', dimension, factor, related_standards: relatedStandards, standard_status: standardStatus, isAdministrator, isManager } = res.data
			setStandardHeader({
				name,
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
		setIsReload(false)
	}, [isReload])

	const handleUpdateHeader = async () => {
		const notification = toast.loading('Procesando...')
		const { name, description, dimension, factor, standardRelated } : StandardValues = standardHeader
		await StandardService.updateHeader(
			id,
			{
				name,
				description,
				dimension,
				factor,
				standardRelated
			}).then((res) => {
			if (res.status === 1) {
				setIsReload(true)
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
		setIsRead(true)
	}

	const handleCancelUpdateHeader = () => {
		setIsRead(true)
		setIsReload(true)
	}

	return (
		<div className='text-white flex flex-col gap-1 pl-8'>
			<div className='grow'>
				<Textarea
					isReadOnly={isRead || !standardHeader.permissions.isAdministrator}
					maxRows={1}
					className='max-w-4xl'
					variant={isRead || !standardHeader.permissions.isAdministrator ? 'bordered' : 'faded'}
					value={standardHeader.name}
					onValueChange={(value) => handleChange('name', value)}
					classNames={{
						base: 'bg-transparent',
						input: `scrollbar-hide text-3xl font-bold ${isRead || !standardHeader.permissions.isAdministrator ? '' : 'text-black'}`,
						inputWrapper: `border-none ${isRead || !standardHeader.permissions.isAdministrator ? 'bg-transparent px-0' : 'bg-white px-2'}`
					}}
				/>
				<p className='text-white text-xl mb-2'>Estandar #{id}</p>
				<hr className='my-4 w-full'></hr>
				<Textarea
					isReadOnly={isRead || !standardHeader.permissions.isAdministrator}
					maxRows={2}
					variant={isRead || !standardHeader.permissions.isAdministrator ? 'bordered' : 'faded'}
					value={standardHeader.description}
					onValueChange={(value) => handleChange('description', value)}
					classNames={{ input: `scrollbar-hide ${isRead || !standardHeader.permissions.isAdministrator ? '' : 'text-black'}` }}
				/>
			</div>
			<div className='flex gap-20 grow mt-2'>
				<div className='flex-1'>
					<p className='text-white text-xl mb-1'>Factor</p>
					<Textarea
						isReadOnly={isRead || !standardHeader.permissions.isAdministrator}
						maxRows={1}
						variant={isRead || !standardHeader.permissions.isAdministrator ? 'bordered' : 'faded'}
						value={standardHeader.factor}
						onValueChange={(value) => handleChange('factor', value)}
						classNames={{ input: `scrollbar-hide ${isRead || !standardHeader.permissions.isAdministrator ? '' : 'text-black'}` }}
					/>
				</div>
				<div className='flex-1'>
					<p className='text-white text-xl mb-1'>Dimensión</p>
					<Textarea
						isReadOnly={isRead || !standardHeader.permissions.isAdministrator}
						maxRows={1}
						variant={isRead || !standardHeader.permissions.isAdministrator ? 'bordered' : 'faded'}
						value={standardHeader.dimension}
						onValueChange={(value) => handleChange('dimension', value)}
						classNames={{ input: `scrollbar-hide ${isRead || !standardHeader.permissions.isAdministrator ? '' : 'text-black'}` }}
					/>
				</div>
			</div>
			<div className='grow mt-2'>
				<p className='text-white text-xl mb-2'>Estandares Relacionados</p>
				<Textarea
					isReadOnly={isRead}
					maxRows={2}
					variant={isRead ? 'bordered' : 'faded'}
					value={standardHeader.standardRelated}
					onValueChange={(value) => handleChange('standardRelated', value)}
					classNames={{ input: `scrollbar-hide ${isRead ? '' : 'text-black'}` }}
				/>
			</div>
			<div className='grow flex justify-between items-center mt-2'>
				<div>
					<p className='text-white text-xl'>Valoracion Estandar</p>
					<RatingSwitch standardID={id} isManager={standardHeader.permissions.isManager} statusID={standardHeader.status.id} />
				</div>
				<div className='flex gap-2'>
					{!isRead && (
						<Button
							className='text-white self-end uppercase'
							onPress={handleCancelUpdateHeader}
							color='danger'
							startContent={<PencilIcon width={15} height={15} fill='fill-white' />}
						>
						Cancelar
						</Button>
					)}
					{isRead && (standardHeader.permissions.isAdministrator || standardHeader.permissions.isManager) && (
						<Button
							className='text-white self-end uppercase'
							onPress={() => setIsRead(false)}
							color='success'
							startContent={<PencilIcon width={15} height={15} fill='fill-white' />}
						>
						Editar
						</Button>
					)}
					{!isRead && standardHeader.permissions.isAdministrator && (
						<Button
							className='text-white self-end uppercase'
							onPress={handleUpdateHeader}
							color='success'
							startContent={<PencilIcon width={15} height={15} fill='fill-white' />}
						>
						Guardar
						</Button>
					)}
					{!isRead && !standardHeader.permissions.isAdministrator && (
						<Button
							className='text-white self-end uppercase'
							onPress={handleUpdateHeader}
							color='success'
							startContent={<PencilIcon width={15} height={15} fill='fill-white' />}
						>
						Guardar
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}

export default HeaderStandards