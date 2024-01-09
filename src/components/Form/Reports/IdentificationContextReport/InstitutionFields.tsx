import { Input, Tooltip } from '@nextui-org/react'
import { useEffect, useRef } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const InstitutionFields = ({ formik }: { formik: any }) => {
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
				<Input
					id='name'
					name='name'
					ref={nameInputRef}
					value={formik.values.name}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					isInvalid={formik.touched.name && Boolean(formik.errors.name)}
					errorMessage={formik.touched.name && formik.errors.name}
					size='sm'
					type='text'
				/>
			</div>
			<div className='grid grid-cols-3 gap-3'>
				<div className='flex flex-col mb-4'>
					<label className='text-default-600 text-sm ml-1'>Región:</label>
					<Input
						id='region'
						name='region'
						value={formik.values.region}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						isInvalid={formik.touched.region && Boolean(formik.errors.region)}
						errorMessage={formik.touched.region && formik.errors.region}
						size='sm'
						type='text'
					/>
				</div>
				<div className='flex flex-col mb-4'>
					<label className='text-default-600 text-sm ml-1'>Provincia:</label>
					<Input
						id='province'
						name='province'
						value={formik.values.province}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						isInvalid={formik.touched.province && Boolean(formik.errors.province)}
						errorMessage={formik.touched.province && formik.errors.province}
						size='sm'
						type='text'
					/>
				</div>
				<div className='flex flex-col mb-4'>
					<label className='text-default-600 text-sm ml-1'>Distrito:</label>
					<Input
						id='district'
						name='district'
						value={formik.values.district}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						isInvalid={formik.touched.district && Boolean(formik.errors.district)}
						errorMessage={formik.touched.district && formik.errors.district}
						size='sm'
						type='text'
					/>
				</div>
			</div>
			<div className='flex flex-col mb-4'>
				<label className='text-default-600 text-sm ml-1'>Dirección de Sede:</label>
				<Input
					id='address_headquarters'
					name='address_headquarters'
					value={formik.values.address_headquarters}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					isInvalid={
						formik.touched.address_headquarters && Boolean(formik.errors.address_headquarters)
					}
					errorMessage={formik.touched.address_headquarters && formik.errors.address_headquarters}
					size='sm'
					type='text'
				/>
			</div>
			<div className='flex flex-col mb-4'>
				<label className='text-default-600 text-sm ml-1'>Teléfono Institucional:</label>
				<Input
					id='institutional_telephone'
					name='institutional_telephone'
					value={formik.values.institutional_telephone}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					isInvalid={
						formik.touched.institutional_telephone && Boolean(formik.errors.institutional_telephone)
					}
					errorMessage={
						formik.touched.institutional_telephone && formik.errors.institutional_telephone
					}
					size='sm'
					type='text'
				/>
			</div>
			<div className='flex flex-col mb-4'>
				<label className='text-default-600 text-sm ml-1'>Página Web:</label>
				<Input
					id='web_page'
					name='web_page'
					value={formik.values.web_page}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					isInvalid={formik.touched.web_page && Boolean(formik.errors.web_page)}
					errorMessage={formik.touched.web_page && formik.errors.web_page}
					size='sm'
					type='url'
				/>
			</div>
			<div className='flex flex-col mb-4'>
				<label className='text-default-600 text-sm ml-1'>Resolución de Licenciamiento:</label>
				<Input
					id='licensing_resolution'
					name='licensing_resolution'
					value={formik.values.licensing_resolution}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					isInvalid={
						formik.touched.licensing_resolution && Boolean(formik.errors.licensing_resolution)
					}
					errorMessage={formik.touched.licensing_resolution && formik.errors.licensing_resolution}
					size='sm'
					type='text'
				/>
			</div>
			<div className='flex flex-col mb-4'>
				<div className='flex'>
					<Tooltip content='En formato YYYY-MM-DD' color='foreground' placement='right' offset={5}>
						<label className='text-default-600 text-sm ml-1'>Fecha de Resolución:</label>
					</Tooltip>
				</div>

				<Input
					id='date_resolution'
					name='date_resolution'
					value={formik.values.date_resolution}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					isInvalid={formik.touched.date_resolution && Boolean(formik.errors.date_resolution)}
					errorMessage={formik.touched.date_resolution && formik.errors.date_resolution}
					placeholder='Ejemplo: 2000-12-31'
					size='sm'
					type='text'
				/>
			</div>
			<div className='flex flex-col mb-4'>
				<label className='text-default-600 text-sm ml-1'>
					Apellidos y Nombres de la máxima autoridad de la IE:
				</label>
				<Input
					id='highest_authority_institution'
					name='highest_authority_institution'
					value={formik.values.highest_authority_institution}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					isInvalid={
						formik.touched.highest_authority_institution &&
						Boolean(formik.errors.highest_authority_institution)
					}
					errorMessage={
						formik.touched.highest_authority_institution &&
						formik.errors.highest_authority_institution
					}
					size='sm'
					type='text'
				/>
			</div>
			<div className='flex flex-col mb-4'>
				<label className='text-default-600 text-sm ml-1'>Correo Electrónico:</label>
				<Input
					id='highest_authority_institution_email'
					name='highest_authority_institution_email'
					value={formik.values.highest_authority_institution_email}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					isInvalid={
						formik.touched.highest_authority_institution_email &&
						Boolean(formik.errors.highest_authority_institution_email)
					}
					errorMessage={
						formik.touched.highest_authority_institution_email &&
						formik.errors.highest_authority_institution_email
					}
					size='sm'
					type='email'
				/>
			</div>
			<div className='flex flex-col mb-4'>
				<label className='text-default-600 text-sm ml-1'>Teléfono:</label>
				<Input
					id='highest_authority_institution_telephone'
					name='highest_authority_institution_telephone'
					value={formik.values.highest_authority_institution_telephone}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					isInvalid={
						formik.touched.highest_authority_institution_telephone &&
						Boolean(formik.errors.highest_authority_institution_telephone)
					}
					errorMessage={
						formik.touched.highest_authority_institution_telephone &&
						formik.errors.highest_authority_institution_telephone
					}
					size='sm'
					type='phone'
				/>
			</div>
		</div>
	)
}

export default InstitutionFields
