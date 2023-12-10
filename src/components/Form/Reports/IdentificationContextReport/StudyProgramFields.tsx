import { Input } from '@nextui-org/react'
import { useEffect, useRef } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StudyProgramFields = ({ formik }: { formik: any }) => {
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
				<Input
					name='licensing_resolution2'
					id='licensing_resolution2'
					size='sm'
					type='text'
					ref={dischargeInputRef}
				/>
			</div>
			<div className='flex flex-col mb-3'>
				<label className='text-default-600 text-sm ml-1'>Nivel Académico:</label>
				<Input
					id='academic_level'
					name='academic_level'
					value={formik.values.academic_level}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					size='sm'
					type='text'
				/>
			</div>
			<div className='flex flex-col mb-3'>
				<label className='text-default-600 text-sm ml-1'>CUI:</label>
				<Input
					id='cui'
					name='cui'
					value={formik.values.cui}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					size='sm'
					type='text'
				/>
			</div>
			<div className='flex flex-col mb-3'>
				<label className='text-default-600 text-sm ml-1'>Denominación de Grado:</label>
				<Input
					id='grade_denomination'
					name='grade_denomination'
					value={formik.values.grade_denomination}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					size='sm'
					type='text'
				/>
			</div>
			<div className='flex flex-col mb-3'>
				<label className='text-default-600 text-sm ml-1'>Denominación de Título:</label>
				<Input
					id='title_denomination'
					name='title_denomination'
					value={formik.values.title_denomination}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					size='sm'
					type='text'
				/>
			</div>
			<div className='flex flex-col mb-3'>
				<label className='text-default-600 text-sm ml-1'>Oferta Autorizada:</label>
				<Input
					id='authorized_offer'
					name='authorized_offer'
					value={formik.values.authorized_offer}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					size='sm'
					type='text'
				/>
			</div>
			<div className='flex flex-col mb-3'>
				<label className='text-default-600 text-sm ml-1'>
					Apellidos y Nombres de la máxima autoridad o responsable del programa de estudio:
				</label>
				<Input
					id='highest_authority_study_program'
					name='highest_authority_study_program'
					value={formik.values.highest_authority_study_program}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					size='sm'
					type='text'
				/>
			</div>
			<div className='flex flex-col mb-3'>
				<label className='text-default-600 text-sm ml-1'>Correo Electrónico:</label>
				<Input
					id='highest_authority_study_program_email'
					name='highest_authority_study_program_email'
					value={formik.values.highest_authority_study_program_email}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					size='sm'
					type='email'
				/>
			</div>
			<div className='flex flex-col mb-3'>
				<label className='text-default-600 text-sm ml-1'>Teléfono:</label>
				<Input
					id='highest_authority_study_program_telephone'
					name='highest_authority_study_program_telephone'
					value={formik.values.highest_authority_study_program_telephone}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					size='sm'
					type='text'
				/>
			</div>
		</div>
	)
}

export default StudyProgramFields
