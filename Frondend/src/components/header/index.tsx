import { Link, useNavigate } from "react-router-dom";
import { Search } from "../search";
import { Button } from "@mui/material";
import { IoArrowForwardSharp } from "react-icons/io5";
import { ProfileImage } from "../ProfileImage";
import { useAuth } from "../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../lib/api";
import { queryClient } from "../../config/queryClient";

export const Header = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const { mutate: Logout } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.clear();
      navigate("/auth/login", {
        replace: true,
      });
    },
  });
  return (
    <header>
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
          <div className="">
            {user ? (
              <div className="relative group">
                <ProfileImage full_name={user.username} />
                <ul className="absolute hidden group-hover:flex flex-col shadow-md z-50 cursor-pointer">
                  <li className="hover:text-cyan-400 hover:bg-gray-100 px-5 py-2.5">
                    Profile
                  </li>
                  <li
                    className="hover:text-cyan-400 hover:bg-gray-100 px-5 py-2.5"
                    onClick={() => Logout()}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
