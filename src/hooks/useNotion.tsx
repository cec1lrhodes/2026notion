import { useCallback, useEffect, useState } from "react";
import { type Card } from "../components/notion/types/type";

const STORAGE_KEY = "notion_articles";

export const useNotion = () => {
  const [data, setData] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [cards, setCards] = useState<Card[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }, [cards]);

  const handleImageChange = useCallback((url: string | null) => {
    setSelectedImage(url);
  }, []);

  const addCard = useCallback(() => {
    if (data.trim() === "") return;

    const newCard: Card = {
      id: crypto.randomUUID(),
      text: data,
      svg: selectedImage || undefined,
    };
    // setCard([newCard, ...card]); при цьому варіанті потрібно додавати card в залежності, що несе за собою ререндер
    setCards((prev) => [newCard, ...prev]);
    setData("");
    setSelectedImage(null);
  }, [data, selectedImage]);

  const deleteCard = useCallback((id: string) => {
    setCards((prevCard) => prevCard.filter((card) => card.id !== id));
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
        addCard();
      }
    },
    [addCard]
  );

  return {
    data,
    cards,
    handleChange,
    handleKeyDown,
    selectedImage,
    handleImageChange,
    addCard,
    deleteCard,
  };
};
