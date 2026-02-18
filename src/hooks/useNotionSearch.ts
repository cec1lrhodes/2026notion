import { useCallback } from "react";
import { useSearchQuery, useSetSearchQuery } from "../store/useNotionStore";

export const useNotionSearch = () => {
  const searchQuery = useSearchQuery();
  const setSearchQuery = useSetSearchQuery();

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    [setSearchQuery],
  );

  return { handleSearchChange, searchQuery };
};
