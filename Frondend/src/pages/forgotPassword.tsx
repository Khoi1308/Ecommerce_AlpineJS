import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { MdOutlinePersonalInjury } from "react-icons/md";
import { sendResetPasswordEmail } from "../lib/api";
import { Link } from "react-router-dom";

export const ForgorPassword = () => {
  const [email, setEmail] = useState("");

  const {
    mutate: resetPassEmail,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: sendResetPasswordEmail,
  });
  return (
    <div className="flex justify-center items-center p-4 rounded rounded-red-200 min-h-screen">
      <div className="bg-slate-900 rounded rounded-lg p-10 shadow-lg text-indigo-300">
        <h2 className="text-white text-center mb-5">Forgot email</h2>
        {isError && (
          <div className="text-red-400 text-center">
            {error?.message || "An error occurred"}
          </div>
        )}
        {isSuccess ? (
          <div className="">
            <div className="text-green-400">Password reset email sent!</div>
            <div className="text-white">
              Go to <Link to="/auth/login" className="text-blue-400 hover:underline">Sign in</Link> or{" "}
              <Link to="/auth/register" className="text-blue-400 hover:underline">Sign up</Link>
            </div>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              resetPassEmail(email);
            }}
          >
            <div className="flex items-center gap-3 mb-4 w-full bg-[#333A5C] px-5 py-2.5 rounded-full">
              <MdOutlinePersonalInjury className="text-[21px]"></MdOutlinePersonalInjury>
              <input
                className="bg-transparent outline-none"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <button
              className="mt-4 text-white w-full bg-gradient-to-l from-indigo-500 to-indigo-900 font-medium py-2.5 rounded-full"
              type="submit"
              disabled={isPending}
            >
              Send Email
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
