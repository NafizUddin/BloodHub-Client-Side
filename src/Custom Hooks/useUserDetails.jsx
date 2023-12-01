import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecureInterceptors from "./useAxiosSecureInterceptors";

const useUserDetails = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecureInterceptors();
  const {
    data: loadedUser,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["donor", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  return { loadedUser, isLoading, refetch };
};

export default useUserDetails;
