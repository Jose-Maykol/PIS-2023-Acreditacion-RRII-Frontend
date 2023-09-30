"use client"

import React, {useState} from 'react';
import { Input } from '@nextui-org/react';

const CustomInput = ({
  type = 'text',
  label,
  placeholder,
  defaultValue,
  startContent,
  endContent,
  labelPlacement,
  color,
  validationFn, // Función de validación personalizada
  validationMessage = 'Invalid input', // Mensaje de validación por defecto
  className,
  isRequired,
  onValueChange
} : any) => {
  const [value, setValue] = useState(defaultValue || '');
  const [isInvalid, setIsInvalid] = useState(false);

  const handleChange = (val: any) => {
    setValue(val);
    if (validationFn) {
      setIsInvalid(!validationFn(val));
    }
    if (onValueChange) onValueChange(val);
  };

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
      color={isInvalid ? 'danger' : color}
      isInvalid={isInvalid}
      errorMessage={isInvalid && validationMessage}
      onValueChange={handleChange}
      className={className}
    />
  );
};

export default CustomInput;
