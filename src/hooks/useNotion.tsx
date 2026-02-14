import { useNotionSearch } from "./useNotionSearch";
import { useNotionInput } from "./useNotionInput";
import { useNotionCards } from "./useNotionCards";

/** Фасад: об'єднує всі три хуки для місць, де потрібен повний API. Для оптимізації ререндерів краще використовувати вузькі хуки напряму. */
export const useNotion = () => {
  const search = useNotionSearch();
  const input = useNotionInput();
  const cards = useNotionCards();

  return {
    ...search,
    ...input,
    ...cards,
    totalCardCount: search.totalCardCount,
  };
};
