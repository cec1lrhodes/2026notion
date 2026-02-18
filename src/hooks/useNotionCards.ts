import {
  useCards,
  useDeleteCard,
  useUpdateCard,
} from "../store/useNotionStore";

export const useNotionCards = () => {
  const cards = useCards();
  const deleteCard = useDeleteCard();
  const updateCard = useUpdateCard();

  return {
    cards, // ✅ Всі картки без фільтру
    deleteCard,
    onUpdateCard: updateCard,
  };
};
