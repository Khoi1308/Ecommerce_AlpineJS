import { useQuery } from "@tanstack/react-query";
import { getUser } from "../lib/api";

type User = {
  userId: string;
  username: string;
  email: string;
  verified: boolean;
  roleId: string;
  createdAt: Date;
  updatedAt: Date;
};

export const AUTH = "auth";
export const useAuth = (opts = {}) => {
  const { data: user, ...rest } = useQuery({
    queryKey: [AUTH],
    queryFn: getUser,
    staleTime: Infinity, // Call user anywhere in app
    select: (data: any) => {
      return data.user || data;
    },
    ...opts,
  });

  return {
    user,
    ...rest,
  };
};