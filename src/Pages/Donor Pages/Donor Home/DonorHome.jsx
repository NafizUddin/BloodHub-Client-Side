import { useQuery } from "@tanstack/react-query";
import useAxiosSecureInterceptors from "../../../Custom Hooks/useAxiosSecureInterceptors";
import useUserDetails from "../../../Custom Hooks/useUserDetails";
import useAuth from "../../../Custom Hooks/useAuth";
import Loading from "../../../Components/Loading/Loading";
import donate from "../../../assets/Icons/blood-donation.png";
import { CiCircleMore } from "react-icons/ci";
import { Link } from "react-router-dom";

const DonorHome = () => {
  const { loadedUser } = useUserDetails();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecureInterceptors();

  const {
    data: donation,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["donation"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation?email=${user?.email}`);
      const reversedDonation = res.data?.reverse();
      return reversedDonation;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  console.log(donation);

  return (
    <div className="space-y-3">
      <h1 className="text-[#D60C0C] text-xl md:text-2xl lg:text-3xl font-semibold text-center">{`Hi ${loadedUser?.name},`}</h1>
      <h1 className="text-[#D60C0C] text-2xl md:text-3xl font-bold text-center">
        Welcome to BloodHub
      </h1>
      <p className="xl:max-w-2xl mx-auto text-center">
        Our platform connects donors with those in need, fostering a network of
        generosity that transcends borders. Together, we strive to make a
        significant impact in the world of blood donation, ensuring that every
        drop contributes to the gift of life.
      </p>
      <div className="my-8">
        {donation?.length > 0 ? (
          <div className="pb-20">
            <h1 className="text-[#D60C0C] font-medium text-lg lg:text-2xl text-center lg:text-left mb-4">
              Recent Donation Requests:
            </h1>
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
                  {donation?.slice(0, 3)?.map((singleDonation, index) => (
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
              {donation?.length > 3 && (
                <div className="flex justify-center items-center pt-10">
                  <Link to="/dashboard/my-donation-requests">
                    <button className="py-3 px-4 bg-[#D60C0C] text-white rounded-md hover:bg-red-700">
                      View My All Request
                    </button>
                  </Link>
                </div>
              )}
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
    </div>
  );
};

export default DonorHome;
