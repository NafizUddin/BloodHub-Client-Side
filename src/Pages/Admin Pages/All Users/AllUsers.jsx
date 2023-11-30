import { useQuery } from "@tanstack/react-query";
import useAxiosSecureInterceptors from "../../../Custom Hooks/useAxiosSecureInterceptors";
import Loading from "../../../Components/Loading/Loading";
import { CiCircleMore } from "react-icons/ci";
import { useState } from "react";
import useAuth from "../../../Custom Hooks/useAuth";
import donate from "../../../assets/Icons/blood-donation.png";
import { FaFilter } from "react-icons/fa";

const AllUsers = () => {
  const axiosSecure = useAxiosSecureInterceptors();
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState("active");

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const { data: allUsers } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data.filter((user) => user.role !== "admin");
    },
  });

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
    refetch();
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const {
    data: totalUsers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["totalUsers", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/user/pagination?page=${currentPage}&size=${itemsPerPage}`
      );
      return res.data.filter(
        (user) => user.role !== "admin" && user?.status === selectedStatus
      );
    },
  });

  const { data } = useQuery({
    queryKey: ["userCount"],
    queryFn: async () => {
      const res = await axiosSecure.get("/userCount");
      setCount(res.data?.count);
      return res.data?.count;
    },
  });

  const handleSelectChange = (event) => {
    // Update the state with the selected value
    setSelectedStatus(event.target.value);
  };

  if (isLoading) {
    return <Loading />;
  }

  console.log(selectedStatus);

  return (
    <div>
      <h1 className="text-center text-[#D60C0C] text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-bold">
        All Users
      </h1>
      <div className="w-full flex justify-end items-center">
        {/* <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn m-1 flex items-center gap-1"
          >
            <FaFilter />
            Filter By
          </div>
          <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 text-[#D60C0C]">
            <li>
              <a onClick={() => setSelectedStatus("active")}>Active</a>
            </li>
            <li>
              <a>Blocked</a>
            </li>
          </ul>
        </div> */}
        <select value={selectedStatus} onChange={handleSelectChange}>
          <option value="active">Filter By</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>
      <div className="my-10">
        {totalUsers?.length > 0 ? (
          <div>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>User Avatar</th>
                    <th>User Email</th>
                    <th>User Name</th>
                    <th>User Status</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {totalUsers?.map((singleUser, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>
                        <img
                          src={singleUser?.user_img}
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      </td>
                      <td>{singleUser?.email}</td>
                      <td>{singleUser?.name}</td>
                      <td className="uppercase">{singleUser?.status}</td>
                      <td>
                        {singleUser?.status === "blocked" ? (
                          <button className="w-full rounded-full bg-[#D60C0C] h-11 flex items-center justify-center px-6 py-3 transition hover:bg-white hover:text-[#D60C0C] hover:outline font-semibold text-white">
                            Unblock User
                          </button>
                        ) : (
                          <button className="w-full rounded-full bg-[#D60C0C] h-11 flex items-center justify-center px-6 py-3 transition hover:bg-white hover:text-[#D60C0C] hover:outline font-semibold text-white">
                            Block User
                          </button>
                        )}
                      </td>
                      <td>
                        <div className="dropdown dropdown-left">
                          <div tabIndex={0} role="button" className="m-1">
                            <CiCircleMore className="text-3xl" />
                          </div>
                          <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
                            <li>
                              <a className="text-[#D60C0C]">Make Admin</a>
                            </li>
                            {singleUser?.role !== "volunteer" && (
                              <li>
                                <a className="text-[#D60C0C]">Make Volunteer</a>
                              </li>
                            )}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="h-[350px] flex flex-col justify-center items-center gap-5">
            <img src={donate} className="w-28 md:w-40" />
            <p className="md:max-w-3xl lg:mx-auto text-center mx-6 md:mx-10 text-2xl md:text-3xl text-[#D60C0C]">
              No Users have been registered yet.
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center">
        <div className="join pb-10">
          <button onClick={handlePrevPage} className="join-item btn">
            Previous
          </button>
          {pages?.map((page) => (
            <button
              key={page}
              onClick={() => handleCurrentPage(page)}
              className={
                currentPage === page
                  ? "join-item btn selected bg-red-600 text-white"
                  : "join-item btn"
              }
            >
              {page + 1}
            </button>
          ))}
          <button onClick={handleNextPage} className="join-item btn">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
