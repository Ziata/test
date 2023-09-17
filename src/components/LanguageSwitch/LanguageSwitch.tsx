"use client";
import { useState, useEffect, useContext } from "react";
import Select, { SingleValue, components } from "react-select";
import Image from "next/image";
import global from "static/img/global.svg";
import triangle from "static/img/triangle.svg";
import LanguageContext from "@/context/LanguageContext";

const options = [
  { value: "en", label: "EN" },
  { value: "zh", label: "中文" },
];

const DropdownIndicator: React.FC<any> = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <Image src={triangle} alt="triangle" />
    </components.DropdownIndicator>
  );
};

export default function LanguageSwitch() {
  const [selectedLanguage, setSelectedLanguage] = useState<{
    value: string;
    label: string;
  }>(options[0]);

  const { changeLanguage } = useContext(LanguageContext);

  useEffect(() => {
    changeLanguage(selectedLanguage.value);
  }, [selectedLanguage, changeLanguage]);

  const handleLanguageChange = (
    newValue: SingleValue<{ value: string; label: string }>
  ) => {
    if (newValue) {
      setSelectedLanguage(newValue);
    }
  };

  return (
    <div className="flex items-center w-[85px]">
      <Image src={global} alt="language" width={21} height={21} />
      <Select
        instanceId="react-select-instance"
        components={{ DropdownIndicator }}
        defaultValue={selectedLanguage}
        onChange={handleLanguageChange}
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
    </div>
  );
}
