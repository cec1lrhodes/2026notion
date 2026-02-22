import React, { useCallback } from "react";
import { useKanbanStore, type ColumnId } from "../../store/useKanbanStore";
import styles from "./styleKanban/stylesKanban.module.css";

const ColumnDropFunc = React.memo(
  ({
    columnId,
    children,
  }: {
    columnId: ColumnId;
    children: React.ReactNode;
  }) => {
    const isDragOver = useKanbanStore(
      (s) => s.dragOverColumnId === columnId && s.draggingCardId !== null,
    );

    const setDragOverColumn = useKanbanStore((s) => s.setDragOverColumn);
    const moveCard = useKanbanStore((s) => s.moveCard);

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      setDragOverColumn(columnId);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      // перевіряємо що мишка справді вийшла за межі колонки
      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
        setDragOverColumn(null);
      }
    };

    // DnD api connect
    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        const cardId = e.dataTransfer.getData("cardId");
        if (cardId) moveCard(cardId, columnId);
        setDragOverColumn(null);
      },
      [columnId],
    );

    return (
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {children}
        {isDragOver && <div className={styles.dropPlaceholder} />}
      </div>
    );
  },
);

export default ColumnDropFunc;
