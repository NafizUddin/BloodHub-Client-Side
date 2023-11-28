import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading/Loading";
import useAuth from "../../../Custom Hooks/useAuth";
import useAxiosSecureInterceptors from "../../../Custom Hooks/useAxiosSecureInterceptors";
import donate from "../../../assets/Icons/blood-donation.png";
import { CiCircleMore } from "react-icons/ci";
import { useEffect, useState } from "react";

const MyDonationRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecureInterceptors();
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const numberOfPages = Math.ceil(count / itemsPerPage);
  // creating an array named pages
  const pages = [...Array(numberOfPages).keys()];

  const {
    data: allDonation,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allDonation"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation?email=${user?.email}&page=${currentPage}&size=${itemsPerPage}`
      );
      return res.data;
    },
  });

  const { data } = useQuery({
    queryKey: ["donate"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donationCount?email=${user?.email}`);
      setCount(res.data?.count);
      return res.data?.count;
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-center text-[#D60C0C] text-3xl md:text-4xl lg:text-3xl xl:text-4xl">
        All Donation Requests
      </h1>
      <div className="my-10">
        {allDonation?.length > 0 ? (
          <div>
            <div className="overflow-x-auto">
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
                    <th>Action</th>
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
                      <td>
                        <div className="dropdown dropdown-left">
                          <div tabIndex={0} role="button" className="m-1">
                            <CiCircleMore className="text-3xl" />
                          </div>
                          <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
                            <li>
                              <a className="text-[#D60C0C]">View</a>
                            </li>
                            <li>
                              <a className="text-[#D60C0C]">Edit</a>
                            </li>
                            <li>
                              <a className="text-[#D60C0C]">Delete</a>
                            </li>
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
              Any donation request have not been made yet.
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

export default MyDonationRequests;
