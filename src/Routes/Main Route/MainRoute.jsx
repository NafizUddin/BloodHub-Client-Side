import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../Layouts/Main Layout/MainLayout";
import Login from "../../Pages/Login Page/Login";
import Register from "../../Pages/Register Page/Register";
import ErrorPage from "../../Pages/Error Page/ErrorPage";
import Home from "../../Pages/HomePage/Home";
import DashboardLayout from "../../Layouts/Dashboard Layout/DashboardLayout";
import DonorHome from "../../Pages/Donor Pages/Donor Home/DonorHome";
import PrivateRoute from "../Private Route/PrivateRoute";
import BloodRequest from "../../Pages/Donor Pages/Create Donation Request/BloodRequest";
import AdminHome from "../../Pages/Admin Pages/Admin Home/AdminHome";
import AllUsers from "../../Pages/Admin Pages/All Users/AllUsers";
import AllRequest from "../../Pages/Admin Pages/All Blood Donation Request/AllRequest";
import Blogs from "../../Pages/Admin Pages/Content Management/Blogs";
import VolunteerHome from "../../Pages/Volunteer Pages/Volunteer Home/VolunteerHome";
import MyDonationRequests from "../../Pages/Donor Pages/Donor Own Blood Request/MyDonationRequests";
import ProfileCard from "../../Components/Profile Card/ProfileCard";

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
      // Admin & Volunteer routes
      {
        path: "adminHome",
        element: <AdminHome />,
      },
      {
        path: "all-users",
        element: <AllUsers />,
      },
      {
        path: "all-blood-donation-request",
        element: <AllRequest />,
      },
      {
        path: "content-management",
        element: <Blogs />,
      },
      {
        path: "volunteerHome",
        element: <VolunteerHome />,
      },
      // Donor Routes
      {
        path: "donorHome",
        element: <DonorHome />,
      },
      {
        path: "my-donation-requests",
        element: <MyDonationRequests />,
      },
      {
        path: "create-donation-request",
        element: <BloodRequest />,
      },
      {
        path: "profile",
        element: <ProfileCard></ProfileCard>,
      },
    ],
  },
]);

export default MainRoute;
