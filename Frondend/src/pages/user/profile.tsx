import { useAuth } from "../../hooks/useAuth";

export const UserProfile = () => {
  const { user, isLoading } = useAuth();
  console.log("User", user.username);
  return <div>{user.username}</div>;
};
