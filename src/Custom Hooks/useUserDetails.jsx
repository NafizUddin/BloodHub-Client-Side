import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecureInterceptors from "./useAxiosSecureInterceptors";

const useUserDetails = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecureInterceptors();
  const { data: loadedUser, isLoading } = useQuery({
    queryKey: ["donor"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  return { loadedUser, isLoading };
};

export default useUserDetails;
