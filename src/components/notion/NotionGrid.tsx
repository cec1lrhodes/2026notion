import { memo, useEffect } from "react";
import NotionCard from "./NotionCard";
import { type Card } from "./types/type";
import { useDeleteCard, useUpdateCard } from "../../store/useNotionStore";
import { useFilteredCards } from "../../hooks/useFilteredCards";

interface NotionGridProps {
  cards: Card[];
}

export const NotionGrid = memo(() => {
  useEffect(() => {
    console.log("🟢 NotionGrid RENDERED, cards count:", cards.length);
  });

  const cards = useFilteredCards();

  const deleteCard = useDeleteCard();
  const updateCard = useUpdateCard();

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
              onDelete={deleteCard}
              onUpdate={updateCard}
            />
          ))}
        </div>
      )}
    </>
  );
});

NotionGrid.displayName = "NotionGrid";
