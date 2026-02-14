import "./Notion.css";
import { useNotion } from "../../hooks/useNotion";
import { NotionInputBar } from "./NotionInputBar";
import { NotionGrid } from "./NotionGrid";
import { SearchInput } from "./ui/inputs/SearchInput";
import { useNotionCards } from "../../hooks/useNotionCards";

const Notion = () => {
  const { cards } = useNotionCards();

  return (
    <div className="notion-container max-w-5xl mx-auto py-10 px-4">
      {/* --- ВЕРХНЯ ПАНЕЛЬ ВВОДУ (Input Bar) --- */}
      <NotionInputBar />

      <div className="w-full px-4 mb-6">
        <SearchInput />
      </div>

      {/* --- НИЖНЯ СІТКА (Grid blocks) --- */}
      <NotionGrid cards={cards} />
    </div>
  );
};

export default Notion;
