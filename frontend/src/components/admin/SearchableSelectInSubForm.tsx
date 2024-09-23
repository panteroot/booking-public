import React from "react";
import Select from "react-select";
import { useFormContext, Controller } from "react-hook-form";

interface OptionType {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  name: string;
  options: OptionType[];
}

const SearchableSelectInSubForm: React.FC<SearchableSelectProps> = ({
  name,
  options,
}) => {
  const { control } = useFormContext();

  const convertNestedName = (name: string) => {
    const match = name.match(/(?:.*\.)?([^.]*)$/);
    return match ? match[1] : name;
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: "This field is required!" }} // Validation rules
      render={({ field: { onChange, onBlur, value, ref } }) => {
        // Determine if `value` is an object with an `id` or a simple value
        const isObjectValue =
          value && typeof value === "object" && "_id" in value;

        // Find the selected option based on the type of `value`
        const selectedOption =
          options.find((option) =>
            isObjectValue ? option.value === value._id : option.value === value
          ) || null;
        return (
          <Select
            ref={ref} // Using ref callback to link with react-hook-form
            onChange={(option) => onChange(option ? option.value : "")}
            onBlur={onBlur}
            value={selectedOption}
            options={options}
            placeholder={`Select a ${convertNestedName(name)}`}
            aria-label={`Select a ${convertNestedName(name)}`}
            styles={{
              container: (provided) => ({
                ...provided,
                width: "80%",
              }),
            }}
          />
        );
      }}
    />
  );
};

export default SearchableSelectInSubForm;
