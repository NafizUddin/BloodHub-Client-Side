import { Outlet } from "react-router-dom";
import Navbar from "../../Components/NavBar/Navbar";
import Footer from "../../Home Components/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="md:container md:mx-auto">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
