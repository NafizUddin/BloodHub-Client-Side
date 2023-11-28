import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Custom Hooks/useAxiosPublic";
import Loading from "../../Components/Loading/Loading";
import SectionTitle from "../../Components/Section Title/SectionTitle";
import { Link } from "react-router-dom";

const PublicBloodRequests = () => {
  const axiosPublic = useAxiosPublic();

  const { data: donationReq, isLoading } = useQuery({
    queryKey: ["donationReq"],
    queryFn: async () => {
      const res = await axiosPublic.get("/donation?status=Pending");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="my-6">
      <SectionTitle
        sub={"Urgent Appeals for Life-Saving Contributions"}
        heading={"Blood Donation Requests"}
        description={
          "Explore critical blood donation requests, join our community, and help save lives by contributing to those in need. Your generosity can make a significant impact on individuals facing medical emergencies."
        }
      ></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-5">
        {donationReq?.map((singleDonation) => (
          <div
            key={singleDonation?._id}
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow"
          >
            <a href="#">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 h-[55px]">
                Requester Name: {singleDonation?.recipientName}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 text-lg">
              Location: {singleDonation?.recipientUpazilla},{" "}
              {singleDonation?.recipientDistrict}
            </p>
            <p className="mb-3 font-normal text-gray-700 text-lg">
              Donation Date: {singleDonation?.donationDate}
            </p>
            <p className="mb-3 font-normal text-gray-700 text-lg">
              Donation Date: {singleDonation?.donationTime}
            </p>
            <Link
              to={`/donationDetails/${singleDonation?._id}`}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#D60C0C] rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicBloodRequests;
