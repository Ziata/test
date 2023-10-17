import { Dispatch, SetStateAction } from "react";
import Select, { SingleValue } from "react-select";

export default function ContactSelect({
  options,
  setType,
}: {
  options: { value: string; label: string }[];
  setType: Dispatch<SetStateAction<string>>;
}) {
  const handleChange = (
    option: SingleValue<{ value: string; label: string }>
  ) => {
    if (!option) return;
    setType(option.value);
  };

  if (!options[0]) return;

  return (
    <Select
      instanceId="react-select-contact"
      defaultValue={options[0]}
      onChange={handleChange}
      options={options}
      styles={{
        container: (baseStyles) => ({
          ...baseStyles,
          marginTop: "10px",
          marginLeft: "-15px",
          width: "100%",
        }),
        control: (baseStyles) => ({
          ...baseStyles,
          border: "none",
          height: "45px",
          borderRadius: "10px",
          boxShadow: "0",
          whiteSpace: "nowrap",
          cursor: "pointer",
          paddingRight: "10px",
          backgroundColor: "#EBEBEB",
        }),
        option: (base, state) => ({
          ...base,
          fontFamily: "sans-serif",
          fontWeight: 500,
          border: "0",
          borderColor: "#fff",
          color: state.isSelected ? "#002c47" : "#8C8C8C",
          backgroundColor: "#F8F8F8",
          whiteSpace: "nowrap",
          cursor: "pointer",
          "&:active": {
            backgroundColor: "#fff",
          },
        }),
        indicatorSeparator: () => ({
          display: "none",
        }),
        menuList: (base) => ({
          ...base,
          padding: "0",
          borderRadius: "10px",
        }),
        menu: (base) => ({
          ...base,
          borderRadius: "10px",
        }),
        singleValue: (base) => ({
          ...base,
          color: "#002c47",
          fontFamily: "sans-serif",
          fontWeight: 500,
        }),
        dropdownIndicator: (base) => ({
          ...base,
          color: "#002c47",
          fontFamily: "sans-serif",
          fontWeight: 500,
          padding: "0",
        }),
      }}
      isSearchable={false}
    />
  );
}
