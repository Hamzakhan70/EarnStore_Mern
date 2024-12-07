import {
  Route,
  Routes
} from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthRegister from "./pages/auth/register";
import AuthLogin from "./pages/auth/login";
import AdminLayout from "./components/admin-view/layout";
import Dashboard from "./pages/admin-view/dashboard";
import Products from "./pages/admin-view/products";
import Orders from "./pages/admin-view/orders";
import Features from "./pages/admin-view/features";
import ShoppingLayout from "./components/shopping-view/layout";
import Accounts from "./pages/shopping-view/accounts";
import Checkout from "./pages/shopping-view/checkout";
import ShoppingHOme from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";


function App() {

  return (
    <>
      <h1>welcome to earnshop_mern</h1>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="register" element={<AuthRegister />} />
          <Route path="login" element={<AuthLogin />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="Products" element={<Products />} />
          <Route path="Orders" element={<Orders />} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="features" element={<Features />} />
        </Route>
        <Route path="/shop" element={<ShoppingLayout />}>
          <Route path="accounts" element={<Accounts />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="home" element={<ShoppingHOme />} />
          <Route path="listing" element={<ShoppingListing />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
