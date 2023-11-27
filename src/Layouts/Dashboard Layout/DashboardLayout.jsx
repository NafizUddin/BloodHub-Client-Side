import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Dashboard Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen lg:flex">
      <Sidebar />
      <div className="flex-1">
        <div className="px-10 mt-6">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
