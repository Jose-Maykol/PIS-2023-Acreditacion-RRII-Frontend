import React, { Dispatch, SetStateAction } from 'react'
import { Select, SelectItem } from '@nextui-org/select'
import { Selection } from '@nextui-org/react'

interface CustomSelectProps {
  initValue?: Selection;
  options: { label: string; value: string; }[],
  label?: string;
  placeholder?: string;
  sm?: boolean;
  disabled?: boolean;
  onChange: Dispatch<SetStateAction<Selection>>;
}

const CustomSelect = (props: CustomSelectProps) => {
	const {
		initValue,
		options = [],
		label = '',
		placeholder = 'Seleciona una opción',
		sm,
		disabled,
		onChange
	} = props

	return (
		<Select
			label={label}
			size={sm ? 'sm' : 'md'}
			variant='faded'
			placeholder={placeholder}
			selectedKeys={initValue}
			className={`max-w-xs rounded-xl text-black text-sm p-1 ${sm ? 'w-48' : 'w-full'} ${disabled ? 'hidden' : ''}`}
			onSelectionChange={onChange}
		>
			{options.map((option) => (
				<SelectItem key={option.value} value={option.value} className='text-black'>
					{option.label}
				</SelectItem>
			))}
		</Select>
	)
}

export default CustomSelect