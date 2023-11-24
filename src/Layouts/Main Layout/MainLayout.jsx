import { Outlet } from "react-router-dom";
import Navbar from "../../Components/NavBar/Navbar";

const MainLayout = () => {
  return (
    <div className="md:container md:mx-auto">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
