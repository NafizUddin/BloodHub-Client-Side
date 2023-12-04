import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://twelfth-assignment-server-side.vercel.app/api",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
