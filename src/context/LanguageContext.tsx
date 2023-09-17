import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import i18n from "@/i18n";

export interface LanguageContextProps {
  currentLanguage: string;
  changeLanguage: Dispatch<SetStateAction<string>>;
}

const LanguageContext = createContext<LanguageContextProps>({
  currentLanguage: i18n.language,
  changeLanguage: () => {},
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>("en");

  const changeLanguage: Dispatch<SetStateAction<string>> = (
    language: SetStateAction<string>
  ) => {
    setCurrentLanguage(language);
  };

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
