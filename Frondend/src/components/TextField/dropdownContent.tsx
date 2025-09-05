export const DropdownContent = ({ open, children }) => {
  return (
    <div
      className={`absolute top-full flex flex-col w-full shadow-md overflow-y-scroll mt-2 bg-white border border-gray-200 rounded-md z-10 transition-all duration-200 ${
        open ? "max-h-60 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
      }`}
    >
      {children}
    </div>
  );
};
