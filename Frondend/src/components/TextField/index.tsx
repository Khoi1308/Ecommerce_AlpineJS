import type { IInputProps } from "./types";

export const inputField = ({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  className = "",
  ...props
}: IInputProps) => {
  return (
    <div
      className={`flex items-center gap-3 mb-4 w-full px-5 py-2.5 bg-[#333A5C] rounded-full ${className}`}
    >
      <input
        className="bg-transparent outline-none text-white placeholder-gray-400 flex-1"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        {...props}
      />
    </div>
  );
};
