import { Post } from "@/services/interface";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface PostContextProps {
  post: Post | null;
  setPost: Dispatch<SetStateAction<Post | null>>;
}

export const PostContext = createContext<PostContextProps>({
  post: null,
  setPost: () => null,
});

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [post, setPost] = useState<Post | null>(null);

  return (
    <PostContext.Provider value={{ post, setPost }}>
      {children}
    </PostContext.Provider>
  );
};
