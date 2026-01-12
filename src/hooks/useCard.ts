import { type Card } from "../components/notion/types/type";
import { useLocalStorage } from "./useLocalStorage";
import { useCallback } from "react";

const STORAGE_KEY = "notion_cards";

export const useCards = () => {
  const [cards, setCards] = useLocalStorage<Card[]>(STORAGE_KEY, []);

  const addCard = useCallback(
    (text: string, imageUrl?: string | null) => {
      const newCard: Card = {
        id: crypto.randomUUID(),
        text,
        svg: imageUrl || undefined,
      };
      // setCard([newCard, ...card]); при цьому варіанті потрібно додавати card в залежності, що несе за собою ререндер
      setCards((prev) => [newCard, ...prev]);
    },
    [setCards]
  );

  const deleteCard = useCallback(
    (id: string) => {
      setCards((prevCard) => prevCard.filter((card) => card.id !== id));
    },
    [setCards]
  );

  const updateCardAction = useCallback(
    (id: string, text: string, imageUrl?: string | null) => {
      setCards((prev) =>
        prev.map((card) =>
          card.id === id ? { ...card, text, svg: imageUrl || undefined } : card
        )
      );
    },
    [setCards]
  );

  return { cards, addCard, deleteCard, updateCardAction };
};
