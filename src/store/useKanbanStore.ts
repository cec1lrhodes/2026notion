import { create } from "zustand";

export type Category = "BOOKS" | "DEV" | "CONTENT" | "DEVOPS";
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

  draggingCardId: string | null;
  dragOverColumnId: ColumnId | null;

  // Card actions
  addCard: (card: Omit<Card, "id" | "createdAt">) => void;
  removeCard: (cardId: string) => void;
  moveCard: (cardId: string, targetColumnId: ColumnId) => void;
  updateCard: (
    cardId: string,
    patch: Partial<Pick<Card, "title" | "category">>,
  ) => void;

  setDraggingCard: (cardId: string | null) => void;
  setDragOverColumn: (columnId: ColumnId | null) => void;

  // Selectors
  getTotalCount: () => number;
  clearColumn: (columnId: ColumnId) => void;

  resetKanban: () => void;
  loadUserData: (email: string) => void;
}

const DEFAULT_COLUMNS: Column[] = [
  { id: "todo", label: "To Do", order: 1 },
  { id: "in-progress", label: "In Progress", order: 2 },
  { id: "done", label: "Done", order: 3 },
];

// const DEFAULT_CARDS: Card[] = [
//   {
//     id: "c1",
//     title: "Auth flow refactor",
//     category: "DEV",
//     columnId: "todo",
//     createdAt: Date.now() - 5000,
//   },
//   {
//     id: "c2",
//     title: "Landing page copy",
//     category: "CONTENT",
//     columnId: "todo",
//     createdAt: Date.now() - 4000,
//   },
//   {
//     id: "c3",
//     title: "Design system tokens",
//     category: "DESIGN",
//     columnId: "in-progress",
//     createdAt: Date.now() - 3000,
//   },
//   {
//     id: "c4",
//     title: "Write unit tests",
//     category: "DEV",
//     columnId: "in-progress",
//     createdAt: Date.now() - 2000,
//   },
//   {
//     id: "c5",
//     title: "API rate limiting",
//     category: "DEV",
//     columnId: "in-progress",
//     createdAt: Date.now() - 1000,
//   },
//   {
//     id: "c6",
//     title: "Wireframe onboarding",
//     category: "DESIGN",
//     columnId: "in-progress",
//     createdAt: Date.now() - 500,
//   },
//   {
//     id: "c7",
//     title: "Set up CI pipeline",
//     category: "DEVOPS",
//     columnId: "in-progress",
//     createdAt: Date.now(),
//   },
// ];

const getUserCards = (email: string): Card[] => {
  const raw = localStorage.getItem(`kanban-${email}`);
  return raw ? JSON.parse(raw) : [];
};

const saveUserCards = (email: string, cards: Card[]) => {
  localStorage.setItem(`kanban-${email}`, JSON.stringify(cards));
};

export const useKanbanStore = create<KanbanState>()((set, get) => ({
  cards: [],
  columns: DEFAULT_COLUMNS,

  draggingCardId: null,
  dragOverColumnId: null,

  addCard: (cardData) => {
    const newCard: Card = {
      ...cardData,
      id: `c${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      createdAt: Date.now(),
    };
    set((state) => {
      const cards = [...state.cards, newCard];
      const email = localStorage.getItem("current-user"); // читаємо без імпорту store
      if (email) saveUserCards(email, cards);
      return { cards };
    });
  },

  removeCard: (cardId) => {
    set((state) => {
      const cards = state.cards.filter((c) => c.id !== cardId);
      const email = localStorage.getItem("current-user");
      if (email) saveUserCards(email, cards);
      return { cards };
    });
  },

  moveCard: (cardId, targetColumnId) => {
    set((state) => {
      const cards = state.cards.map((c) =>
        c.id === cardId ? { ...c, columnId: targetColumnId } : c,
      );
      const email = localStorage.getItem("current-user");
      if (email) saveUserCards(email, cards);
      return { cards };
    });
  },

  updateCard: (cardId, patch) => {
    set((state) => {
      const cards = state.cards.map((c) =>
        c.id === cardId ? { ...c, ...patch } : c,
      );
      const email = localStorage.getItem("current-user");
      if (email) saveUserCards(email, cards);
      return { cards };
    });
  },

  resetKanban: () => set({ cards: [] }),

  loadUserData: (email) => {
    const cards = getUserCards(email);
    set({ cards });
  },

  setDraggingCard: (cardId) => set({ draggingCardId: cardId }),
  setDragOverColumn: (columnId) => set({ dragOverColumnId: columnId }),

  getTotalCount: () => get().cards.length,

  clearColumn: (columnId) => {
    set((state) => {
      const cards = state.cards.filter((c) => c.columnId !== columnId);
      const email = localStorage.getItem("current-user");
      if (email) saveUserCards(email, cards);
      return { cards };
    });
  },
}));
