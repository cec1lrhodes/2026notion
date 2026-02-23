// stores/notion/notionStore.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type SortBy = "date" | "title";
export type SortOrder = "asc" | "desc";

export interface NotionCard {
  id: string;
  text: string;
  svg?: string;
  isExpanded?: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
}

export interface NotionFilters {
  searchQuery: string;
  selectedTags: string[];
  sortBy: SortBy;
  sortOrder: SortOrder;
}

interface NotionState {
  cards: NotionCard[];
  filters: NotionFilters;
  selectedCardId: string | null;
  isLoading: boolean;
  error: string | null;
}

type NewCardInput = {
  text: string;
  svg?: string;
  tags?: string[];
};

interface NotionActions {
  addCard(card: NewCardInput): void;
  updateCard(id: string, updates: Partial<NotionCard>): void;
  deleteCard(id: string): void;
  toggleCardExpand(id: string): void;

  setSearchQuery(query: string): void;
  toggleTag(tag: string): void;
  setSortBy(sortBy: SortBy): void;

  selectCard(id: string | null): void;

  clearAllFilters(): void;
  resetStore(): void;
  loadUserData(email: string): void;
}

export type NotionStore = NotionState & NotionActions;

const initialFilters: NotionFilters = {
  searchQuery: "",
  selectedTags: [],
  sortBy: "date",
  sortOrder: "desc",
};

const initialState: NotionState = {
  cards: [],
  filters: initialFilters,
  selectedCardId: null,
  isLoading: false,
  error: null,
};

// helpers
const getUserNotes = (email: string): NotionCard[] => {
  const raw = localStorage.getItem(`notion-${email}`);
  return raw ? JSON.parse(raw) : [];
};

const saveUserNotes = (email: string, cards: NotionCard[]) => {
  localStorage.setItem(`notion-${email}`, JSON.stringify(cards));
};

export const useNotionStore = create<NotionStore>()(
  devtools(
    persist(
      immer<NotionStore>((set) => ({
        ...initialState,

        // Card CRUD - кожна функція робить одну річ (SRP)
        addCard: (cardData) =>
          set((state) => {
            const newCard: NotionCard = {
              ...cardData,
              id: crypto.randomUUID(),
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            state.cards.push(newCard);
            const email = localStorage.getItem("current-user");
            if (email) saveUserNotes(email, state.cards);
          }),

        updateCard: (id, updates) =>
          set((state) => {
            const card = state.cards.find((c: NotionCard) => c.id === id);
            if (card) {
              Object.assign(card, updates, { updatedAt: new Date() });
              const email = localStorage.getItem("current-user");
              if (email) saveUserNotes(email, state.cards);
            }
          }),

        deleteCard: (id) =>
          set((state) => {
            state.cards = state.cards.filter((c: NotionCard) => c.id !== id);
            if (state.selectedCardId === id) {
              state.selectedCardId = null;
              const email = localStorage.getItem("current-user");
              if (email) saveUserNotes(email, state.cards);
            }
          }),

        toggleCardExpand: (id) =>
          set((state) => {
            const card = state.cards.find((c: NotionCard) => c.id === id);
            if (card) {
              card.isExpanded = !card.isExpanded;
            }
          }),

        // Filters
        setSearchQuery: (query) =>
          set((state) => {
            state.filters.searchQuery = query;
          }),

        toggleTag: (tag) =>
          set((state) => {
            const tags = state.filters.selectedTags as string[];
            const index = tags.indexOf(tag);
            if (index > -1) {
              tags.splice(index, 1);
            } else {
              tags.push(tag);
            }
          }),

        loadUserData: (email) =>
          set((state) => {
            state.cards = getUserNotes(email);
          }),

        resetNotion: () => set(initialState),

        setSortBy: (sortBy) =>
          set((state) => {
            state.filters.sortBy = sortBy;
          }),

        // Selection (editingId)
        selectCard: (id) => set({ selectedCardId: id }),

        // Batch operations
        clearAllFilters: () =>
          set((state) => {
            state.filters = { ...initialFilters };
          }),

        resetStore: () => set(initialState),
      })),
      {
        name: "notion-storage",
        partialize: (state) => ({
          cards: state.cards,
          filters: state.filters,
        }), // Зберігаємо тільки важливі дані
      },
    ),
    { name: "NotionStore" },
  ),
);

// ---- Вузькі селектор-хуки ----

export const useCards = () => useNotionStore((s) => s.cards);

export const useSearchQuery = () =>
  useNotionStore((s) => s.filters.searchQuery);

export const useSetSearchQuery = () => useNotionStore((s) => s.setSearchQuery);

export const useEditingId = () => useNotionStore((s) => s.selectedCardId);

export const useSetEditingId = () => useNotionStore((s) => s.selectCard);

export const useDeleteCard = () => useNotionStore((s) => s.deleteCard);

export const useToggleCardExpand = () =>
  useNotionStore((s) => s.toggleCardExpand);

export const useAddCard = () => {
  const add = useNotionStore((s) => s.addCard);
  return (text: string, svg: string | null) => {
    const trimmed = text.trim();
    if (!trimmed && !svg) return;
    add({
      text: trimmed,
      svg: svg ?? undefined,
    });
  };
};

export const useUpdateCard = () => {
  const update = useNotionStore((s) => s.updateCard);
  return (id: string, text: string, svg: string | null) => {
    const trimmed = text.trim();
    update(id, {
      text: trimmed,
      svg: svg ?? undefined,
    });
  };
};

// Для типів у хуках/компонентах
export type Card = NotionCard;
