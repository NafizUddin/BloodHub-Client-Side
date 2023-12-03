import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../Components/Section Title/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Pk);

const Funding = () => {
  return (
    <div className="mt-5">
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
            <CheckOutForm></CheckOutForm>
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Funding;
