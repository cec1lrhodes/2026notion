import { memo } from "react";
import NotionCard from "./NotionCard";
import { type Article } from "./types/type";

interface NotionArticlesProps {
  articles: Article[];
  onDelete: (id: string) => void;
}

export const NotionGrid = memo(
  ({ articles, onDelete }: NotionArticlesProps) => {
    return (
      <>
        {articles.length === 0 ? (
          <p className="text-zinc-500 text-sm mt-4 text-center">
            After adding, blocks will be displayed here.
          </p>
        ) : (
          <div className="results-grid">
            {articles.map((item) => (
              <NotionCard key={item.id} item={item} onDelete={onDelete} />
            ))}
          </div>
        )}
      </>
    );
  }
);
