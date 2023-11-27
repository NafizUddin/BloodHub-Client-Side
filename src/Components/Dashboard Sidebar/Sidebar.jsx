import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Custom Hooks/useAuth";
import logo from "../../assets/Logo/RedLogo.png";
import { MdSpaceDashboard } from "react-icons/md";
import useAxiosSecureInterceptors from "../../Custom Hooks/useAxiosSecureInterceptors";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecureInterceptors();
  const [loggedInUser, setLoggedInUser] = useState(null);

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  console.log(userDetails);

  return (
    <div>
      <div
        id="view"
        className="h-full flex flex-row drawer lg:drawer-open"
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
                  src={user?.photoURL}
                  alt="Avatar user"
                  className="w-10 h-10 md:w-20 md:h-20 rounded-full mx-auto"
                />
                <div>
                  <h2 className="font-medium md:text-xl text-center text-[#D60C0C]">
                    {user?.displayName}
                  </h2>
                  <p className="text-sm text-gray-500 text-center mt-1 uppercase">
                    {userDetails?.role}
                  </p>
                </div>
              </div>
              <div
                id="menu"
                className="flex flex-col justify-between space-y-2"
              >
                <NavLink
                  to={
                    userDetails?.role === "admin"
                      ? "/dashboard/adminHome"
                      : userDetails?.role === "volunteer"
                      ? "/dashboard/adminHome"
                      : "/dashboard/donorHome"
                  }
                  className={({ isActive }) =>
                    `text-sm font-medium flex gap-2 py-3 px-3 rounded-md transition duration-150 ease-in-out hover:bg-red-800 hover:text-white hover:scale-105 ${
                      isActive
                        ? "bg-[#D60C0C]  text-white text-base"
                        : "text-gray-700"
                    }`
                  }
                >
                  <MdSpaceDashboard className="text-xl mr-1" />
                  <span className="">Dashboard</span>
                </NavLink>
                {user?.role === "admin" && <> </>}
                <a
                  href=""
                  className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                >
                  <svg
                    className="w-6 h-6 fill-current inline-block"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"></path>
                  </svg>
                  <span className="">Products</span>
                </a>
                <a
                  href=""
                  className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                >
                  <svg
                    className="w-6 h-6 fill-current inline-block"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="">Reports</span>
                </a>
                <a
                  href=""
                  className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                >
                  <svg
                    className="w-6 h-6 fill-current inline-block"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path>
                  </svg>
                  <span className="">Messages</span>
                </a>
                <a
                  href=""
                  className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                >
                  <svg
                    className="w-6 h-6 fill-current inline-block"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="">Calendar</span>
                </a>
                <a
                  href=""
                  className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                >
                  <svg
                    className="w-6 h-6 fill-current inline-block"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="">Table</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
