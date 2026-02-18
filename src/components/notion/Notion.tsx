import "./Notion.css";
import { NotionInputBar } from "./NotionInputBar";
import { NotionGrid } from "./NotionGrid";
import { SearchInput } from "./ui/inputs/SearchInput";

const Notion = () => {
  return (
    <div className="notion-container max-w-5xl mx-auto py-10 px-4">
      {/* --- ВЕРХНЯ ПАНЕЛЬ ВВОДУ (Input Bar) --- */}
      <NotionInputBar />

      <div className="w-full px-4 mb-6">
        <SearchInput />
      </div>

      {/* --- НИЖНЯ СІТКА (Grid blocks) --- */}
      <NotionGrid />
    </div>
  );
};

export default Notion;
