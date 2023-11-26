import { useEffect } from "react";
import Banner from "../../Home Components/Banner/Banner";
import BloodTable from "../../Home Components/Blood Table/BloodTable";
import Contact from "../../Home Components/Contact Us/Contact";
import Footer from "../../Home Components/Footer/Footer";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
