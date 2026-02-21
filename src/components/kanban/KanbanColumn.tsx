import styles from "./styleKanban/stylesKanban.module.css";
import { useKanbanStore, type Column } from "../../store/useKanbanStore";
import { KanbanCard } from "./KanbanCard";
import { useShallow } from "zustand/shallow";
import { KanbanAddCard } from "./KanbanAddCard";

const COLUMN_GRADIENT: Record<string, string> = {
  todo: "linear-gradient(90deg, #f87171, #ef4444, #dc2626)",
  "in-progress": "linear-gradient(90deg, #fbbf24, #f59e0b, #d97706)",
  done: "linear-gradient(90deg, #4ade80, #22c55e, #16a34a)",
};

interface Props {
  column: Column;
}

export const KanbanColum: React.FC<Props> = ({ column }) => {
  const cards = useKanbanStore(
    useShallow((s) =>
      s.cards
        .filter((c) => c.columnId === column.id)
        .sort((a, b) => a.createdAt - b.createdAt),
    ),
  );

  const moveCard = useKanbanStore((s) => s.moveCard);
  const draggingCardId = useKanbanStore((s) => s.draggingCardId);
  const dragOverColumnId = useKanbanStore((s) => s.dragOverColumnId);
  const setDragOverColumn = useKanbanStore((s) => s.setDragOverColumn);

  const isDragOver = dragOverColumnId === column.id && draggingCardId !== null;
  const gradient = COLUMN_GRADIENT[column.id] ?? "#6b7280";

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverColumn(column.id);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // перевіряємо що мишка справді вийшла за межі колонки
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverColumn(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("cardId");
    if (cardId) moveCard(cardId, column.id);
    setDragOverColumn(null);
  };

  return (
    <div
      className={styles.column}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
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

      {/* Cards */}
      <div className={styles.columnCards}>
        {cards.map((card) => (
          <KanbanCard key={card.id} card={card} />
        ))}

        {/* Drop placeholder */}
        {isDragOver && <div className={styles.dropPlaceholder} />}
      </div>

      <KanbanAddCard columnId={column.id} />
    </div>
  );
};
