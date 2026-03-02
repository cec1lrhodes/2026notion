import { memo, useEffect } from "react";
import NotionCard from "./NotionCard";
import { useFilteredCards } from "../../hooks/useFilteredCards";

export const NotionGrid = memo(() => {
  const cards = useFilteredCards();

  return (
    <>
      {cards.length === 0 ? (
        <p className="text-zinc-500 text-sm mt-4 text-center">
          After adding, blocks will be displayed here.
        </p>
      ) : (
        <div className="results-grid">
          {cards.map((item) => (
            <NotionCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  );
});

NotionGrid.displayName = "NotionGrid";
