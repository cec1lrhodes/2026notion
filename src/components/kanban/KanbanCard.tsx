import styles from "./styleKanban/stylesKanban.module.css";
import { useKanbanStore, type Card } from "../../store/useKanbanStore";

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

export const KanbanCard: React.FC<Props> = ({ card }) => {
  const removeCard = useKanbanStore((s) => s.removeCard);
  const setDraggingCard = useKanbanStore((s) => s.setDraggingCard);

  const accentColor = CATEGORY_COLORS[card.category];
  const shortId = `#${card.id.slice(-6)}`;

  // Перетягування
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("cardId", card.id);
    e.dataTransfer.effectAllowed = "move";
    setTimeout(() => setDraggingCard(card.id), 0);
  };

  const handleDragEnd = () => setDraggingCard(null);

  return (
    <div
      className={styles.card}
      style={{ "--accent": accentColor } as React.CSSProperties}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
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
        <span className={styles.cardId}>{shortId}</span>
        <button
          className={styles.cardDeleteBtn}
          onClick={() => removeCard(card.id)}
          aria-label="Delete card"
          title="Delete card"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
