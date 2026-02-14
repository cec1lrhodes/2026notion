import { useCallback, useMemo } from "react";
import { useNotionStore } from "../store/useNotionStore";
import type { Card } from "../store/useNotionStore";

export const useNotionCards = () => {
  const cards = useNotionStore((s) => s.cards);
  const searchQuery = useNotionStore((s) => s.searchQuery);
  const setEditingId = useNotionStore((s) => s.setEditingId);
  const deleteCard = useNotionStore((s) => s.deleteCard);
  const updateCard = useNotionStore((s) => s.updateCard);

  const filteredCards = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return cards;
    return cards.filter((card) => card.text.toLowerCase().includes(q));
  }, [cards, searchQuery]);

  const startEditing = useCallback(
    (card: Card) => {
      setEditingId(card.id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [setEditingId],
  );

  const cancelEditing = useCallback(() => {
    setEditingId(null);
  }, [setEditingId]);

  return {
    cards: filteredCards,
    deleteCard,
    startEditing,
    onUpdateCard: updateCard,
    cancelEditing,
  };
};
