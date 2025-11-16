import { useEffect, useState } from "react";
import DropdownButton from "../Buttons/dropdown";
import { DropdownContent } from "../TextField/dropdownContent";
import "./index.css";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCategories } from "../../lib/api";

export default function Dropdown({ button_context, content }) {
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen(!open);
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchAllCategories,
    staleTime: Infinity,
  });

  return (
    <div className="relative">
      <DropdownButton open={open} toggle={handleToggle}>
        {button_context}
      </DropdownButton>
      <DropdownContent open={open}>{content}</DropdownContent>
    </div>
  );
}
