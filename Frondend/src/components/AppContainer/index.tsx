import { FaSpinner } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export const AppContainer = () => {
  const { user, isLoading } = useAuth();
  return (
    <>
      {isLoading ? (
        <div>
          <FaSpinner className="mb-4"></FaSpinner>
        </div>
      ) : user ? (
        <Outlet />
      ) : (
        <Navigate
          to="/auth/login"
          replace
          state={{ redirectUrl: window.location.pathname }}
        />
      )}
    </>
  );
};
