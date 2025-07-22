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

  // Define which paths are public (no login required)
  const publicPaths = [
    "/",
    "/shop/home",
    "/shop/listing",
    "/shop/search",
    "/shop/payment-success",
    "/shop/paypal-return"
  ];

  const currentPath = location.pathname;

  // ✅ Check exact match or prefix match
  const isPublic = publicPaths.some(
    (path) => currentPath === path || currentPath.startsWith(path)
  );

  // ❌ If user is not logged in and path is NOT public → redirect to login
  if (
    !isAuthenticated &&
    !isPublic &&
    !(currentPath.includes("/login") || currentPath.includes("/register"))
  ) {
    return <Navigate to="/auth/login" />;
  }

  // ✅ If already logged in and trying to visit login/register → redirect to dashboard/home
  if (
    isAuthenticated &&
    (currentPath.includes("/login") || currentPath.includes("/register"))
  ) {
    return user?.role === "admin" ? (
      <Navigate to="/admin/dashboard" />
    ) : (
      <Navigate to="/shop/home" />
    );
  }

  // ❌ Non-admin trying to access /admin
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    currentPath.includes("/admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // ❌ Admin trying to access /shop
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    currentPath.includes("/shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  // ✅ All good, render child route
  return <>{children}</>;
}

export default CheckAuth;
