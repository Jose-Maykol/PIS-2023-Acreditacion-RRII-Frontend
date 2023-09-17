import React from "react";
import { Select, SelectItem } from "@nextui-org/select";

interface CustomSelectProps {
  initValue?: any;
  options: any;
  label?: string;
  placeholder?: string;
  sm?: boolean;
  disabled?: boolean;
  onChange: any;
}

const CustomSelect = (props: CustomSelectProps) => {
  const {
    initValue,
    options = [],
    label = "",
    placeholder = "Seleciona una opción",
    sm,
    disabled,
    onChange } = props;

  return (
    <Select
      label={label}
      size={sm ? "sm" : "md"}
      variant="faded"
      placeholder={placeholder}
      selectedKeys={initValue}
      className={`max-w-xs rounded-xl text-sm p-1 ${sm ? "w-48" : "w-full"} ${disabled ? "hidden" : ""}`}
      onSelectionChange={onChange}
    >
      {options.map((option: any) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
}

export default CustomSelect;