import { useNotionStore } from "../store/useNotionStore";
import { useCallback, useMemo } from "react";

export const useNotionSearch = () => {
  const searchQuery = useNotionStore((s) => s.searchQuery);
  const setSearchQuery = useNotionStore((s) => s.setSearchQuery);
  const cards = useNotionStore((s) => s.cards);

  const totalCardCount = useMemo(() => {
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

  return { totalCardCount, handleSearchChange, searchQuery };
};
