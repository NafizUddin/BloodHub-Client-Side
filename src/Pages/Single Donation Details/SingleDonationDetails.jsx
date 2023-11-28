import { useLoaderData } from "react-router-dom";

const SingleDonationDetails = () => {
  const singleDonationData = useLoaderData();
  console.log(singleDonationData);
  return (
    <div>
      <h1>Hello from Single</h1>
    </div>
  );
};

export default SingleDonationDetails;
