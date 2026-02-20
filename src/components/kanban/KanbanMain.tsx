import styles from "./styleKanban/stylesKanban.module.css";
import { useKanbanStore } from "../../store/useKanbanStore";
import { KanbanColum } from "./KanbanColumn";

const KanbanMain = () => {
  const columns = useKanbanStore((s) => s.columns);
  const totalCount = useKanbanStore((s) => s.getTotalCount());

  const sortedColumns = [...columns].sort((a, b) => a.order - b.order);

  return (
    <div className={styles.kanban}>
      <header className={styles.header}>
        <h1 className={styles.logo}>Kanban</h1>
        <span className={styles.meta}>
          Project board {totalCount} task{totalCount !== 1 ? "s" : ""}
        </span>
      </header>

      <div className={styles.board}>
        {sortedColumns.map((col) => (
          <KanbanColum column={col} key={col.id} />
        ))}
      </div>
    </div>
  );
};

export default KanbanMain;
