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

  useEffect(() => {
    axiosSecure.post("/create-payment-intent");
  }, [axiosSecure]);

  const handleAmountChange = (event) => {
    const enteredAmount = event.target.value;
    setAmount(enteredAmount);
  };

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
        <input
          type="number"
          placeholder="Enter amount"
          onChange={handleAmountChange}
        />
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
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
          className="rounded-full bg-[#D60C0C] h-11 flex items-center justify-center px-14 py-3 transition hover:bg-white hover:text-[#D60C0C] hover:outline font-semibold text-white"
          type="submit"
          disabled={!stripe}
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default CheckOutForm;
