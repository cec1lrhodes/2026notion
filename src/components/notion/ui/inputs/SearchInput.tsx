import { memo } from "react";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  count: number; // Кількість знайдених карток
}

export const SearchInput = memo(
  ({ value, onChange, count }: SearchInputProps) => {
    return (
      <div className="relative w-full max-w-md mx-auto mb-6 group">
        {/* Іконка лупи */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-zinc-500 group-focus-within:text-blue-500 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search cards..."
          className="block w-full pl-10 pr-4 py-2 border border-zinc-800 rounded-lg leading-5 bg-zinc-900 text-zinc-300 placeholder-zinc-500 focus:outline-none focus:bg-zinc-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition-all duration-200"
        />

        {/* Лічильник результатів (показуємо, якщо щось введено) */}
        {value && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-xs text-zinc-600 font-mono">
              {count} results
            </span>
          </div>
        )}
      </div>
    );
  }
);
