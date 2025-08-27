import { useNavigate } from "react-router-dom";

interface UseNavigatorReturn {
  gotoUserProfile: () => void;
  gotoHomePage: () => void;
  gotoLoginPage: () => void;
}

export const useNavigatePage = (): UseNavigatorReturn => {
  const navigate = useNavigate();

  const gotoUserProfile = () => {
    navigate("/userProfile", { replace: true });
  };

  const gotoLoginPage = () => {
    navigate("/auth/login", { replace: true });
  };

  const gotoHomePage = () => {
    navigate("/", { replace: true });
  };

  return {
    gotoLoginPage,
    gotoUserProfile,
    gotoHomePage,
  };
};
