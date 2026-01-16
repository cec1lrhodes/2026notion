import "./Notion.css";
import { useNotion } from "../../hooks/useNotion";
import { NotionInputBar } from "./NotionInputBar";
import { NotionGrid } from "./NotionGrid";
import { SearchInput } from "./ui/inputs/SearchInput";

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
    onUpdateCard,
    searchQuery,
    handleSearchChange,
    totalCardCount,
  } = useNotion();

  return (
    <div className="notion-container max-w-5xl mx-auto py-10 px-4">
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

      <div className="w-full px-4 mb-6">
        <SearchInput
          value={searchQuery}
          onChange={handleSearchChange}
          count={totalCardCount}
        />
      </div>

      {/* --- НИЖНЯ СІТКА (Grid blocks) --- */}
      <NotionGrid
        onDelete={deleteCard}
        cards={cards}
        onEdit={startEditing}
        onUpdate={onUpdateCard}
        onCancelGlobalEdit={cancelEditing}
      />
    </div>
  );
};

export default Notion;
