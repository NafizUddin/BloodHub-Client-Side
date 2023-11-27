import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../Layouts/Main Layout/MainLayout";
import Login from "../../Pages/Login Page/Login";
import Register from "../../Pages/Register Page/Register";
import ErrorPage from "../../Pages/Error Page/ErrorPage";
import Home from "../../Pages/HomePage/Home";
import DashboardLayout from "../../Layouts/Dashboard Layout/DashboardLayout";
import DonorHome from "../../Pages/Donor Pages/Donor Home/DonorHome";
import PrivateRoute from "../Private Route/PrivateRoute";
import BloodRequest from "../../Pages/Donor Pages/Donor Blood Request/BloodRequest";

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
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <DonorHome />,
      },
      {
        path: "create-donation-request",
        element: <BloodRequest />,
      },
    ],
  },
]);

export default MainRoute;
