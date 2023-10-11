import React from 'react'
import { Select, SelectItem } from '@nextui-org/react'

const CustomSelect = ({
	label,
	placeholder,
	size,
	color,
	variant,
	labelPlacement,
	isRequired,
	className,
	description,
	multiple = false,
	values,
	handleChangeValues,
	options

}: any) => {
	return (
		<div className='flex w-full flex-col gap-2'>
			<Select
				label={label}
				placeholder={placeholder}
				size={size}
				color={color}
				variant={variant}
				labelPlacement={labelPlacement}
				isRequired={isRequired}
				className={className}
				description={description}
				selectionMode={multiple ? 'multiple' : 'single'}
				selectedKeys={values}
				onSelectionChange={handleChangeValues}
				scrollShadowProps={{
					isEnabled: false
				}}
			>
				{options.map((option: any) => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</Select>
		</div>
	)
}

export default CustomSelect
