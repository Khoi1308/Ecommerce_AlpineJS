import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { resetPassword } from "../../lib/api";
import { Link } from "react-router-dom";

interface IResetPasswordCode {
  code: string;
}
export const ResetPasswordForm = ({ code }: IResetPasswordCode) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");

  const {
    mutate: resetUserPassword,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: resetPassword,
  });
  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-2">
        <div className="bg-slate-900 p-10 rounded-lg shadow-lg text-indigo-300">
          {isSuccess ? (
            <div>
              <div className="text-green-300">
                Password updated successfully!
              </div>
              <div>
                Back to{" "}
                <Link
                  to="/auth/login"
                  className="hover:text-indigo-900 underline"
                >
                  Log in
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-white text-center mb-4">Reset password</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  resetUserPassword({
                    verificationCode: code,
                    password,
                    confirmPassword,
                  });
                }}
              >
                <div className="flex items-center gap-3 mb-4 w-full px-5 py-2.5 bg-[#333A5C] rounded-lg">
                  <FaLock></FaLock>
                  <input
                    className="bg-transparent outline-none"
                    type="text"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center gap-3 mb-4 w-full px-5 py-2.5 bg-[#333A5C] rounded-lg">
                  <FaLock></FaLock>
                  <input
                    className="bg-transparent outline-none"
                    type="text"
                    placeholder="Confirmed Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirm(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      resetUserPassword({
                        verificationCode: code,
                        password,
                        confirmPassword,
                      })
                    }
                    required
                  />
                </div>
                <button
                  className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-indigo-900 font-medium py-2.5 rounded-full text-white"
                  disabled={isPending}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
