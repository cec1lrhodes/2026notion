import { memo } from "react";
import NotionCard from "./NotionCard";
import { type Card } from "./types/type";

interface NotionGridProps {
  cards: Card[];
}

export const NotionGrid = memo(
  ({ cards }: NotionGridProps) => {
    return (
      <>
        {cards.length === 0 ? (
          <p className="text-zinc-500 text-sm mt-4 text-center">
            After adding, blocks will be displayed here.
          </p>
        ) : (
          <div className="results-grid">
            {cards.map((item) => (
              <NotionCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
        )}
      </>
    );
  }
);
