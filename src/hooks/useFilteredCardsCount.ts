import { useMemo } from "react";
import { useCards, useSearchQuery } from "../store/useNotionStore";

export const useFilteredCardsCount = () => {
  const cards = useCards();
  const searchQuery = useSearchQuery();

  return useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return cards.length;
    return cards.filter((card) => card.text.toLowerCase().includes(q)).length;
  }, [cards, searchQuery]);
};
