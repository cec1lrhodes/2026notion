import { useCallback, useState, useMemo } from "react";
import { useNotionStore } from "../store/useNotionStore";
import { type Card } from "../store/useNotionStore";

export const useNotion = () => {
  // 1. UI logic - фурижить через UI
  const [data, setData] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 2. domain logic ZUSTAND
  const cards = useNotionStore((s) => s.cards);
  const searchQuery = useNotionStore((s) => s.searchQuery);
  const editingId = useNotionStore((s) => s.editingId);

  const addCardToStore = useNotionStore((s) => s.addCard);
  const updateCardAction = useNotionStore((s) => s.updateCard);
  const deleteCard = useNotionStore((s) => s.deleteCard);
  const setSearchQuery = useNotionStore((s) => s.setSearchQuery);
  const setEditingId = useNotionStore((s) => s.setEditingId);

  // 3. Обробник подій
  const handleImageChange = useCallback((url: string | null) => {
    setSelectedImage(url);
  }, []);

  const cancelEditing = useCallback(() => {
    setData("");
    setSelectedImage(null);
    setEditingId(null);
  }, [setEditingId]);

  const startEditing = useCallback(
    (card: Card) => {
      (setData(card.text),
        setSelectedImage(card.svg || null),
        setEditingId(card.id),
        window.scroll({ top: 0, behavior: "smooth" }));
    },
    [setEditingId],
  );

  const handleAddCard = useCallback(() => {
    if (data.trim() === "" && !selectedImage) return;

    if (editingId) {
      updateCardAction(editingId, data, selectedImage);
      setEditingId(null);
    } else {
      addCardToStore(data, selectedImage); // Бізнес логіка
    }
    setData("");
    setSelectedImage(null);
  }, [data, selectedImage, addCardToStore, editingId, updateCardAction]);

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

  const filteredCards = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return cards;
    return cards.filter((card) => card.text.toLowerCase().includes(q));
  }, [cards, searchQuery]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    [setSearchQuery],
  );

  return {
    data,
    cards: filteredCards,
    totalCardCount: filteredCards.length,
    selectedImage,
    handleChange,
    handleKeyDown,
    handleImageChange,
    addCard: handleAddCard,
    deleteCard,
    startEditing,
    cancelEditing,
    isEditing: !!editingId,
    onUpdateCard: updateCardAction,
    searchQuery,
    handleSearchChange,
  };
};
