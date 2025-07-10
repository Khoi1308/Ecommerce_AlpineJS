import { Button } from "@mui/material";
import { IoSearch } from "react-icons/io5";

export const Search = () => {
  return (
    <div className="searchBox w-[100%] h-[50px] bg-gray-300 rounded-[5px] relative p-2 flex">
      <input
        type="text"
        placeholder="Search for products..."
        className="justity-start w-full h-full focus: outline-none bg-inherit p-2"
      />
      <Button className="justify-end !rounded-full !text-gray-500">
        <IoSearch className="text-black text-[18px]"></IoSearch>
      </Button>
    </div>
  );
};
