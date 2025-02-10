import {PaymentElement} from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";

const stripePromise = loadStripe("pk_test_your_publishable_key_here"); // Use your Stripe public key

// stripe payment

import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";

import { createNewOrder } from "@/store/shop/order-slice";
import { Navigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

function ShoppingCheckout() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  // stripe payment

  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();



  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;
  // this is paypal

  // function handleInitiatePaypalPayment() {
  //   if (cartItems.length === 0) {
  //     toast({
  //       title: "Your cart is empty. Please add items to proceed",
  //       variant: "destructive",
  //     });

  //     return;
  //   }
  //   if (currentSelectedAddress === null) {
  //     toast({
  //       title: "Please select one address to proceed.",
  //       variant: "destructive",
  //     });

  //     return;
  //   }

  //   const orderData = {
  //     userId: user?.id,
  //     cartId: cartItems?._id,
  //     cartItems: cartItems.items.map((singleCartItem) => ({
  //       productId: singleCartItem?.productId,
  //       title: singleCartItem?.title,
  //       image: singleCartItem?.image,
  //       price:
  //         singleCartItem?.salePrice > 0
  //           ? singleCartItem?.salePrice
  //           : singleCartItem?.price,
  //       quantity: singleCartItem?.quantity,
  //     })),
  //     addressInfo: {
  //       addressId: currentSelectedAddress?._id,
  //       address: currentSelectedAddress?.address,
  //       city: currentSelectedAddress?.city,
  //       pincode: currentSelectedAddress?.pincode,
  //       phone: currentSelectedAddress?.phone,
  //       notes: currentSelectedAddress?.notes,
  //     },
  //     orderStatus: "pending",
  //     paymentMethod: "paypal",
  //     paymentStatus: "pending",
  //     totalAmount: totalCartAmount,
  //     orderDate: new Date(),
  //     orderUpdateDate: new Date(),
  //     paymentId: "",
  //     payerId: "",
  //   };

  //   dispatch(createNewOrder(orderData)).then((data) => {
  //     console.log(data, "sangam");
  //     if (data?.payload?.success) {
  //       setIsPaymemntStart(true);
  //     } else {
  //       setIsPaymemntStart(false);
  //     }
  //   });
  // }

  // this is stripe

  // const handlePayment = async () => {
  //   if (!stripe || !elements) return;

  //   setLoading(true);
  //   const response = await fetch(
  //     "http://localhost:5000/api/stripe/create-payment-intent",
  //     {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ amount: 20, currency: "usd" }), // Adjust amount & currency
  //     }
  //   );

  //   const { clientSecret } = await response.json();

  //   const result = await stripe.confirmCardPayment(clientSecret, {
  //     payment_method: { card: elements.getElement(CardElement) },
  //   });

  //   if (result.error) {
  //     alert(result.error.message);
  //   } else if (result.paymentIntent.status === "succeeded") {
  //     alert("Payment successful!");
  //   }
  //   setLoading(false);
  // };
const handlePayment = async () => {
  if (!stripe || !elements) {
    console.error("Stripe or Elements not initialized.");
    return;
  }

  setLoading(true);

  // Get Card Element
  const cardElement = elements.getElement(CardElement);
  if (!cardElement) {
    console.error("CardElement not found!");
    setLoading(false);
    return;
  }

  try {
    // Send request to backend to create Payment Intent
    const response = await fetch(
      "http://localhost:5000/api/stripe/create-payment-intent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 2000, currency: "usd" }), // Amount in cents
      }
    );

    const data = await response.json();
    if (!data.clientSecret) {
      throw new Error("Failed to fetch clientSecret from backend");
    }

    // Confirm Card Payment
    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: { card: cardElement },
    });

    if (result.error) {
      console.error("Payment failed:", result.error.message);
      alert(result.error.message);
    } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
      console.log("Payment successful:", result.paymentIntent);
      alert("Payment successful!");
    }
  } catch (error) {
    console.error("Payment Error:", error);
    alert("Something went wrong. Please try again.");
  }

  setLoading(false);
};

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
 
      <div className="flex flex-col">
        <div className="relative h-[300px] w-full overflow-hidden">
          <img src={img} className="h-full w-full object-cover object-center" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
          <Address
            selectedId={currentSelectedAddress}
            setCurrentSelectedAddress={setCurrentSelectedAddress}
          />
          <div className="flex flex-col gap-4">
            {cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items.map((item) => (
                  <UserCartItemsContent cartItem={item} />
                ))
              : null}
            <div className="mt-8 space-y-4">
              <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold">${totalCartAmount}</span>
              </div>
            </div>
            <div className="mt-4 w-full">
              {/* <Button onClick={handleInitiatePaypalPayment} className="w-full">
              {isPaymentStart
                ? "Processing Paypal Payment..."
                : "Checkout with Paypal"}
            </Button> */}
              {/* stripe payment */}
              {/* <PaymentElement /> */}
              <CardElement/>
              <Button onClick={handlePayment} disabled={loading || !stripe}>
                {loading ? "Processing..." : "Pay Now"}
              </Button>
            </div>
          </div>
        </div>
      </div>

  );
}

export default ShoppingCheckout;

