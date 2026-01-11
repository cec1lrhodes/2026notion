import { useCallback, useState } from "react";
import { useCards } from "./useCard";

export const useNotion = () => {
  // 1. UI logic
  const [data, setData] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 2. domain logic
  const { cards, addCard, deleteCard } = useCards();

  // 3. Обробник подій
  const handleImageChange = useCallback((url: string | null) => {
    setSelectedImage(url);
  }, []);

  const handleAddCard = useCallback(() => {
    if (data.trim() === "" && !selectedImage) return;

    addCard(data, selectedImage); // Бізнес логіка
    setData("");
    setSelectedImage(null);
  }, [data, selectedImage, addCard]);

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
        handleAddCard();
      }
    },
    [handleAddCard]
  );

  return {
    data,
    cards,
    selectedImage,
    handleChange,
    handleKeyDown,
    handleImageChange,
    addCard: handleAddCard,
    deleteCard,
  };
};
