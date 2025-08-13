import { FileUpload } from "../../components/FileUpload";
import { Header } from "../../components/header";
import { useAuth } from "../../hooks/useAuth";

export const UserProfile = () => {
  const { user, isLoading } = useAuth();
  console.log("User", user.username);
  return (
    <div>
      <Header />
      <FileUpload />
    </div>
  );
};
