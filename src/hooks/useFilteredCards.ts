import { useMemo } from "react";
import { useCards, useSearchQuery } from "../store/useNotionStore";

export const useFilteredCards = () => {
  const cards = useCards();
  const searchQuery = useSearchQuery();

  return useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return cards;
    return cards.filter((card) => card.text.toLowerCase().includes(q));
  }, [cards, searchQuery]);
};
