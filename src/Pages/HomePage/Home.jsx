import { useEffect } from "react";
import Banner from "../../Home Components/Banner/Banner";
import BloodTable from "../../Home Components/Blood Table/BloodTable";
import Contact from "../../Home Components/Contact Us/Contact";
import Footer from "../../Home Components/Footer/Footer";
import useAuth from "../../Custom Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecureInterceptors from "../../Custom Hooks/useAxiosSecureInterceptors";
import Loading from "../../Components/Loading/Loading";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user } = useAuth();
  const axiosSecure = useAxiosSecureInterceptors();

  const {
    data: donor,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["donor"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      const userDetails = {
        name: res.data.name,
        email: res.data.email,
        role: res.data.role,
      };
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Banner />
      <BloodTable />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
