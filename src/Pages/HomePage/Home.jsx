import { useEffect } from "react";
import Banner from "../../Home Components/Banner/Banner";
import BloodTable from "../../Home Components/Blood Table/BloodTable";
import Contact from "../../Home Components/Contact Us/Contact";
import useAuth from "../../Custom Hooks/useAuth";
import useAxiosSecureInterceptors from "../../Custom Hooks/useAxiosSecureInterceptors";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user } = useAuth();
  const axiosSecure = useAxiosSecureInterceptors();

  return (
    <div>
      <Banner />
      <BloodTable />
      <Contact />
    </div>
  );
};

export default Home;
