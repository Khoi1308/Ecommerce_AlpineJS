import { useState } from "react";
import { MdOutlinePersonalInjury } from "react-icons/md";
import { BiLogoGmail } from "react-icons/bi";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { register } from "../lib/api";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const {
    mutate: SignUp,
    isPending,
    isError,
  } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      // Navigate to Home page
      navigate("/auth/login", {
        replace: true,
      });
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen p-2">
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg text-indigo-300">
        <h2 className="text-center text-white mb-4 text-lg">Create Account</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            SignUp({ username, email, password, confirmPassword });
          }}
        >
          {isError && (
            <div className="text-red-400 mb-3">Invalid email or password</div>
          )}

          {/*Username*/}
          <div className="flex items-center gap-3 mb-4 w-full px-5 py-2.5 bg-[#333A5C] rounded-full">
            <MdOutlinePersonalInjury className="text-[21px]"></MdOutlinePersonalInjury>
            <input
              className="bg-transparent outline-none"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Username"
              onKeyDown={(e) =>
                e.key === "Enter" &&
                SignUp({ username, email, password, confirmPassword })
              }
              required
            />
          </div>

          {/*Email*/}
          <div className="flex items-center gap-3 mb-4 w-full px-5 py-2.5 bg-[#333A5C] rounded-full">
            <BiLogoGmail className="text-[21px]"></BiLogoGmail>
            <input
              className="bg-transparent outline-none"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
              onKeyDown={(e) =>
                e.key === "Enter" &&
                SignUp({ username, email, password, confirmPassword })
              }
              required
            />
          </div>

          {/*Password*/}
          <div className="flex items-center gap-3 mb-4 w-full px-5 py-2.5 bg-[#333A5C] rounded-full">
            <FaLock className="text-[21px]"></FaLock>
            <input
              className="bg-transparent outline-none"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
              onKeyDown={(e) =>
                e.key === "Enter" &&
                SignUp({ username, email, password, confirmPassword })
              }
              required
            />
          </div>

          {/*Confirm Pass*/}
          <div className="flex items-center gap-3 mb-4 w-full px-5 py-2.5 bg-[#333A5C] rounded-full">
            <FaLock className="text-[21px]"></FaLock>
            <input
              className="bg-transparent outline-none"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              placeholder="Confirm password"
              required
            />
          </div>

          <button
            className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-indigo-900 font-medium py-2.5 rounded-full text-white"
            disabled={isPending}
            type="submit"
          >
            Sign up
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-gray-400">
          Already have an account?
          <span
            onClick={() => navigate("/auth/login")}
            className="text-blue-400 cursor-pointer underline pl-1"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};
