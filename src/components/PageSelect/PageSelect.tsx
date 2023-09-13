import { useState } from "react";
import Select, { SingleValue } from "react-select";

const options = [
  { value: "10", label: "10 items" },
  { value: "20", label: "20 items" },
  { value: "50", label: "50 items" },
  { value: "100", label: "100 items" },
];

function PageSelect() {
  const [selectedOption, setSelectedOptions] = useState<{
    value: string;
    label: string;
  }>(options[0]);

  const handleOptionChange = (
    newValue: SingleValue<{ value: string; label: string }>
  ) => {
    if (newValue) {
      setSelectedOptions(newValue);
    }
  };

  return (
    <div className="flex items-center font-normal text-base leading-5 text-[#002C47] font-Din">
      Show{" "}
      <Select
        instanceId="react-select-instance"
        defaultValue={selectedOption}
        onChange={handleOptionChange}
        options={options}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            border: "none",
            background: "transparent",
            borderRadius: "10px",
            boxShadow: "0",
            whiteSpace: "nowrap",
            cursor: "pointer",
          }),
          option: (base, state) => ({
            ...base,
            fontFamily: "font-Din",
            fontWeight: 500,
            border: "0",
            padding: "3px 5px",
            borderColor: "#fff",
            color: state.isSelected ? "#002C47" : "#8C8C8C",
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
            color: "#002C47",
            fontFamily: "font-Din",
            fontWeight: 500,
          }),
          dropdownIndicator: (base) => ({
            ...base,
            color: "#002C47",
            fontFamily: "font-Din",
            fontWeight: 500,
            padding: "0",
          }),
        }}
        isSearchable={false}
      />
    </div>
  );
}

export default PageSelect;
