import { memo } from "react";
import NotionCard from "./NotionCard";
import { type Card } from "./types/type";

interface NotionCardProps {
  cards: Card[];
  onDelete: (id: string) => void;
  onEdit: (card: Card) => void;
}

export const NotionGrid = memo(
  ({ cards, onDelete, onEdit }: NotionCardProps) => {
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
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </div>
        )}
      </>
    );
  }
);
