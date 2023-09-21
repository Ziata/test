import { Category, Post } from "@/services/interface";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface InfoContextProps {
  post: Post | null;
  setPost: Dispatch<SetStateAction<Post | null>>;
  category: Category | null;
  setCategory: Dispatch<SetStateAction<Category | null>>;
}

export const InfoContext = createContext<InfoContextProps>({
  post: null,
  setPost: () => null,
  category: null,
  setCategory: () => null,
});

export const InfoProvider = ({ children }: { children: ReactNode }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [category, setCategory] = useState<Category | null>(null);

  return (
    <InfoContext.Provider value={{ post, setPost, category, setCategory }}>
      {children}
    </InfoContext.Provider>
  );
};
