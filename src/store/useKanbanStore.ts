import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Category = "DESIGN" | "DEV" | "CONTENT" | "DEVOPS";
export type ColumnId = "todo" | "in-progress" | "done";

export interface Card {
  id: string;
  title: string;
  category: Category;
  columnId: ColumnId;
  createdAt: number;
}

export interface Column {
  id: ColumnId;
  label: string;
  order: number;
}

interface KanbanState {
  cards: Card[];
  columns: Column[];

  // Card actions
  addCard: (card: Omit<Card, "id" | "createdAt">) => void;
  removeCard: (cardId: string) => void;
  moveCard: (cardId: string, targetColumnId: ColumnId) => void;
  updateCard: (
    cardId: string,
    patch: Partial<Pick<Card, "title" | "category">>,
  ) => void;

  // Selectors
  getCardsByColumn: (columnId: ColumnId) => Card[];
  getTotalCount: () => number;
}

const DEFAULT_COLUMNS: Column[] = [
  { id: "todo", label: "To Do", order: 1 },
  { id: "in-progress", label: "In Progress", order: 2 },
  { id: "done", label: "Done", order: 3 },
];

const DEFAULT_CARDS: Card[] = [
  {
    id: "c1",
    title: "Auth flow refactor",
    category: "DEV",
    columnId: "todo",
    createdAt: Date.now() - 5000,
  },
  {
    id: "c2",
    title: "Landing page copy",
    category: "CONTENT",
    columnId: "todo",
    createdAt: Date.now() - 4000,
  },
  {
    id: "c3",
    title: "Design system tokens",
    category: "DESIGN",
    columnId: "in-progress",
    createdAt: Date.now() - 3000,
  },
  {
    id: "c4",
    title: "Write unit tests",
    category: "DEV",
    columnId: "in-progress",
    createdAt: Date.now() - 2000,
  },
  {
    id: "c5",
    title: "API rate limiting",
    category: "DEV",
    columnId: "in-progress",
    createdAt: Date.now() - 1000,
  },
  {
    id: "c6",
    title: "Wireframe onboarding",
    category: "DESIGN",
    columnId: "in-progress",
    createdAt: Date.now() - 500,
  },
  {
    id: "c7",
    title: "Set up CI pipeline",
    category: "DEVOPS",
    columnId: "in-progress",
    createdAt: Date.now(),
  },
];

export const useKanbanStore = create<KanbanState>()(
  persist(
    (set, get) => ({
      cards: DEFAULT_CARDS,
      columns: DEFAULT_COLUMNS,

      addCard: (cardData) => {
        const newCard: Card = {
          ...cardData,
          id: `c${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          createdAt: Date.now(),
        };

        set((state) => ({ cards: [...state.cards, newCard] }));
      },

      removeCard: (cardId) => {
        set((state) => ({ cards: state.cards.filter((c) => c.id !== cardId) }));
      },

      moveCard: (cardId, targetColumnId) => {
        set((state) => ({
          cards: state.cards.map((c) =>
            c.id === cardId ? { ...c, columnId: targetColumnId } : c,
          ),
        }));
      },

      updateCard: (cardId, patch) => {
        set((state) => ({
          cards: state.cards.map((c) =>
            c.id === cardId ? { ...c, ...patch } : c,
          ),
        }));
      },

      getCardsByColumn: (columnId) => {
        return get()
          .cards.filter((c) => c.columnId === columnId)
          .sort((a, b) => a.createdAt - b.createdAt);
      },

      getTotalCount: () => get().cards.length,
    }),
    {
      name: "kanban-storage",
    },
  ),
);
