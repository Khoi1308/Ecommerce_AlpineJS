import { FaChevronDown } from "react-icons/fa";

export default function DropdownButton({ open, toggle, children }) {
  return (
    <div
      onClick={toggle}
      className={`flex items-center bg-white rounded-md shadow-md p-2 gap-2 cursor-pointer ${
        open ? "border-2 border-blue-300" : null
      }`}
    >
      {children}
      <span className={open ? "rotate-180" : "rotate-0"}>
        <FaChevronDown></FaChevronDown>
      </span>
    </div>
  );
}
