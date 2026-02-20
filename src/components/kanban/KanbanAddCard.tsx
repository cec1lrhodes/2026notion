import React, { useState } from "react";
import {
  useKanbanStore,
  type Card,
  type ColumnId,
} from "../../store/useKanbanStore";

const CATEGORIES: Card["category"][] = ["DESIGN", "DEV", "CONTENT", "DEVOPS"];

interface Props {
  columnId: ColumnId;
}

export const KanbanAddCard: React.FC<Props> = ({ columnId }) => {
  const { addCard } = useKanbanStore();
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
      <button className="add-card-trigger" onClick={() => setOpen(true)}>
        <span>+</span> Add card
      </button>
    );
  }

  return (
    <div className="add-card-form">
      <input
        className="add-card-input"
        placeholder="Card title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
          if (e.key === "Escape") setOpen(false);
        }}
        autoFocus
      />
      <div className="add-card-row">
        <select
          className="add-card-select"
          value={category}
          onChange={(e) => setCategory(e.target.value as Card["category"])}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <div className="add-card-actions">
          <button className="btn-cancel" onClick={() => setOpen(false)}>
            Cancel
          </button>
          <button className="btn-add" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
