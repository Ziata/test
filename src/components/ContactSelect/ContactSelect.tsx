import { Dispatch, SetStateAction } from "react";
import Select, { SingleValue } from "react-select";

const options = [
  {
    value: "type 1",
    label: "type 1",
  },
  {
    value: "type 2",
    label: "type 2",
  },
];

export default function ContactSelect({
  setType,
}: {
  setType: Dispatch<SetStateAction<string>>;
}) {
  const handleChange = (
    option: SingleValue<{ value: string; label: string }>
  ) => {
    if (!option) return;
    setType(option.value);
  };
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
          color: state.isSelected ? "#000" : "#8C8C8C",
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
          color: "#000000",
          fontFamily: "sans-serif",
          fontWeight: 500,
        }),
        dropdownIndicator: (base) => ({
          ...base,
          color: "#000000",
          fontFamily: "sans-serif",
          fontWeight: 500,
          padding: "0",
        }),
      }}
      isSearchable={false}
    />
  );
}
