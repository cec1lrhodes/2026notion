import styles from "./styleKanban/stylesKanban.module.css";
import { useKanbanStore } from "../../store/useKanbanStore";
import { KanbanColumn } from "./KanbanColumn";

const KanbanMain = () => {
  console.log("KanbanMain render");
  const columns = useKanbanStore((s) => s.columns);
  const totalCount = useKanbanStore((s) => s.getTotalCount());

  // sort для того,щоб колонки завжди були у правильному порядку, сортування по order (zustand мутувати стан напряму не може)
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
          <KanbanColumn column={col} key={col.id} />
        ))}
      </div>
    </div>
  );
};

export default KanbanMain;
