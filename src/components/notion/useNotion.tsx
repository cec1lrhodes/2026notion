import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { type Article } from "./types/type";

const STORAGE_KEY = "notion_articles";

export const useNotion = () => {
  const [data, setData] = useState<string>("");

  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  }, [articles]);

  const addArticle = useCallback(() => {
    if (data.trim() === "") return;

    const newArticle: Article = {
      id: crypto.randomUUID(),
      text: data,
      svg: undefined,
    };
    // setArticles([newArticle, ...articles]); при цьому варіанті потрібно додавати articles в залежності, що несе за собою ререндер
    setArticles((prev) => [newArticle, ...prev]);
    setData("");
  }, [data]);

  const deleteArticle = useCallback((id: number | string) => {
    setArticles((prevArticles) =>
      prevArticles.filter((article) => article.id !== id)
    );
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setData(e.target.value);
    },
    []
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        addArticle();
      }
    },
    [addArticle]
  );

  return {
    data,
    articles,
    handleChange,
    handleKeyDown,
    addArticle,
    deleteArticle,
  };
};
