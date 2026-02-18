import { useCallback } from "react";
import { useSetEditingId } from "../store/useNotionStore";
import type { Card } from "../components/notion/types/type";

export const useCardEditing = () => {
  const setEditingId = useSetEditingId();

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
    startEditing,
    cancelEditing,
  };
};
