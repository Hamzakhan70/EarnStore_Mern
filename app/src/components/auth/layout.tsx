// import { Outlet } from "react-router-dom";
// import openShopImg from "@/assets/open-shop.jpg";
// function AuthLayout() {
//   return (
//     <div className="flex min-h-screen w-full">
//       <div
//         className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12 bg-cover bg-center"
//         style={{ backgroundImage: `url(${openShopImg})` }}
//       >
//         <div className="max-w-md space-y-6 text-center text-primary-foreground"></div>
//       </div>
//       <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default AuthLayout;
import { Outlet, useLocation } from "react-router-dom";
import openShopImg from "@/assets/open-shop.jpg";
import imageBG from "@/assets/signup-bg.mp4";

function AuthLayout() {
  const location = useLocation();
  console.log(location);
  const isSignup = location.pathname === "/auth/register"; // Check if it's the signup page

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      {/* Background Video (Fullscreen) */}
      {isSignup && (
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={imageBG} type="video/mp4" />
        </video>
      )}

      {/* Overlay to Darken Video (Optional for better text readability) */}
      {!isSignup && (
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={imageBG} type="video/mp4" />
        </video>
      )}
      {/* {!isSignup && (
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/40"
          style={{ backgroundImage: `url(${openShopImg})` }}
        ></div>
      )} */}

      {/* Centered Form */}
      <div className="relative z-10 flex items-center justify-center w-full">
        <div className="bg-white/20 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
