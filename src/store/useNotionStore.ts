import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Card {
  id: string;
  text: string;
  svg?: string;
}

interface NotionState {
  cards: Card[];
  searchQuery: string;
  editingId: string | null;
}

interface NotionActions {
  addCard(text: string, svg: string | null): void;
  updateCard(id: string, text: string, svg: string | null): void;
  deleteCard(id: string): void;
  setSearchQuery(query: string): void;
  setEditingId(id: string | null): void;
}

type NotionStore = NotionState & NotionActions;

export const useNotionStore = create<NotionStore>()(
  persist(
    (set) => ({
      // --- state ---
      cards: [],
      searchQuery: "",
      editingId: null,

      // --- actions ---
      addCard: (text, svg) =>
        set((state) => ({
          cards: [
            ...state.cards,
            {
              id: crypto.randomUUID(),
              text,
              ...(svg ? { svg } : {}),
            },
          ],
        })),

      updateCard: (id, text, svg) =>
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === id ? { ...card, text, svg: svg ?? undefined } : card,
          ),
        })),

      deleteCard: (id) =>
        set((state) => ({
          cards: state.cards.filter((card) => card.id !== id),
        })),

      setSearchQuery: (query) => set({ searchQuery: query }),

      setEditingId: (id) => set({ editingId: id }),
    }),
    {
      name: "notion-cards", // ключ для localStorage
    },
  ),
);
