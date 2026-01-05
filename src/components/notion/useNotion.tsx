import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import { type Article } from "./types/type";

export const useNotion = () => {
  const [data, setData] = useState<string>("");
  const [articles, setArticles] = useState<Article[]>([]);

  const addArticle = () => {
    if (data.trim() === "") return;

    const newArticle: Article = {
      id: crypto.randomUUID(),
      text: data,
      svg: undefined,
    };
    setArticles([newArticle, ...articles]);
    setData("");
  };

  const deleteArticle = (id: number | string) => {
    setArticles((prevArticles) =>
      prevArticles.filter((article) => article.id !== id)
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addArticle();
    }
  };

  return {
    data,
    articles,
    handleChange,
    handleKeyDown,
    addArticle,
    deleteArticle,
  };
};
