import { useState } from "react";
import { MdOutlinePersonalInjury } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../lib/api";
import { queryClient } from "../../config/queryClient";
import { AUTH } from "../../hooks/useAuth";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {
    mutate: SignIn,
    isPending,
    isError,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      // Navigate to Home page
      navigate("/", {
        replace: true,
      });
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen p-2">
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg text-indigo-300">
        <h2 className="text-center text-white mb-4 text-lg">Login</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            SignIn({ email, password });
          }}
        >
          {isError && (
            <div className="text-red-400 mb-3">Invalid email or password</div>
          )}
          {/*Email*/}
          <div className="flex items-center gap-3 mb-4 w-full px-5 py-2.5 bg-[#333A5C] rounded-full">
            <MdOutlinePersonalInjury className="text-[21px]"></MdOutlinePersonalInjury>
            <input
              className="bg-transparent outline-none"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="email"
              onKeyDown={(e) =>
                e.key === "Enter" && SignIn({ email, password })
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
              required
            />
          </div>
          <div className="hover:underline">
            <Link to="/auth/password/forgot">forgot password?</Link>
          </div>
          <button
            className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-indigo-900 font-medium py-2.5 rounded-full text-white"
            disabled={isPending}
            type="submit"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-gray-400">
          Don't have an account?
          <span
            onClick={() => navigate("/auth/register")}
            className="text-blue-400 cursor-pointer underline pl-1"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};
