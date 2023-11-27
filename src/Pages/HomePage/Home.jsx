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
