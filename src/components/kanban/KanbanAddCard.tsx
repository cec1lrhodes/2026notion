import React, { useState } from "react";
import {
  useKanbanStore,
  type Card,
  type ColumnId,
} from "../../store/useKanbanStore";
import styles from "./styleKanban/stylesKanban.module.css";

const CATEGORIES: Card["category"][] = ["BOOKS", "DEV", "CONTENT", "DEVOPS"];

interface Props {
  columnId: ColumnId;
}

export const KanbanAddCard: React.FC<Props> = ({ columnId }) => {
  const addCard = useKanbanStore((s) => s.addCard);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Card["category"]>("DEV");

  const handleSubmit = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    addCard({ title: trimmed, category, columnId });
    setTitle("");
    setCategory("DEV");
    setOpen(false);
  };

  if (!open) {
    return (
      <button className={styles.addCardTrigger} onClick={() => setOpen(true)}>
        <span>+</span> Add card
      </button>
    );
  }

  return (
    <div className={styles.addCardForm}>
      <input
        className={styles.addCardInput}
        placeholder="Card title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
          if (e.key === "Escape") setOpen(false);
        }}
        autoFocus
      />
      <div className={styles.addCardRow}>
        <select
          className={styles.addCardSelect}
          value={category}
          onChange={(e) => setCategory(e.target.value as Card["category"])}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <div className={styles.addCardActions}>
          <button className={styles.btnCancel} onClick={() => setOpen(false)}>
            Cancel
          </button>
          <button className={styles.btnAdd} onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
