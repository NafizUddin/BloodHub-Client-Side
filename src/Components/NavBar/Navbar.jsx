import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Custom Hooks/useAuth";
import logo from "../../assets/Logo/RedLogo.png";
import Swal from "sweetalert2";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import Loading from "../Loading/Loading";
import useUserDetails from "../../Custom Hooks/useUserDetails";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { loadedUser, isLoading } = useUserDetails();
  // const [userDetails, setUserDetails] = useState(null);
  // const [color, setColor] = useState(false);

  // const changeColor = () => {
  //   if (window.scrollY >= 70) {
  //     setColor(true);
  //   } else {
  //     setColor(false);
  //   }
  // };

  // window.addEventListener("scroll", changeColor);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire("Success!", "You have logged out successfully!", "success");
      })
      .catch((error) => console.log(error.code));
  };

  // useEffect(() => {
  //   const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
  //   setUserDetails(storedUserDetails);
  // }, []);
  // console.log(loadedUser);

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isActive
              ? "bg-[#D60C0C] px-3 py-2 text-white rounded-md"
              : isPending
              ? "pending"
              : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/donationRequests"
          className={({ isActive, isPending }) =>
            isActive
              ? "bg-[#D60C0C] px-3 py-2 text-white rounded-md"
              : isPending
              ? "pending"
              : ""
          }
        >
          Donation Requests
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/searchDonors"
          className={({ isActive, isPending }) =>
            isActive
              ? "bg-[#D60C0C] px-3 py-2 text-white rounded-md"
              : isPending
              ? "pending"
              : ""
          }
        >
          Search Donors
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/funding"
          className={({ isActive, isPending }) =>
            isActive
              ? "bg-[#D60C0C] px-3 py-2 text-white rounded-md"
              : isPending
              ? "pending"
              : ""
          }
        >
          Funding
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/publicBlogs"
          className={({ isActive, isPending }) =>
            isActive
              ? "bg-[#D60C0C] px-3 py-2 text-white rounded-md"
              : isPending
              ? "pending"
              : ""
          }
        >
          Blogs
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="lg:px-4 xl:px-0">
      <div
        className="navbar 
        max-w-7xl mx-auto bg-white"
      >
        {/* color ? "navbar fixed z-30 max-w-7xl mx-auto bg-red-300" : "navbar fixed
        z-30 max-w-7xl mx-auto bg-white"  */}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow rounded-box w-52 text-gray-800 bg-white"
            >
              {links}
            </ul>
          </div>
          <img
            src={logo}
            className="hidden md:block w-[230px] md:w-[270px] lg:w-[180px] xl:w-[270px]"
          ></img>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu-horizontal px-1 gap-6 text-[#D60C0C] font-semibold">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          <div>
            {user ? (
              <div className="flex items-center gap-3">
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img src={loadedUser?.user_img || user?.photoURL} />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="mt-3 z-10 p-2 shadow menu menu-sm dropdown-content rounded-box w-60 bg-white"
                  >
                    <li>
                      <a className="text-lg font-medium hover:bg-[#D60C0C]  hover:text-white">
                        <CgProfile className="text-lg mr-1" />{" "}
                        {loadedUser?.name}
                      </a>
                    </li>
                    <li>
                      {isLoading ? (
                        <Loading />
                      ) : loadedUser?.role === "admin" ? (
                        <Link
                          to="/dashboard/adminHome"
                          className="text-lg font-medium hover:bg-[#D60C0C] hover:text-white"
                        >
                          <MdSpaceDashboard className="text-lg mr-1" />{" "}
                          Dashboard
                        </Link>
                      ) : loadedUser?.role === "volunteer" ? (
                        <Link
                          to="/dashboard/volunteerHome"
                          className="text-lg font-medium hover:bg-[#D60C0C] hover:text-white"
                        >
                          <MdSpaceDashboard className="text-lg mr-1" />{" "}
                          Dashboard
                        </Link>
                      ) : (
                        <Link
                          to="/dashboard/donorHome"
                          className="text-lg font-medium hover:bg-[#D60C0C] hover:text-white"
                        >
                          <MdSpaceDashboard className="text-lg mr-1" />{" "}
                          Dashboard
                        </Link>
                      )}
                    </li>
                    <li>
                      <a
                        onClick={handleLogOut}
                        className="text-lg font-medium hover:bg-[#D60C0C] hover:text-white"
                      >
                        <MdOutlineLogout className="text-lg mr-1" /> Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <button className="bg-[#D60C0C] px-4 py-3 rounded-lg text-white hover:bg-white hover:text-[#D60C0C] hover:outline">
                    Sign In
                  </button>
                </Link>
                <Link to="/register">
                  <button className="bg-white outline text-[#D60C0C] hover:bg-[#AB0A0A] px-4 py-3 rounded-lg hover:text-white">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
