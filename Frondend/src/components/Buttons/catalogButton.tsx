import { useState } from "react";

type Props = {
  default_open?: boolean;
  onToggle?: (open: boolean) => void;
};

export function CatalogButton({ default_open = false, onToggle }: Props) {
  const [open, setOpen] = useState(default_open);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    onToggle?.(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="bg-slate-700 rounded-full flex items-center justify-between text-white font-bold py-1 px-2"
    >
      <span>Catalog</span>
      <span className="px-3"></span>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-6 stroke-white m-1 bg-gray-400 rounded-full"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </span>
    </button>
  );
}
