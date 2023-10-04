import { useEffect, useState } from "react";
import Select, { SingleValue, components } from "react-select";
import Image from "next/image";
import global from "static/img/global.svg";
import triangle from "static/img/triangle.svg";
import { useRouter } from "next/router";
import i18n from "@/i18n";

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
  const router = useRouter();
  const initialLanguage = options.find(
    (option) => option.value === router.query.lang
  );

  const [selectedLanguage, setSelectedLanguage] = useState<{
    value: string;
    label: string;
  }>(initialLanguage || options[0]);

  const handleLanguageChange = (
    newValue: SingleValue<{ value: string; label: string }>
  ) => {
    if (newValue && newValue.value !== router.query.lang) {
      setSelectedLanguage(newValue);
      router.push(`/${newValue.value}`);
    }
  };

  useEffect(() => {
    if (!selectedLanguage) return;
    i18n.changeLanguage(selectedLanguage.value);
  }, [selectedLanguage]);

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
            borderColor: "transparent",
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
    </div>
  );
}
