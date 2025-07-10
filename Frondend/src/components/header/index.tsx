import { Link, useNavigate } from "react-router-dom";
import { Search } from "../search";
import { Button } from "@mui/material";
import { IoArrowForwardSharp } from "react-icons/io5";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <header >
      {/* Top Strip */}
      <div className="top-strip py-2 border-t-[1px] border-gray-250 border-b-[1px]">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="col1 w-[50%]">
              <p className="text-[14px]">Hello</p>
            </div>

            <div className="col2 flex items-center justify-end">
              <ul className="flex items-center gap-2">
                <li className="">
                  <Link
                    to="help-center"
                    className="hover:text-cyan-600 transition"
                  >
                    Help Center
                  </Link>
                </li>
                <li className="">
                  <Link
                    to="order-tracking"
                    className="hover:text-cyan-600 transition"
                  >
                    Order Tracking
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Navigator */}
      <div className="header py-3">
        <div className="container flex items-center justify-between">
          <div className="">{/*Image log*/}</div>
          {/*Search box*/}
          <div className="">
            <Search />
          </div>
          {/*Login account*/}
          <div className="justify-end">
            <Button
              // component={Link}
              // to="/login"
              onClick={() => navigate("/auth/login")}
              variant="outlined" //
              className="!border-gray-500 !rounded-full hover:bg-gray-100 gap-2 !text-gray-800 shadow-lg"
            >
              Login
              <IoArrowForwardSharp></IoArrowForwardSharp>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
