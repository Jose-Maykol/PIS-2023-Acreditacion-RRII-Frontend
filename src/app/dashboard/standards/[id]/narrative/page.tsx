'use client'

import React, { useState } from 'react'
import CustomModal from '@/components/Modal/CustomModal'
import { Button, Selection } from '@nextui-org/react'
import { useToast } from '@/hooks/ToastContext'
import CustomInput from '@/components/Input/CustomInput'
import { SearchIcon } from '@/components/Icons/SearchIcon'
import CustomSelect from '@/components/Select/CustomSelect'


export default function StandardsPage() {
	// Modal
	const [isModalOpen, setModalOpen] = useState(false)

	const handleOpenModal = () => {
		setModalOpen(true)
	}

	const handleCloseModal = () => {
		setModalOpen(false)
	}

	const handleDeleteArticle = () => {
		console.log('Artículo eliminado')
		handleCloseModal()
	}

	// Toast
	const { showToast } = useToast()

	// Select
	const [value, setValue] = React.useState<Selection>(new Set(['3']))
	const [values, setValues] = React.useState<Selection>(new Set([]))
	const options = [
		{ label: 'Opción 1', value: '1' },
		{ label: 'Opción 2', value: '2' },
		{ label: 'Opción 3', value: '3' },
		{ label: 'Opción 4', value: '4' },
		{ label: 'Opción 5', value: '5' }
	]

	return (
		<div className='w-[96%] h-full bg-white m-auto flex flex-col gap-5 px-10'>
			Aqui se muestran la lista de narrativas
			<div>
				<Button onClick={handleOpenModal}>Abrir Modal</Button>

				<CustomModal
					isOpen={isModalOpen}
					onClose={handleCloseModal}
					header='Confirmar eliminación'
					body='¿Estás seguro de que deseas eliminar este artículo?'
					footer={
						<>
							<Button color='danger' variant='flat' onPress={handleCloseModal}>
								Cancelar
							</Button>
							<Button color='primary' onPress={handleDeleteArticle}>
								Confirmar
							</Button>
						</>
					}
				/>
			</div>

			<div>
				<Button
					onClick={() => showToast('Mensaje de éxito', 'danger')}
					className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
				>
					Mostrar Toast
				</Button>
			</div>

			<div>
				<CustomInput
					label='Correo'
					type='number'
					placeholder='whuaracha@unsa.edu.pe'
					startContent={<SearchIcon />}
					labelPlacement='outside'
					isRequired
					onValueChange={(value: any) => console.log(value)}
					className='text-blue-600 p-2 rounded hover:bg-blue-200 w-1/3'
				/>
			</div>

			<div>
				<CustomSelect
					label='Selecciona una opción'
					placeholder='Elige...'
					values={value}
					handleChangeValues={setValue}
					options={options}
					className='p-2 rounded w-1/3'
				/>
				<p>Valor selccionado {[...value][0]}</p>

				<CustomSelect
					label='Selecciona varias opciones'
					placeholder='Elige...'
					multiple
					values={values}
					handleChangeValues={setValues}
					options={options}
					className='p-2 rounded w-2/3'
				/>
				<p>Valores seleccionados {[...values].join(', ')}</p>

			</div>
		</div>
	)
}