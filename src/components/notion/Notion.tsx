import "./Notion.css";
import { useNotion } from "../../hooks/useNotion";
import { NotionInputBar } from "./NotionInputBar";
import { NotionGrid } from "./NotionGrid";

const Notion = () => {
  const {
    data,
    cards,
    handleChange,
    handleKeyDown,
    addCard,
    deleteCard,
    selectedImage,
    handleImageChange,
    startEditing,
    cancelEditing,
    isEditing,
  } = useNotion();

  return (
    <div className="notion-container">
      {/* --- ВЕРХНЯ ПАНЕЛЬ ВВОДУ (Input Bar) --- */}
      <NotionInputBar
        value={data}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onSubmit={addCard}
        disabled={data.trim().length === 0}
        selectedImage={selectedImage}
        onImageSelect={handleImageChange}
        onCancel={cancelEditing}
        isEditing={isEditing}
      />
      {/* --- НИЖНЯ СІТКА (Grid blocks) --- */}
      <NotionGrid onDelete={deleteCard} cards={cards} onEdit={startEditing} />
    </div>
  );
};

export default Notion;
