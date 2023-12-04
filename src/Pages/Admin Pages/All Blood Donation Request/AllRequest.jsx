import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading/Loading";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../../../Custom Hooks/useAuth";
import useAxiosSecureInterceptors from "../../../Custom Hooks/useAxiosSecureInterceptors";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CiCircleMore } from "react-icons/ci";
import donate from "../../../assets/Icons/blood-donation.png";
import useUserDetails from "../../../Custom Hooks/useUserDetails";

const AllRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecureInterceptors();
  const { loadedUser } = useUserDetails();
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [singleDonationData, setSingleDonationData] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("Pending");

  const numberOfPages = Math.ceil(count / itemsPerPage);
  // creating an array named pages
  const pages = [...Array(numberOfPages).keys()];

  const handleSelectChange = (event) => {
    // Update the state with the selected value
    setSelectedStatus(event.target.value);
    setCurrentPage(0);
  };

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

  const handleDeleteReq = (data) => {
    console.log(data);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2e8b57",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/donation/${data?._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            refetch();
          }
        });
      }
    });
  };

  const {
    data: allDonation,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allDonation", currentPage, user?.email, selectedStatus],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/allDonation/pagination?page=${currentPage}&size=${itemsPerPage}`
      );
      return res.data.filter((user) => user?.status === selectedStatus);
    },
  });

  const { data } = useQuery({
    queryKey: ["donate"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allDonationCount");
      setCount(res.data?.count);
      return res.data?.count;
    },
  });

  const handleStatusChange = (singleUser, selectedStatus) => {
    // console.log(singleUser, selectedRole);

    const { status, _id, ...restInfo } = singleUser;
    const newUserInfo = { ...restInfo, status: selectedStatus };
    console.log(newUserInfo);

    axiosSecure
      .patch(`/donation/singleDonation/${singleUser?._id}`, newUserInfo)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success(
            `You have changed the Donation Status to ${selectedStatus}`
          );
          refetch();
        }
      });
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h1 className="text-center text-[#D60C0C] text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-bold">
        All Donation Requests
      </h1>
      <div className="w-full flex justify-end items-center mt-7">
        <select value={selectedStatus} onChange={handleSelectChange}>
          <option value="">Filter By</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
          <option value="Canceled">Canceled</option>
        </select>
      </div>
      <div className="my-10">
        {allDonation?.length > 0 ? (
          <div>
            <div className="overflow-x-auto pb-16">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Recipient Name</th>
                    <th>Recipient Location</th>
                    <th>Donation Date</th>
                    <th>Donation Time</th>
                    <th>Status</th>
                    <th>Donor Information</th>
                    <th></th>
                    {(loadedUser?.role === "admin" ||
                      loadedUser?.role === "donor") && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {allDonation?.map((singleDonation, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{singleDonation?.recipientName}</td>
                      <td>
                        {singleDonation?.recipientUpazilla},{" "}
                        {singleDonation?.recipientDistrict}
                      </td>
                      <td>{singleDonation?.donationDate}</td>
                      <td>{singleDonation?.donationTime}</td>
                      <td>{singleDonation?.status}</td>
                      {singleDonation?.status === "In Progress" ? (
                        <td>
                          {singleDonation?.donorName},{" "}
                          {singleDonation?.donorEmail}
                        </td>
                      ) : (
                        <td></td>
                      )}
                      {singleDonation?.status === "In Progress" ? (
                        <td>
                          <div className="dropdown dropdown-left dropdown-end">
                            <div
                              tabIndex={0}
                              role="button"
                              className="m-1 bg-[#D60C0C] text-center rounded-full h-11 flex items-center justify-center px-6 py-3 transition hover:bg-white hover:text-[#D60C0C] hover:outline font-semibold text-white"
                            >
                              Update Status
                            </div>
                            <ul
                              tabIndex={0}
                              className="dropdown-content z-[1] menu p-2 shadow bg-red-400 rounded-box w-52 text-white"
                            >
                              <li>
                                <span
                                  onClick={() =>
                                    handleStatusChange(singleDonation, "Done")
                                  }
                                >
                                  Done
                                </span>
                              </li>

                              <li>
                                <span
                                  onClick={() =>
                                    handleStatusChange(
                                      singleDonation,
                                      "Canceled"
                                    )
                                  }
                                >
                                  Cancel
                                </span>
                              </li>
                            </ul>
                          </div>
                        </td>
                      ) : (
                        <td></td>
                      )}

                      {(loadedUser?.role === "admin" ||
                        loadedUser?.role === "donor") && (
                        <td>
                          {/* <button onClick={handleDeleteReq}>HEllo</button> */}
                          <div className="dropdown dropdown-left">
                            <label tabIndex={0} className="m-1">
                              <CiCircleMore className="text-3xl" />
                            </label>
                            <ul
                              tabIndex={0}
                              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32"
                            >
                              <Link
                                to={`/donationDetails/${singleDonation?._id}`}
                              >
                                <li>
                                  <span className="text-[#D60C0C]">View</span>
                                </li>
                              </Link>

                              <Link
                                to={`/dashboard/updateDonation/${singleDonation?._id}`}
                              >
                                <li>
                                  <span className="text-[#D60C0C]">Edit</span>
                                </li>
                              </Link>

                              <li>
                                <span
                                  onClick={() =>
                                    handleDeleteReq(singleDonation)
                                  }
                                  className="text-[#D60C0C]"
                                >
                                  Delete
                                </span>
                              </li>
                            </ul>
                          </div>
                        </td>
                      )}
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
              Sorry, No Data Found.
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center flex-wrap">
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

export default AllRequest;
