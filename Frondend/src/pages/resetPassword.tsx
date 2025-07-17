import { useSearchParams } from "react-router-dom";
import { ResetPasswordForm } from "../components/ResetPasswordForm";

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const linkIsValid = code;
  return (
    <div className="flex items-center justify-center min-h-200">
      {linkIsValid ? (
        <ResetPasswordForm code={code} />
      ) : (
        <div className="bg-slate-900 rounded rounded-lg p-10 shadow-lg text-indigo-300">
          <div className="text-red-400">
            The link is either invalid or expired
          </div>
        </div>
      )}
    </div>
  );
};
