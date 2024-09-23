import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { useFormContext } from "react-hook-form";

interface OptionType {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  name: string;
  options: OptionType[];
  value?: string; // Optional prop to control selected value
  onChange: (value: string) => void; // Callback to handle value changes
  error?: string; // Optional error message to display
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  name,
  options,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: "This field is required!" }} // Validation rules
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <Select
          ref={ref} // Using ref callback to link with react-hook-form
          onChange={(option) => onChange(option ? option.value : "")}
          onBlur={onBlur}
          value={options.find((option) => option.value === value) || null}
          options={options}
          placeholder={`Select a ${name}`}
          styles={{
            container: (provided) => ({
              ...provided,
              width: "80%",
            }),
          }}
        />
      )}
    />
  );
};

export default SearchableSelect;
