import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../Custom Hooks/useAuth";
import logo from "../../assets/Logo/RedLogo.png";
import { MdSpaceDashboard } from "react-icons/md";
import { HiMiniUsers } from "react-icons/hi2";
import { BiSolidDonateBlood } from "react-icons/bi";
import { TfiWrite } from "react-icons/tfi";
import { GiLifeBar } from "react-icons/gi";
import useUserDetails from "../../Custom Hooks/useUserDetails";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import Swal from "sweetalert2";
import { IoHomeSharp } from "react-icons/io5";
import { BiDonateBlood } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { RiRefund2Line } from "react-icons/ri";
import { FaPen } from "react-icons/fa";

const Sidebar = () => {
  const { logOut } = useAuth();

  const { loadedUser, isLoading } = useUserDetails();
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire("Success!", "You have logged out successfully!", "success");
        navigate("/");
      })
      .catch((error) => console.log(error.code));
  };

  return (
    <div>
      <div
        id="view"
        className="h-full flex flex-row drawer lg:drawer-open z-50"
        // eslint-disable-next-line react/no-unknown-property
        x-data="{ sidenav: true }"
      >
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-start">
          {/* Page content here */}
          <label htmlFor="my-drawer-2" className="btn drawer-button lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-[#D60C0C]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
        </div>
        <div
          id="sidebar"
          className="drawer-side"
          // eslint-disable-next-line react/no-unknown-property
          x-show="sidenav"
        >
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu p-4 w-52 md:w-80 min-h-full bg-base-200 text-base-content">
            <div className="space-y-6 md:space-y-10">
              <Link to="/">
                <img src={logo} className="w-52 mx-auto" />
              </Link>

              <div id="profile" className="space-y-3">
                <img
                  src={loadedUser?.user_img}
                  alt="Avatar user"
                  className="w-10 h-10 md:w-20 md:h-20 rounded-full mx-auto object-cover object-top"
                />
                <div>
                  <h2 className="font-medium md:text-xl text-center text-[#D60C0C]">
                    {loadedUser?.name}
                  </h2>
                  <p className="text-sm text-gray-500 text-center mt-1 uppercase">
                    {loadedUser?.role}
                  </p>
                </div>
              </div>
              <div
                id="menu"
                className="flex flex-col justify-between space-y-2"
              >
                {isLoading ? (
                  <div className="flex justify-center">
                    <span className="loading loading-spinner text-error"></span>
                  </div>
                ) : loadedUser?.role === "admin" ? (
                  <>
                    <li>
                      <NavLink
                        to="/dashboard/adminHome"
                        className={({ isActive }) =>
                          `text-sm font-medium flex gap-2 py-3 px-3 rounded-md transition duration-150 ease-in-out hover:bg-[#AB0A0A] hover:text-white hover:scale-105 ${
                            isActive
                              ? "bg-[#D60C0C]  text-white text-base"
                              : "text-gray-700"
                          }`
                        }
                      >
                        <MdSpaceDashboard className="text-xl mr-1" />
                        <span className="">Admin Home</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/all-users"
                        className={({ isActive }) =>
                          `text-sm font-medium flex gap-2 py-3 px-3 rounded-md transition duration-150 ease-in-out hover:bg-[#AB0A0A] hover:text-white hover:scale-105 ${
                            isActive
                              ? "bg-[#D60C0C]  text-white text-base"
                              : "text-gray-700"
                          }`
                        }
                      >
                        <HiMiniUsers className="text-xl mr-1" />
                        All Users
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/all-blood-donation-request"
                        className={({ isActive }) =>
                          `text-sm font-medium flex gap-2 py-3 px-3 rounded-md transition duration-150 ease-in-out hover:bg-[#AB0A0A] hover:text-white hover:scale-105 ${
                            isActive
                              ? "bg-[#D60C0C]  text-white text-base"
                              : "text-gray-700"
                          }`
                        }
                      >
                        <BiSolidDonateBlood className="text-xl mr-1" />
                        All Donation Request
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/content-management"
                        className={({ isActive }) =>
                          `text-sm font-medium flex gap-2 py-3 px-3 rounded-md transition duration-150 ease-in-out hover:bg-[#AB0A0A] hover:text-white hover:scale-105 ${
                            isActive
                              ? "bg-[#D60C0C]  text-white text-base"
                              : "text-gray-700"
                          }`
                        }
                      >
                        <TfiWrite className="text-xl mr-1" />
                        Content Management
                      </NavLink>
                    </li>
                    <div className="divider"></div>
                    <li>
                      <NavLink
                        to="/"
                        className={({ isActive }) =>
                          `text-sm font-medium flex gap-2 py-3 px-3 rounded-md transition duration-150 ease-in-out hover:bg-[#AB0A0A] hover:text-white hover:scale-105 ${
                            isActive
                              ? "bg-[#D60C0C]  text-white text-base"
                              : "text-gray-700"
                          }`
                        }
                      >
                        <IoHomeSharp className="text-xl mr-1" />
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/donationRequests"
                        className={({ isActive }) =>
                          `text-sm font-medium flex gap-2 py-3 px-3 rounded-md transition duration-150 ease-in-out hover:bg-[#AB0A0A] hover:text-white hover:scale-105 ${
                            isActive
                              ? "bg-[#D60C0C]  text-white text-base"
                              : "text-gray-700"
                          }`
                        }
                      >
                        <BiDonateBlood className="text-xl mr-1" />
                        Donation Requests
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/searchDonors"
                        className={({ isActive }) =>
                          `text-sm font-medium flex gap-2 py-3 px-3 rounded-md transition duration-150 ease-in-out hover:bg-[#AB0A0A] hover:text-white hover:scale-105 ${
                            isActive
                              ? "bg-[#D60C0C]  text-white text-base"
                              : "text-gray-700"
                          }`
                        }
                      >
                        <FaSearch className="text-xl mr-1" />
                        Search Donors
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/funding"
                        className={({ isActive }) =>
                          `text-sm font-medium flex gap-2 py-3 px-3 rounded-md transition duration-150 ease-in-out hover:bg-[#AB0A0A] hover:text-white hover:scale-105 ${
                            isActive
                              ? "bg-[#D60C0C]  text-white text-base"
                              : "text-gray-700"
                          }`
                        }
                      >
                        <RiRefund2Line className="text-xl mr-1" />
                        Funding
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/publicBlogs"
                        className={({ isActive }) =>
                          `text-sm font-medium flex gap-2 py-3 px-3 rounded-md transition duration-150 ease-in-out hover:bg-[#AB0A0A] hover:text-white hover:scale-105 ${
                            isActive
                              ? "bg-[#D60C0C]  text-white text-base"
                              : "text-gray-700"
                          }`
                        }
                      >
                        <FaPen className="text-xl mr-1" />
                        Blogs
                      </NavLink>
                    </li>
                    <div className="divider"></div>
                    <li>
                      <NavLink
                        to="/dashboard/profile"
                        className={({ isActive }) =>
                          `text-sm font-medium flex gap-2 py-3 px-3 rounded-md transition duration-150 ease-in-out hover:bg-[#AB0A0A] hover:text-white hover:scale-105 ${
                            isActive
                              ? "bg-[#D60C0C]  text-white text-base"
                              : "text-gray-700"
                          }`
                        }
                      >
                        <CgProfile className="text-xl mr-1" />
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={handleLogOut}
                        className="text-sm font-medium flex gap-2 py-3 px-3 rounded-md transition duration-150 ease-in-out hover:bg-[#AB0A0A] hover:text-white hover:scale-105"
                      >
                        <MdLogout className="text-xl mr-1" />
                        LogOut
                      </button>
                    </li>
                  </>
                ) : loadedUser?.role === "volunteer" ? (
                  <>
                    <li>
                      <NavLink
                        to="/dashboard/volunteerHome"
                        className={({ isActive }) =>
                          `text-sm font-medium flex gap-2 py-3 px-3 rounded-md transition duration-150 ease-in-out hover:bg-[#AB0A0A] hover:text-white hover:scale-105 ${
                            isActive
                              ? "bg-[#D60C0C]  text-white text-base"
                              : "text-gray-700"
                          }`
                        }
                      >
                        <MdSpaceDashboard className="text-xl mr-1" />
                        <span className="">Volunteer Home</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/all-blood-donation-request"
                        className={({ isActive }) =>
                          `text-sm font-medium flex gap-2 py-3 px-3 rounded-md transition duration-150 ease-in-out hover:bg-[#AB0A0A] hover:text-white hover:scale-105 ${
                            isActive
                              ? "bg-[#D60C0C]  text-white text-base"
                              : "text-gray-700"
                          }`
                        }
                      >
                        <BiSolidDonateBlood className="text-xl mr-1" />
                        All Donation Request
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/content-management"
                        className={({ isActive }) =>
                          `text-sm font-medium flex gap-2 py-3 px-3 rounded-md transition duration-150 ease-in-out hover:bg-[#AB0A0A] hover:text-white hover:scale-105 ${
                            isActive
                              ? "bg-[#D60C0C]  text-white text-base"
                              : "text-gray-700"
                          }`
                        }
                      >
                        <TfiWrite className="text-xl mr-1" />
                        Content Management
                      </NavLink>
                    </li>
                    <div className="divider"></div>
                    <li>
                      <NavLink
                        to="/"
                        className={({ isActive }) =>
                          `text-sm font-medium flex gap-2 py-3 px-3 rounded-md transition duration-150 ease-in-out hover:bg-[#AB0A0A] hover:text-white hover:scale-105 ${
                            isActive
                              ? "bg-[#D60C0C]  text-white text-base"
                              : "text-gray-700"
                          }`
                        }
                      >
                        <IoHomeSharp className="text-xl mr-1" />
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/donationRequests"
                        className={({ isActive }) =>
                          `text-sm font-medium flex gap-2 py-3 px-3 rounded-md transition duration-150 ease-in-out hover:bg-[#AB0A0A] hover:text-white hover:scale-105 ${
                            isActive
                              ? "bg-[#D60C0C]  text-white text-base"
                              : "text-gray-700"
                          }`
                        }
                      >
                        <BiDonateBlood className="text-xl mr-1" />
                        Donation Requests
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/searchDonors"
                        className={({ isActive }) =>
                          `text-sm font-medium flex gap-2 py-3 px-3 rounded-md transition duration-150 ease-in-out hover:bg-[#AB0A0A] hover:text-white hover:scale-105 ${
                            isActive
                              ? "bg-[#D60C0C]  text-white text-base"
                              : "text-gray-700"
                          }`
                        }
                      >
                        <FaSearch className="text-xl mr-1" />
                        Search Donors
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/funding"
                        className={({ isActive }) =>
                          `text-sm font-medium flex gap-2 py-3 px-3 rounded-md transition duration-150 ease-in-out hover:bg-[#AB0A0A] hover:text-white hover:scale-105 ${
                            isActive
                              ? "bg-[#D60C0C]  text-white text-base"
                              : "text-gray-700"
                          }`
                        }
                      >
                        <RiRefund2Line className="text-xl mr-1" />
                        Funding
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/publicBlogs"
                        className={({ isActive }) =>
                          `text-sm font-medium flex gap-2 py-3 px-3 rounded-md transition duration-150 ease-in-out hover:bg-[#AB0A0A] hover:text-white hover:scale-105 ${
                            isActive
                              ? "bg-[#D60C0C]  text-white text-base"
                              : "text-gray-700"
                          }`
                        }
                      >
                        <FaPen className="text-xl mr-1" />
                        Blogs
                      </NavLink>
                    </li>
                    <div className="divider"></div>
                    <li>
                      <NavLink
                        to="/dashboard/profile"
                        className={({ isActive }) =>
                          `text-sm font-medium flex gap-2 py-3 px-3 rounded-md transition duration-150 ease-in-out hover:bg-[#AB0A0A] hover:text-white hover:scale-105 ${
                            isActive
                              ? "bg-[#D60C0C]  text-white text-base"
                              : "text-gray-700"
                          }`
                        }
                      >
                        <CgProfile className="text-xl mr-1" />
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={handleLogOut}
                        className="text-sm font-medium flex gap-2 py-3 px-3 rounded-md transition duration-150 ease-in-out hover:bg-[#AB0A0A] hover:text-white hover:scale-105"
                      >
                        <MdLogout className="text-xl mr-1" />
                        LogOut
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavLink
                        to="/dashboard/donorHome"
                        className={({ isActive }) =>
                          `text-sm font-medium flex gap-2 py-3 px-3 rounded-md transition duration-150 ease-in-out hover:bg-[#AB0A0A] hover:text-white hover:scale-105 ${
                            isActive
                              ? "bg-[#D60C0C]  text-white text-base"
                              : "text-gray-700"
                          }`
                        }
                      >
                        <MdSpaceDashboard className="text-xl mr-1" />
                        <span className="">Donor Home</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/my-donation-requests"
                        className={({ isActive }) =>
                          `text-sm font-medium flex gap-2 py-3 px-3 rounded-md transition duration-150 ease-in-out hover:bg-[#AB0A0A] hover:text-white hover:scale-105 ${
                            isActive
                              ? "bg-[#D60C0C]  text-white text-base"
                              : "text-gray-700"
                          }`
                        }
                      >
                        <GiLifeBar className="text-xl mr-1" />
                        My Donation Requests
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/create-donation-request"
                        className={({ isActive }) =>
                          `text-sm font-medium flex gap-2 py-3 px-3 rounded-md transition duration-150 ease-in-out hover:bg-[#AB0A0A] hover:text-white hover:scale-105 ${
                            isActive
                              ? "bg-[#D60C0C]  text-white text-base"
                              : "text-gray-700"
                          }`
                        }
                      >
                        <BiSolidDonateBlood className="text-xl mr-1" />
                        Create Donation Request
                      </NavLink>
                    </li>
                    <div className="divider"></div>
                    <li>
                      <NavLink
                        to="/"
                        className={({ isActive }) =>
                          `text-sm font-medium flex gap-2 py-3 px-3 rounded-md transition duration-150 ease-in-out hover:bg-[#AB0A0A] hover:text-white hover:scale-105 ${
                            isActive
                              ? "bg-[#D60C0C]  text-white text-base"
                              : "text-gray-700"
                          }`
                        }
                      >
                        <IoHomeSharp className="text-xl mr-1" />
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/donationRequests"
                        className={({ isActive }) =>
                          `text-sm font-medium flex gap-2 py-3 px-3 rounded-md transition duration-150 ease-in-out hover:bg-[#AB0A0A] hover:text-white hover:scale-105 ${
                            isActive
                              ? "bg-[#D60C0C]  text-white text-base"
                              : "text-gray-700"
                          }`
                        }
                      >
                        <BiDonateBlood className="text-xl mr-1" />
                        Donation Requests
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/searchDonors"
                        className={({ isActive }) =>
                          `text-sm font-medium flex gap-2 py-3 px-3 rounded-md transition duration-150 ease-in-out hover:bg-[#AB0A0A] hover:text-white hover:scale-105 ${
                            isActive
                              ? "bg-[#D60C0C]  text-white text-base"
                              : "text-gray-700"
                          }`
                        }
                      >
                        <FaSearch className="text-xl mr-1" />
                        Search Donors
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/funding"
                        className={({ isActive }) =>
                          `text-sm font-medium flex gap-2 py-3 px-3 rounded-md transition duration-150 ease-in-out hover:bg-[#AB0A0A] hover:text-white hover:scale-105 ${
                            isActive
                              ? "bg-[#D60C0C]  text-white text-base"
                              : "text-gray-700"
                          }`
                        }
                      >
                        <RiRefund2Line className="text-xl mr-1" />
                        Funding
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/publicBlogs"
                        className={({ isActive }) =>
                          `text-sm font-medium flex gap-2 py-3 px-3 rounded-md transition duration-150 ease-in-out hover:bg-[#AB0A0A] hover:text-white hover:scale-105 ${
                            isActive
                              ? "bg-[#D60C0C]  text-white text-base"
                              : "text-gray-700"
                          }`
                        }
                      >
                        <FaPen className="text-xl mr-1" />
                        Blogs
                      </NavLink>
                    </li>
                    <div className="divider"></div>
                    <li>
                      <NavLink
                        to="/dashboard/profile"
                        className={({ isActive }) =>
                          `text-sm font-medium flex gap-2 py-3 px-3 rounded-md transition duration-150 ease-in-out hover:bg-[#AB0A0A] hover:text-white hover:scale-105 ${
                            isActive
                              ? "bg-[#D60C0C]  text-white text-base"
                              : "text-gray-700"
                          }`
                        }
                      >
                        <CgProfile className="text-xl mr-1" />
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={handleLogOut}
                        className="text-sm font-medium flex gap-2 py-3 px-3 rounded-md transition duration-150 ease-in-out hover:bg-[#AB0A0A] hover:text-white hover:scale-105"
                      >
                        <MdLogout className="text-xl mr-1" />
                        LogOut
                      </button>
                    </li>
                  </>
                )}

                {/* <NavLink
                  to={
                    userDetails?.role === "admin"
                      ? "/dashboard/adminHome"
                      : userDetails?.role === "volunteer"
                      ? "/dashboard/adminHome"
                      : "/dashboard/donorHome"
                  }
                  className={({ isActive }) =>
                    `text-sm font-medium flex gap-2 py-3 px-3 rounded-md transition duration-150 ease-in-out hover:bg-[#AB0A0A] hover:text-white hover:scale-105 ${
                      isActive
                        ? "bg-[#D60C0C]  text-white text-base"
                        : "text-gray-700"
                    }`
                  }
                >
                  <MdSpaceDashboard className="text-xl mr-1" />
                  <span className="">Dashboard</span>
                </NavLink> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
