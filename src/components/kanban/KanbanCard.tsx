import styles from "./styleKanban/stylesKanban.module.css";
import {
  useKanbanStore,
  type ColumnId,
  type Card,
} from "../../store/useKanbanStore";
import { useState } from "react";

const CATEGORY_COLORS: Record<Card["category"], string> = {
  DESIGN: "#a78bfa",
  DEV: "#34d399",
  CONTENT: "#f97316",
  DEVOPS: "#f59e0b",
};

interface Props {
  card: Card;
}

// ─── Component ────────────────────────────────────────────────────────────────

const COLUMN_OPTIONS: { id: ColumnId; label: string }[] = [
  { id: "todo", label: "To Do" },
  { id: "in-progress", label: "In Progress" },
  { id: "done", label: "Done" },
];

export const KanbanCard: React.FC<Props> = ({ card }) => {
  const { removeCard, moveCard } = useKanbanStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const accentColor = CATEGORY_COLORS[card.category];
  const shortId = `#${card.id.slice(-6)}`;

  return (
    <div
      className={styles.card}
      style={
        {
          "--accent": accentColor,
        } as React.CSSProperties
      }
    >
      {/* Category badge */}
      <div className={styles.cardCategory}>
        <span
          className={styles.categoryDot}
          style={{ background: accentColor }}
        />
        <span className={styles.categoryLabel} style={{ color: accentColor }}>
          {card.category}
        </span>
      </div>

      {/* Title */}
      <p className={styles.cardTitle}>{card.title}</p>

      {/* Footer */}
      <div className={styles.cardFooter}>
        <span className={styles.cardI}>{shortId}</span>

        {/* Context menu */}
        <div className={styles.cardMenuWrapper}>
          <button
            className={styles.cardMenuBtn}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Card options"
          >
            ···
          </button>
          {menuOpen && (
            <div
              className={styles.cardMenu}
              onMouseLeave={() => setMenuOpen(false)}
            >
              {COLUMN_OPTIONS.filter((col) => col.id !== card.columnId).map(
                (col) => (
                  <button
                    key={col.id}
                    className={styles.cardMenuItem}
                    onClick={() => {
                      moveCard(card.id, col.id);
                      setMenuOpen(false);
                    }}
                  >
                    → {col.label}
                  </button>
                ),
              )}
              <button
                className={styles.cardMenuItemDanger}
                onClick={() => {
                  removeCard(card.id);
                  setMenuOpen(false);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
