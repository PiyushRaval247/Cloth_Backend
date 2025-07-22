// import { Navigate,useLocation } from "react-router-dom";

// function CheckAuth ({isAuthenticated,user,children}){
//     const location = useLocation();
//     console.log(location.pathname, isAuthenticated);
//     if
//     (
//         !isAuthenticated && 
//         !(location.pathname.includes('/login') ||
//          location.pathname.includes('/register'))
//     )
//     {
//         return <Navigate to='/auth/login'/>
//     }
//     if
//     (
//         isAuthenticated && 
//         (location.pathname.includes('/login') ||
//          location.pathname.includes('/register'))
//     )
//     {
//         if(user?.role === "admin")
//         {
//             return <Navigate to='/admin/dashboard'/>
//         }
//         else{
//             return <Navigate to='/shop/home'/> 
//         }
//     }

//     if (
//         isAuthenticated &&
//         user?.role !== "admin" &&
//         location.pathname.includes("admin")
//       ) {
//         return <Navigate to="/unauth-page" />;
//       }

//       if (
//         isAuthenticated &&
//         user?.role === "admin" &&
//         location.pathname.includes("shop")
//       ) {
//         return <Navigate to="/admin/dashboard" />;
//       }
    
//       return <>{children}</>;
// }




// export default CheckAuth;

import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  const publicPaths = [
    "/",
    "/shop/home",
    "/shop/listing",
    "/shop/search",
    "/shop/payment-success",
    "/shop/paypal-return",
  ];

  const isPublicPath = publicPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  // ✅ 1. If user is NOT logged in and route is NOT public, redirect to login
  if (
    !isAuthenticated &&
    !isPublicPath &&
    !(location.pathname.includes("/login") || location.pathname.includes("/register"))
  ) {
    return <Navigate to="/auth/login" />;
  }

  // ✅ 2. If user is logged in and tries to access login or register
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") || location.pathname.includes("/register"))
  ) {
    return user?.role === "admin" ? (
      <Navigate to="/admin/dashboard" />
    ) : (
      <Navigate to="/shop/home" />
    );
  }

  // ✅ 3. Non-admin trying to access admin
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // ✅ 4. Admin trying to access /shop
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
