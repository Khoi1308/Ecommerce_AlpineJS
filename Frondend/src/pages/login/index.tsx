import { useState } from "react";
import { MdOutlinePersonalInjury } from "react-icons/md";
import { BiLogoGmail } from "react-icons/bi";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../lib/api";

export const Login = () => {
  const [state, setState] = useState("Login");
  const [username, setUsername] = useState("");
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
      navigate("/", {
        replace: true,
      });
    },
  });
  return (
    <div className="flex items-center justify-center min-h-screen p-2">
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg text-indigo-300">
        <h2 className="text-center text-white mb-4 text-lg">
          {state === "Sign up" ? "Create Account" : "Login"}
        </h2>
        <form>
          {isError && (
            <div className="text-red-400 mb-3">Invalid email or password</div>
          )}
          {state === "Sign up" && (
            // Username
            <div className="flex items-center gap-3 mb-4 w-full px-5 py-2.5 bg-[#333A5C] rounded-full">
              <MdOutlinePersonalInjury className="text-[21px]"></MdOutlinePersonalInjury>
              <input
                className="bg-transparent outline-none"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder="Username"
                required
              />
            </div>
          )}

          {/*Email*/}
          <div className="flex items-center gap-3 mb-4 w-full px-5 py-2.5 bg-[#333A5C] rounded-full">
            <BiLogoGmail className="text-[21px]"></BiLogoGmail>
            <input
              className="bg-transparent outline-none"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
              required
            />
          </div>

          {/*Password*/}
          <div className="flex items-center gap-3 mb-4 w-full px-5 py-2.5 bg-[#333A5C] rounded-full">
            <FaLock className="text-[21px]"></FaLock>
            <input
              className="bg-transparent outline-none"
              type="password"
              placeholder="Password"
              required
            />
          </div>

          {state === "Login" && (
            <Link to="/forgot/password" className="mb-4">
              Forgot password?
            </Link>
          )}

          <button
            className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-indigo-900 font-medium py-2.5 rounded-full text-white"
            disabled={isPending}
            onClick={() => SignIn({ email, password })}
          >
            {state}
          </button>
        </form>

        {state === "Sign up" ? (
          <p className="mt-4 text-center text-xs text-gray-400">
            Already have an account?
            <span
              onClick={() => setState("Login")}
              className="text-blue-400 cursor-pointer underline pl-1"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="mt-4 text-center text-xs text-gray-400">
            Don't have an account?
            <span
              onClick={() => setState("Sign up")}
              className="text-blue-400 cursor-pointer underline pl-1"
            >
              Sign up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};
