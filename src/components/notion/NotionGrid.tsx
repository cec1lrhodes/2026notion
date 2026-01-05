import NotionCard from "./NotionCard";
import { type Article } from "./types/type";

interface NotionArticlesProps {
  articles: Article[];
  onDelete: (id: string) => void;
}

export const NotionGrid: React.FC<NotionArticlesProps> = ({
  articles,
  onDelete,
}) => {
  return (
    <>
      <div className="results-grid">
        {articles.map((item) => (
          <NotionCard key={item.id} item={item} onDelete={onDelete} />
        ))}
      </div>
      {/* Підказка, як на макеті */}
      <p className="text-zinc-500 text-sm mt-4 text-center">
        After adding, blocks will be displayed here.
      </p>
    </>
  );
};
