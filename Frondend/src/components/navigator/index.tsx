import { Search } from "../search";
import { useAuth } from "../../hooks/useAuth";
import { useNavigatePage } from "../../hooks/useNavigation";
import { useState } from "react";
import { CatalogButton } from "../Buttons/catalogButton";
import { FaCartArrowDown, FaPhone, FaTruck } from "react-icons/fa";

export const Navbar = () => {
  const { user, isLoading } = useAuth();
  const [open, setOpen] = useState(false);
  const { gotoHomePage } = useNavigatePage();

  return (
    <>
      {/* Navigator */}
      <div className="py-3 shadow-md">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-20">
            <div
              className="font-oswald font-bold uppercase cursor-pointer"
              onClick={() => gotoHomePage()}
            >
              DmakCTN
            </div>
            <CatalogButton default_open={open} onToggle={setOpen} />
          </div>

          {/*Search box*/}
          <div className="">
            <Search />
          </div>

          {/**/}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 hover:bg-gray-100 rounded-lg p-2">
              <span>
                <FaTruck className="text-2xl"></FaTruck>
              </span>
              <span>Payment and Delivery</span>
            </div>
            <div className="flex items-center gap-2 hover:bg-gray-100 rounded-lg p-2">
              <span>
                <FaPhone className="text-xl"></FaPhone>
              </span>
              <span>Phone number</span>
            </div>
            <div className="flex items-center gap-2 hover:bg-gray-100 rounded-lg p-2">
              <span>
                <FaCartArrowDown className="text-2xl"></FaCartArrowDown>
              </span>
              <span>Cart</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
