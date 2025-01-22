import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
function ShoppingLayout() {
  return (
    <div>
      <ShoppingHeader />
      <Outlet />
    </div>
  );
}
export default ShoppingLayout;
