import styles from "./styleKanban/stylesKanban.module.css";
import { useKanbanStore, type Column } from "../../store/useKanbanStore";
import { KanbanCard } from "./KanbanCard";
import { useShallow } from "zustand/shallow";
import { KanbanAddCard } from "./KanbanAddCard";
import ColumnDropFunc from "./ColumnDropFunc";
import React from "react";

const COLUMN_GRADIENT: Record<string, string> = {
  todo: "linear-gradient(90deg, #f87171, #ef4444, #dc2626)",
  "in-progress": "linear-gradient(90deg, #fbbf24, #f59e0b, #d97706)",
  done: "linear-gradient(90deg, #4ade80, #22c55e, #16a34a)",
};

interface Props {
  column: Column;
}

export const KanbanColumn = React.memo(({ column }: Props) => {
  const cards = useKanbanStore(
    useShallow((s) =>
      s.cards
        // відповідна картка до колонки
        .filter((c) => c.columnId === column.id)
        .sort((a, b) => a.createdAt - b.createdAt),
    ),
  );

  const gradient = COLUMN_GRADIENT[column.id] ?? "#6b7280";

  return (
    <div className={styles.column}>
      {/* Top accent line */}
      <div className="column-accent-line" style={{ background: gradient }} />

      {/* Header */}
      <div className={styles.columnHeader}>
        <div className={styles.columnHeaderLeft}>
          <span className={styles.columnIndex}>
            {String(column.order).padStart(2, "0")}
          </span>
          <h2 className={styles.columnTitle}>{column.label}</h2>
        </div>
        <span className={styles.columnCount}>{cards.length}</span>
      </div>

      {/* Cards  + ColumnDrop*/}
      <ColumnDropFunc columnId={column.id}>
        <div className={styles.columnCards}>
          {cards.map((card) => (
            <KanbanCard key={card.id} card={card} />
          ))}
        </div>
      </ColumnDropFunc>

      <KanbanAddCard columnId={column.id} />
    </div>
  );
});
