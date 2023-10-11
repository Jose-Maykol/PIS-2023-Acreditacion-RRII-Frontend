'use client'

import React, { useState } from 'react'
import { Input } from '@nextui-org/react'

const CustomInput = ({
	type = 'text',
	label,
	placeholder,
	defaultValue,
	startContent,
	endContent,
	labelPlacement,
	color,
	validationFn,
	validationMessage = 'Invalid input',
	className,
	isRequired,
	isClearable,
	onClear,
	onValueChange
} : any) => {
	const [value, setValue] = useState(defaultValue || '')
	const [isInvalid, setIsInvalid] = useState(false)

	const handleChange = (val: any) => {
		setValue(val)
		if (validationFn) {
			setIsInvalid(!validationFn(val))
		}
		if (onValueChange) onValueChange(val)
	}

	return (
		<Input
			type={type}
			label={label}
			placeholder={placeholder}
			value={value}
			startContent={startContent}
			endContent={endContent}
			labelPlacement={labelPlacement}
			isRequired={isRequired}
			isClearable={isClearable}
			color={isInvalid ? 'danger' : color}
			isInvalid={isInvalid}
			errorMessage={isInvalid && validationMessage}
			onValueChange={handleChange}
			onClear={onClear}
			className={className}
		/>
	)
}

export default CustomInput
