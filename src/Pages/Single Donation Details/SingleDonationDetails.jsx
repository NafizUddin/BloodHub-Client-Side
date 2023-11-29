import { useLoaderData } from "react-router-dom";
import detailsDonation from "../../assets/Icons/detailsDonation.png";

const SingleDonationDetails = () => {
  const singleDonationData = useLoaderData();
  console.log(singleDonationData);
  return (
    <div>
      <h1 className="text-center mt-5 text-[#D60C0C] text-3xl md:text-5xl">
        Details of Donation
      </h1>
      <div className="flex items-center justify-center mt-7">
        <img src={detailsDonation} className="w-52" />
      </div>
      <div className="max-w-xl mx-auto mt-8 pb-16">
        <div className="flex flex-col gap-3 mx-8 xl:mx-0">
          <h1 className="text-xl">
            Requester Name: {singleDonationData?.donorName}
          </h1>
          <h1 className="text-xl">
            Requester Email: {singleDonationData?.donorEmail}
          </h1>
          <h1 className="text-xl">
            Recipient Name: {singleDonationData?.recipientName}
          </h1>
          <h1 className="text-xl">
            Recipient Location: {singleDonationData?.recipientUpazilla},{" "}
            {singleDonationData?.recipientDistrict}.
          </h1>
          <h1 className="text-xl">
            Hospital Name: {singleDonationData?.hospitalName}
          </h1>
          <h1 className="text-xl">
            Hospital Address: {singleDonationData?.hospitalAddress}
          </h1>
          <h1 className="text-xl">
            Donation Date & Time: {singleDonationData?.donationDate},{" "}
            {singleDonationData?.donationTime}
          </h1>
          <h1 className="text-xl">
            Requester Message: {singleDonationData?.requesterMessage}
          </h1>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default SingleDonationDetails;
