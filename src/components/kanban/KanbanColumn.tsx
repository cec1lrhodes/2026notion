import styles from "./styleKanban/stylesKanban.module.css";
import { useKanbanStore, type Column } from "../../store/useKanbanStore";
import { KanbanCard } from "./KanbanCard";
import { useShallow } from "zustand/shallow";

const COLUMN_ACCENT: Record<string, string> = {
  todo: "#f87171",
  "in-progress": "#fbbf24",
  done: "#4ade80",
};

interface Props {
  column: Column;
}

export const KanbanColum: React.FC<Props> = ({ column }) => {
  const accent = COLUMN_ACCENT[column.id] ?? "#6b7280";

  const cards = useKanbanStore(
    useShallow((s) =>
      s.cards
        .filter((c) => c.columnId === column.id)
        .sort((a, b) => a.createdAt - b.createdAt),
    ),
  );

  return (
    <div className={styles.column}>
      {/* Top accent line */}
      <div className="column-accent-line" style={{ background: accent }} />

      {/* Header */}
      <div className={styles.columnHeader}>
        <div className={styles.columnHeaderLeft}>
          <span className={styles.columnIndex} style={{ color: accent }}>
            {String(column.order).padStart(2, "0")}
          </span>
          <h2 className={styles.columnitle}>{column.label}</h2>
        </div>
        <span className={styles.columnCount}>{cards.length}</span>
      </div>

      {/* Cards */}
      <div className={styles.columnCards}>
        {cards.map((card) => (
          <KanbanCard key={card.id} card={card} />
        ))}
      </div>

      {/* Add card */}
      {/* <KanbanAddCard columnId={column.id} /> */}
    </div>
  );
};
