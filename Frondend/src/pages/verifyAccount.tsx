import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { verifyEmail } from "../lib/api";
import { FaSpinner } from "react-icons/fa";

export const VerifyAccount = () => {
  const { code } = useParams();
  const { isPending, isSuccess, isError } = useQuery({
    queryKey: ["emailVerificationCode", code],
    queryFn: () => verifyEmail(code!),
    enabled: !!code,
  });
  return (
    <div className="flex justify-center mt-12">
      <div>
        {isPending ? (
          <FaSpinner>Loading</FaSpinner>
        ) : (
          <>
            {isSuccess ? "Success" : "Error"}
            {isError && (
              <div className="text-gray-400">
                The link is either invalid or expired
                <Link
                  to="/auth/register"
                  className="text-blue-500 hover:underline"
                >
                  Get a new link
                </Link>
              </div>
            )}
            <Link
              to="/"
              className="inline-block mt-4 text-blue-500 hover:underline"
            >
              Back to home
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
