import { useCallback, useState } from "react";
import { useCards } from "./useCard";
import { type Card } from "../components/notion/types/type";

export const useNotion = () => {
  // 1. UI logic
  const [data, setData] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // 2. domain logic
  const { cards, addCard, deleteCard, updateCardAction } = useCards();

  // 3. Обробник подій
  const handleImageChange = useCallback((url: string | null) => {
    setSelectedImage(url);
  }, []);

  const cancelEditing = () => {
    setData("");
    setSelectedImage(null);
    setEditingId(null);
  };

  const startEditing = useCallback((card: Card) => {
    setData(card.text),
      setSelectedImage(card.svg || null),
      setEditingId(card.id),
      window.scroll({ top: 0, behavior: "smooth" });
  }, []);

  const handleAddCard = useCallback(() => {
    if (data.trim() === "" && !selectedImage) return;

    if (editingId) {
      updateCardAction(editingId, data, selectedImage);
      setEditingId(null);
    } else {
      addCard(data, selectedImage); // Бізнес логіка
    }
    setData("");
    setSelectedImage(null);
  }, [data, selectedImage, addCard, editingId, updateCardAction]);

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

      if (e.key === "Escape") {
        cancelEditing();
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
    startEditing,
    cancelEditing,
    isEditing: !!editingId,
  };
};
