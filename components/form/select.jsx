import ReactSelect from "react-select";
import { useRouter } from "next/router";

const SelectComponent = ({
  onChange,
  value,
  field: { uid, label, options, multiple },
}) => {
  const { pathname } = useRouter();
  const isEdit = pathname.includes("edit");

  // Function to format the label
  const formatLabel = (inputValue) =>
    `${inputValue.charAt(0).toUpperCase()}${inputValue.slice(1)}`;

  // Calculate default value based on edit mode and multiple option
  const calculateDefaultValue = () => {
    if (!isEdit) return null;
    if (!multiple) {
      return { label: formatLabel(value), value };
    }

    return value.map((val) => ({
      value: val.name || val,
      label: formatLabel(val.name || val),
    }));
  };

  const defaultValue = calculateDefaultValue();

  // Handle change event
  const handleChange = (option) => {
    const newValue = multiple ? option.map(({ value }) => value) : option.value;
    onChange(uid, newValue);
  };

  return (
    <>
      <label htmlFor={uid}>{label}</label>
      <ReactSelect
        className="mb-2"
        key={uid}
        name={uid}
        id={uid}
        onChange={handleChange}
        options={options}
        isMulti={multiple}
        defaultValue={defaultValue}
      />
    </>
  );
};
