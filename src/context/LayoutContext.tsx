import { IFooter, IHeader } from "@/services/interface";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface LayoutContextProps {
  headerData: IHeader | null;
  setHeaderData: Dispatch<SetStateAction<IHeader | null>>;
  footerData: IFooter | null;
  setFooterData: Dispatch<SetStateAction<IFooter | null>>;
}

export const LayoutContext = createContext<LayoutContextProps>({
  headerData: null,
  setHeaderData: () => null,
  footerData: null,
  setFooterData: () => null,
});

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [headerData, setHeaderData] = useState<IHeader | null>(null);
  const [footerData, setFooterData] = useState<IFooter | null>(null);
  return (
    <LayoutContext.Provider
      value={{ headerData, footerData, setHeaderData, setFooterData }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
