import { createContext, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigatePage } from "../../hooks/useNavigation";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../lib/api";
import { queryClient } from "../../config/queryClient";
import { ProfileImage } from "../ProfileImage";

export const Accounnt = createContext(false);
export const Header = () => {
  const { user, isLoading } = useAuth();
  const { gotoUserProfile, gotoHomePage, gotoLoginPage } = useNavigatePage();
  const [open, setOpen] = useState(false);
  const { mutate: Logout } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.clear();
      gotoHomePage();
    },
  });

  return (
    <div className="bg-gradient-to-r from-slate-900 to-gray-500 flex justify-between items-center px-1">
      <div className="container flex items-center justify-between">
        <div className="text-white text-md font-bold">Made in DMAK</div>
        <div className="flex items-center">
          <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <div className="flex items-center">
              <div className="text-white cursor-pointer">
                {user ? `Hello, ${user.username}` : "Hello, account"}{" "}
              </div>

              <div>
                <svg
                  onClick={() => setOpen((prev) => !prev)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6 stroke-white m-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </div>
            {open && (
              <div className="absolute right-0 z-50 bg-white shadow-md rounded-lg">
                {user ? (
                  <div className="flex flex-col items-center">
                    <div className="p-4">
                      <ProfileImage full_name={user?.username} />
                    </div>

                    <ul className="w-44 text-black p-2 rounded-md flex flex-col">
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          gotoUserProfile();
                          setOpen(false);
                        }}
                      >
                        Profile
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          Logout();
                          setOpen(false);
                        }}
                      >
                        Product
                      </li>
                                            <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          Logout();
                          setOpen(false);
                        }}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className="w-32 text-black p-3 rounded-md text-center">
                    <div
                      className="text-sm font-medium cursor-pointer hover:bg-gray-100 py-1 rounded"
                      onClick={() => {
                        gotoLoginPage();
                        setOpen(false);
                      }}
                    >
                      Login
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
