import { useCallback, useState, useMemo } from "react";
import { useCardsManager } from "./useCardsManager";
import { type Card } from "../components/notion/types/type";

export const useNotion = () => {
  // 1. UI logic
  const [data, setData] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 2. domain logic
  const {
    cards: allCards,
    addCard: addCardToStorage,
    deleteCard,
    updateCardAction,
  } = useCardsManager();

  // 3. Обробник подій
  const handleImageChange = useCallback((url: string | null) => {
    setSelectedImage(url);
  }, []);

  const cancelEditing = useCallback(() => {
    setData("");
    setSelectedImage(null);
    setEditingId(null);
  }, []);

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
      addCardToStorage(data, selectedImage); // Бізнес логіка
    }
    setData("");
    setSelectedImage(null);
  }, [data, selectedImage, addCardToStorage, editingId, updateCardAction]);

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
    [handleAddCard, cancelEditing]
  );

  const filteredCard = useMemo(() => {
    if (!searchQuery.trim()) return allCards;

    return allCards.filter((card) =>
      card.text.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
    );
  }, [allCards, searchQuery]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  return {
    data,
    cards: filteredCard,
    totalCardCount: filteredCard.length,
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
