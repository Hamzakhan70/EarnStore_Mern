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
      </Routes>
    </>
  );
}

export default App;
