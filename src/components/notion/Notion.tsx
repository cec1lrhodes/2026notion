import "./Notion.css";
import { useNotion } from "../hooks/useNotion";
import { NotionInputBar } from "./NotionInputBar";
import { NotionGrid } from "./NotionGrid";

const Notion = () => {
  const { data, cards, handleChange, handleKeyDown, addCard, deleteCard } =
    useNotion();

  return (
    <div className="notion-container">
      {/* --- ВЕРХНЯ ПАНЕЛЬ ВВОДУ (Input Bar) --- */}
      <NotionInputBar
        value={data}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onSubmit={addCard}
        disabled={data.trim().length === 0}
      />
      {/* --- НИЖНЯ СІТКА (Grid blocks) --- */}
      <NotionGrid onDelete={deleteCard} cards={cards} />
    </div>
  );
};

export default Notion;
