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
import PublicBloodRequests from "../../Pages/Public Blood requests/PublicBloodRequests";
import SingleDonationDetails from "../../Pages/Single Donation Details/SingleDonationDetails";
import SearchDonors from "../../Pages/Search Donors/SearchDonors";
import Funding from "../../Pages/Funding/Funding";
import UpdateProfile from "../../Components/Update Profile Form/UpdateProfile";
import UpdateDonation from "../../Pages/Update Donation Req/UpdateDonation";
import AddBlogs from "../../Pages/Admin Pages/Add Blogs Page/AddBlogs";
import PublicBlog from "../../Pages/Public Blogs/PublicBlog";

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
      {
        path: "/donationRequests",
        element: <PublicBloodRequests />,
      },
      {
        path: "/donationDetails/:id",
        element: (
          <PrivateRoute>
            {" "}
            <SingleDonationDetails></SingleDonationDetails>{" "}
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `http://localhost:3000/api/donation/${params.id}?status=Pending`
          ),
      },
      {
        path: "/searchDonors",
        element: <SearchDonors />,
      },
      {
        path: "/publicBlogs",
        element: <PublicBlog></PublicBlog>,
      },
      {
        path: "/funding",
        element: (
          <PrivateRoute>
            <Funding />
          </PrivateRoute>
        ),
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
      {
        path: "updateProfile",
        element: <UpdateProfile></UpdateProfile>,
      },
      {
        path: "addBlogs",
        element: <AddBlogs></AddBlogs>,
      },
      {
        path: "updateDonation/:id",
        element: <UpdateDonation></UpdateDonation>,
        loader: ({ params }) =>
          fetch(
            `http://localhost:3000/api/donation/${params.id}?status=Pending`
          ),
      },
    ],
  },
]);

export default MainRoute;
