import { Input } from '@nextui-org/react'
import { useEffect, useRef } from 'react'

const InstitutionFields = () => {
	const nameInputRef = useRef<HTMLInputElement | null>(null)

	useEffect(() => {
		if (nameInputRef.current) {
			nameInputRef.current.focus()
		}
	}, [])

	return (
		<div>
			<div className='flex flex-col mb-4'>
				<label className='text-default-600 text-sm ml-1'>Nombre:</label>
				<Input id='name' name='name' size='sm' type='text' ref={nameInputRef} />
			</div>
			<div className='flex flex-col mb-4'>
				<label className='text-default-600 text-sm ml-1'>Región/Provincia/Distrito:</label>
				<Input id='region' name='region' size='sm' type='text' />
			</div>
			<div className='flex flex-col mb-4'>
				<label className='text-default-600 text-sm ml-1'>Teléfono Institucional:</label>
				<Input id='phone' name='phone' size='sm' type='text' />
			</div>
			<div className='flex flex-col mb-4'>
				<label className='text-default-600 text-sm ml-1'>Página Web:</label>
				<Input id='website' name='website' size='sm' type='text' />
			</div>
			<div className='flex flex-col mb-4'>
				<label className='text-default-600 text-sm ml-1'>Resolución de Licenciamiento:</label>
				<Input id='resolution' name='resolution' size='sm' type='text' />
			</div>
			<div className='flex flex-col mb-4'>
				<label className='text-default-600 text-sm ml-1'>Fecha de Resolución:</label>
				<Input id='resolution-date' name='resolution-date' size='sm' type='text' />
			</div>
			<div className='flex flex-col mb-4'>
				<label className='text-default-600 text-sm ml-1'>
					Apellidos y Nombres de la máxima autoridad de la IE:
				</label>
				<Input id='ei-representant' name='ei-representant' size='sm' type='text' />
			</div>
			<div className='flex flex-col mb-4'>
				<label className='text-default-600 text-sm ml-1'>Correo Electrónico:</label>
				<Input id='email' name='email' size='sm' type='email' />
			</div>
			<div className='flex flex-col mb-4'>
				<label className='text-default-600 text-sm ml-1'>Teléfono:</label>
				<Input id='phone' name='phone' size='sm' type='phone' />
			</div>
		</div>
	)
}

export default InstitutionFields
