import { useCallback, useState, useEffect } from "react";
import { useNotionStore } from "../store/useNotionStore";

export const useNotionInput = () => {
  const [data, setData] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const editingId = useNotionStore((s) => s.editingId);
  const cards = useNotionStore((s) => s.cards);
  const setEditingId = useNotionStore((s) => s.setEditingId);
  const addCardToStore = useNotionStore((s) => s.addCard);
  const updateCardAction = useNotionStore((s) => s.updateCard);

  useEffect(() => {
    if (editingId) {
      const card = cards.find((c) => c.id === editingId);
      if (card) {
        setData(card.text);
        setSelectedImage(card.svg ?? null);
      }
    } else {
      setData("");
      setSelectedImage(null);
    }
  }, [editingId, cards]);

  const handleImageChange = useCallback((url: string | null) => {
    setSelectedImage(url);
  }, []);

  const cancelEditing = useCallback(() => {
    setData("");
    setSelectedImage(null);
    setEditingId(null);
  }, [setEditingId]);

  const handleAddCard = useCallback(() => {
    if (data.trim() === "" && !selectedImage) return;

    if (editingId) {
      updateCardAction(editingId, data, selectedImage);
      setEditingId(null);
    } else {
      addCardToStore(data, selectedImage);
    }
    setData("");
    setSelectedImage(null);
  }, [
    data,
    selectedImage,
    editingId,
    addCardToStore,
    updateCardAction,
    setEditingId,
  ]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setData(e.target.value);
    },
    [],
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
    [handleAddCard, cancelEditing],
  );

  return {
    data,
    selectedImage,
    handleChange,
    handleKeyDown,
    addCard: handleAddCard,
    handleImageChange,
    cancelEditing,
    isEditing: !!editingId,
  };
};
