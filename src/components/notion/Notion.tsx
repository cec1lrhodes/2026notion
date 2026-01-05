import "./Notion.css";
import { useNotion } from "./useNotion";
import { NotionInputBar } from "./NotionInputBar";
import { NotionGrid } from "./NotionGrid";

const Notion = () => {
  const {
    data,
    articles,
    handleChange,
    handleKeyDown,
    addArticle,
    deleteArticle,
  } = useNotion();

  return (
    <div className="notion-container">
      {/* --- ВЕРХНЯ ПАНЕЛЬ ВВОДУ (Input Bar) --- */}
      <NotionInputBar
        value={data}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onSubmit={addArticle}
        disabled={data.trim().length === 0}
      />
      {/* --- НИЖНЯ СІТКА (Grid blocks) --- */}
      <NotionGrid onDelete={deleteArticle} articles={articles} />
    </div>
  );
};

export default Notion;
