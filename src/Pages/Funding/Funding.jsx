import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../Components/Section Title/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecureInterceptors from "../../Custom Hooks/useAxiosSecureInterceptors";
import useUserDetails from "../../Custom Hooks/useUserDetails";
import Loading from "../../Components/Loading/Loading";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Pk);

const Funding = () => {
  const axiosSecure = useAxiosSecureInterceptors();
  const { loadedUser } = useUserDetails();

  const {
    data: specifiedFunding,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["specifiedFunding", loadedUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/funding/${loadedUser?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="mt-5">
      <Helmet>
        <title>BloodHub | Funding</title>
      </Helmet>
      <SectionTitle
        sub={"Empowering Lifesaving Initiatives Together"}
        heading={"Funding for Blood Donation Initiatives"}
        description={
          "Contribute to critical blood donation programs. Your support directly ensures a stable and accessible blood supply, making a lasting impact on saving lives and fostering a healthier community."
        }
      ></SectionTitle>

      <div className="card w-50 max-w-md glass bg-secondary hover:bg-secondary shadow-xl mb-4 md:mx-auto mx-6">
        <div className="card-body">
          <Elements stripe={stripePromise}>
            <CheckOutForm refetch={refetch}></CheckOutForm>
          </Elements>
        </div>
      </div>

      {specifiedFunding.length > 0 && (
        <div className="mt-14">
          <h1 className="text-center text-[#D60C0C] text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-bold">
            My All Donations
          </h1>

          <div className="overflow-x-auto my-9">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>User Email</th>
                  <th>Transaction Id</th>
                  <th>Donation Amount</th>
                  <th>Donation Date</th>
                </tr>
              </thead>
              <tbody>
                {specifiedFunding?.map((donation, index) => (
                  <tr key={donation?._id}>
                    <th>{index + 1}</th>
                    <td>{donation?.email}</td>
                    <td>{donation?.transactionId}</td>
                    <td>${donation?.donation}</td>
                    <td>{donation?.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Funding;
