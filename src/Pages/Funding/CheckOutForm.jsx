import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecureInterceptors from "../../Custom Hooks/useAxiosSecureInterceptors";
import { useState } from "react";

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecureInterceptors();
  const [amount, setAmount] = useState(0);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    amount !== 0 &&
      axiosSecure.post("/create-payment-intent", { amount }).then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure, amount]);

  const handleAmountChange = (event) => {
    const enteredAmount = event.target.value;
    setAmount(enteredAmount);
  };

  console.log(clientSecret, amount);

  const handleFunding = async (e) => {
    e.preventDefault();

    console.log(parseInt(amount));

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.message}`,
      });
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
  };
  return (
    <div>
      <form onSubmit={handleFunding}>
        <div className="space-y-5">
          <input
            type="number"
            placeholder="Enter Amount"
            min={0}
            onChange={handleAmountChange}
            className="input w-full max-w-xs"
          />

          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "white",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            className="btn rounded-full bg-[#D60C0C] h-11 flex items-center justify-center px-14 py-3 transition hover:bg-white hover:text-[#D60C0C] hover:outline font-semibold text-white"
            type="submit"
            disabled={!stripe}
          >
            Pay
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckOutForm;
