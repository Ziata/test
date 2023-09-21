import { ICategory, IPost } from "@/services/interface";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface InfoContextProps {
  post: IPost | null;
  setPost: Dispatch<SetStateAction<IPost | null>>;
  category: ICategory | null;
  setCategory: Dispatch<SetStateAction<ICategory | null>>;
}

export const InfoContext = createContext<InfoContextProps>({
  post: null,
  setPost: () => null,
  category: null,
  setCategory: () => null,
});

export const InfoProvider = ({ children }: { children: ReactNode }) => {
  const [post, setPost] = useState<IPost | null>(null);
  const [category, setCategory] = useState<ICategory | null>(null);

  return (
    <InfoContext.Provider value={{ post, setPost, category, setCategory }}>
      {children}
    </InfoContext.Provider>
  );
};
