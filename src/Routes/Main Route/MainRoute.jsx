import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../Layouts/Main Layout/MainLayout";
import Login from "../../Pages/Login Page/Login";
import Register from "../../Pages/Register Page/Register";
import DashboardV2 from "../../Components/DashBoard V2/DashboardV2";
import DashBoard from "../../Components/DashBoard V1/DashBoard";
import ErrorPage from "../../Pages/Error Page/ErrorPage";
import Home from "../../Pages/HomePage/Home";
import Dashboard from "../../Test Components/Dashboard/Dashboard";
import DashboardDaisy from "../../Test Components/DashBoard Daisy/DashboardDaisy";

const MainRoute = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
]);

export default MainRoute;
