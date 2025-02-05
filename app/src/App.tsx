const BASE_URL = import.meta.env.VITE_BACKEND_URL ;
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51QnJ8rG65GHyV20cLIpMAqP31u0kmu7bmoqLYvQSAtB6LXzrwY0jxiPs36H0wDTVgl3qOVuLQ6hLQ2i0AYVBX2ak00HeDPHABu"
);
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthRegister from "./pages/auth/register";
import AuthLogin from "./pages/auth/login";
import AdminLayout from "./components/admin-view/layout";

import Products from "./pages/admin-view/products";
import Orders from "./pages/admin-view/orders";
import Features from "./pages/admin-view/features";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";

import { useDispatch, useSelector } from "react-redux";
import ShoppingLayout from "./components/shopping-view/layout";
import ShoppingHome from "./pages/shopping-view/home";
import SearchProducts from "./pages/shopping-view/search";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingAccounts from "./pages/shopping-view/accounts";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { checkAuth } from "./store/auth-slice";
import NotFound from "./pages/not-found";
// import { ToastProvider } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import AdminDashboard from "./pages/admin-view/dashboard";


function App() {
  
  const [clientSecret, setClientSecret] = useState("");
  const { isAuthenticated, user, isLoading } = useSelector(
    (state: any) => state.auth
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

 

  useEffect(() => {
    fetch(`${BASE_URL}/stripe/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ amount: 2000, currency: "usd" }), // amount in cents
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const options = {
    clientSecret,
  };


  if (isLoading)
    return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />

        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route index element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
          <Route path="login" element={<AuthLogin />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="Products" element={<Products />} />
          <Route path="Orders" element={<Orders />} />
          <Route path="Dashboard" element={<AdminDashboard />} />
          <Route path="features" element={<Features />} />
        </Route>

        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route
            path="checkout"
            element={
              <Elements stripe={stripePromise} options={options}>
                <ShoppingCheckout />
              </Elements>
            }/>
          <Route path="account" element={<ShoppingAccounts />} />
          {
            /* <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />*/
            <Route path="search" element={<SearchProducts />} />
          }
        </Route>

        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
