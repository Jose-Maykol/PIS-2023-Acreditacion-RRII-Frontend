import { Input } from '@nextui-org/react'
import { useEffect, useRef } from 'react'

const StudyProgramFields = () => {
	const dischargeInputRef = useRef<HTMLInputElement | null>(null)

	useEffect(() => {
		if (dischargeInputRef.current) {
			dischargeInputRef.current.focus()
		}
	}, [])

	return (
		<div>
			<div className='flex flex-col mb-3'>
				<label className='text-default-600 text-sm ml-1'>Resolución de lincenciamiento:</label>
				<Input id='discharge' name='discharge' size='sm' type='text' ref={dischargeInputRef} />
			</div>
			<div className='flex flex-col mb-3'>
				<label className='text-default-600 text-sm ml-1'>Nivel Académico:</label>
				<Input id='academic-level' name='academic-level' size='sm' type='text' />
			</div>
			<div className='flex flex-col mb-3'>
				<label className='text-default-600 text-sm ml-1'>CUI:</label>
				<Input id='cui' name='cui' size='sm' type='text' />
			</div>
			<div className='flex flex-col mb-3'>
				<label className='text-default-600 text-sm ml-1'>Denominación de Grado:</label>
				<Input id='grade' name='grade' size='sm' type='text' />
			</div>
			<div className='flex flex-col mb-3'>
				<label className='text-default-600 text-sm ml-1'>Denominación de Título:</label>
				<Input id='title' name='title' size='sm' type='text' />
			</div>
			<div className='flex flex-col mb-3'>
				<label className='text-default-600 text-sm ml-1'>Oferta Autorizada:</label>
				<Input id='offer' name='offer' size='sm' type='text' />
			</div>
			<div className='flex flex-col mb-3'>
				<label className='text-default-600 text-sm ml-1'>
					Apellidos y Nombres de la máxima autoridad o responsable del programa de estudio:
				</label>
				<Input id='responsible' name='responsible' size='sm' type='text' />
			</div>
			<div className='flex flex-col mb-3'>
				<label className='text-default-600 text-sm ml-1'>Correo Electrónico:</label>
				<Input id='email' name='email' size='sm' type='email' />
			</div>
			<div className='flex flex-col mb-3'>
				<label className='text-default-600 text-sm ml-1'>Teléfono:</label>
				<Input id='phone' name='phone' size='sm' type='text' />
			</div>
		</div>
	)
}

export default StudyProgramFields
