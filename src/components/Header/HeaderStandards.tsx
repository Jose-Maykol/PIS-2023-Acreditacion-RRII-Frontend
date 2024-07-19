'use client'

import React, { useState, useEffect } from 'react'
import { Textarea, Button } from '@nextui-org/react'
import RatingSwitch from '../RatingSwitch/RatingSwitch'
import PencilIcon from '../Icons/PencilIcon'
import { StandardService } from '@/api/Estandar/StandardService'
import { StandardHeader, StandardValues } from '@/types/Standard'
import { useToast } from '@/hooks/toastProvider'
import { useYearSemesterStore } from '@/store/useYearSemesterStore'

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
		},
		nroStandard: 0
	})

	const [isRead, setIsRead] = useState<boolean>(true)
	const [refresh, setRefresh] = useState<boolean>(false)
	const { year, semester } = useYearSemesterStore()
	const { showToast, updateToast } = useToast()

	const onTextareaChange = (key: string, value: string) => {
		setStandardHeader((prev) => ({
			...prev,
			[key]: value
		}))
	}

	useEffect(() => {
		StandardService.getHeader(id).then((res) => {
			console.log(res.data)
			const { name, description, dimension, factor, related_standards: standardRelated, standard_status: status, isAdministrator, isManager, nro_standard: nroStandard
			} = res.data
			setStandardHeader({
				name,
				description,
				dimension,
				factor,
				standardRelated,
				status,
				permissions: {
					isAdministrator,
					isManager
				},
				nroStandard
			})
		})
		setRefresh(false)
	}, [refresh, year, semester])

	const onSubmit = async () => {
		const notification = showToast('Procesando...')
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
				setRefresh(true)
				updateToast(notification, res.message, 'success')
			} else {
				updateToast(notification, res.message, 'error')
			}
		}).catch((err) => {
			updateToast(notification, err.response.data.msg, 'error')
		})
		setIsRead(true)
	}

	const onCancel = () => {
		setIsRead(true)
		setRefresh(true)
	}

	return (
		<div className='text-white flex flex-col gap-1 pl-8'>
			<div className='grow'>
				<Textarea
					isReadOnly={isRead || !standardHeader.permissions.isAdministrator}
					maxRows={1}
					className='max-w-4xl'
					variant={isRead || !standardHeader.permissions.isAdministrator ? 'bordered' : 'faded'}
					value={standardHeader.name.toUpperCase()}
					onValueChange={(value) => onTextareaChange('name', value)}
					classNames={{
						base: 'bg-transparent',
						input: `scrollbar-hide text-3xl font-bold ${isRead || !standardHeader.permissions.isAdministrator ? '' : 'text-black'}`,
						inputWrapper: `border-none rounded-md ${isRead || !standardHeader.permissions.isAdministrator ? 'bg-transparent px-0' : 'bg-white px-2'}`
					}}
				/>
				<p className='text-white text-xl uppercase'>Estándar #{standardHeader.nroStandard}</p>
				<hr className='my-2 w-full'></hr>
				<Textarea
					isReadOnly={isRead || !standardHeader.permissions.isAdministrator}
					maxRows={2}
					variant={isRead || !standardHeader.permissions.isAdministrator ? 'bordered' : 'faded'}
					value={standardHeader.description}
					onValueChange={(value) => onTextareaChange('description', value)}
					classNames={{ input: `scrollbar-hide ${isRead || !standardHeader.permissions.isAdministrator ? '' : 'text-black'}`, inputWrapper: 'rounded-md' }}
				/>
			</div>
			<div className='flex gap-20 grow mt-1'>
				<div className='flex-1'>
					<p className='text-white text-xl mb-1'>Factor</p>
					<Textarea
						isReadOnly={isRead || !standardHeader.permissions.isAdministrator}
						maxRows={1}
						variant={isRead || !standardHeader.permissions.isAdministrator ? 'bordered' : 'faded'}
						value={standardHeader.factor}
						onValueChange={(value) => onTextareaChange('factor', value)}
						classNames={{ input: `scrollbar-hide ${isRead || !standardHeader.permissions.isAdministrator ? '' : 'text-black'}`, inputWrapper: 'rounded-md' }}
					/>
				</div>
				<div className='flex-1'>
					<p className='text-white text-xl mb-1'>Dimensión</p>
					<Textarea
						isReadOnly={isRead || !standardHeader.permissions.isAdministrator}
						maxRows={1}
						variant={isRead || !standardHeader.permissions.isAdministrator ? 'bordered' : 'faded'}
						value={standardHeader.dimension}
						onValueChange={(value) => onTextareaChange('dimension', value)}
						classNames={{ input: `scrollbar-hide ${isRead || !standardHeader.permissions.isAdministrator ? '' : 'text-black'}`, inputWrapper: 'rounded-md' }}
					/>
				</div>
			</div>
			<div className='grow mt-1'>
				<p className='text-white text-xl mb-1'>Estándares Relacionados</p>
				<Textarea
					isReadOnly={isRead}
					maxRows={2}
					variant={isRead ? 'bordered' : 'faded'}
					value={standardHeader.standardRelated}
					onValueChange={(value) => onTextareaChange('standardRelated', value)}
					classNames={{ input: `scrollbar-hide ${isRead ? '' : 'text-black'}`, inputWrapper: 'rounded-md' }}
				/>
			</div>
			<div className='grow flex justify-between items-center mt-1'>
				<div>
					<p className='text-white text-xl'>Valoración de Estándar</p>
					<RatingSwitch standardID={id} isManager={standardHeader.permissions.isManager} statusID={standardHeader.status.id} />
				</div>
				<div className='flex gap-2'>
					{!isRead && (
						<Button
							className='text-white self-end uppercase'
							onPress={onCancel}
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
							onPress={onSubmit}
							color='success'
							startContent={<PencilIcon width={15} height={15} fill='fill-white' />}
						>
						Guardar
						</Button>
					)}
					{!isRead && !standardHeader.permissions.isAdministrator && (
						<Button
							className='text-white self-end uppercase'
							onPress={onSubmit}
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