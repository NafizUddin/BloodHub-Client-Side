import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../Layouts/Main Layout/MainLayout";
import Login from "../../Pages/Login Page/Login";
import Register from "../../Pages/Register Page/Register";
import DashboardV2 from "../../Components/DashBoard V2/DashboardV2";
import DashBoard from "../../Components/DashBoard V1/DashBoard";
import ErrorPage from "../../Pages/Error Page/ErrorPage";

const MainRoute = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
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
    element: <DashBoard />,
  },
]);

export default MainRoute;
