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

function CheckAuth({ isAuthenticated, user, children, publicAuthOnly, adminOnly, protectedShopOnly }) {
  const location = useLocation();
  console.log(location.pathname, isAuthenticated, "publicAuthOnly:", publicAuthOnly, "adminOnly:", adminOnly, "protectedShopOnly:", protectedShopOnly);

  // Scenario 1: For /auth routes (login/register) - Redirect if already authenticated
  if (publicAuthOnly) {
    if (isAuthenticated) {
      if (user?.role === "admin") {
        return <Navigate to='/admin/dashboard' />;
      } else {
        return <Navigate to='/shop/home' />;
      }
    }
    return <>{children}</>; // Allow access if not authenticated
  }

  // Scenario 2: For Admin routes - Must be authenticated and admin
  if (adminOnly) {
    if (!isAuthenticated) {
      return <Navigate to='/auth/login' />; // Not authenticated, go to login
    }
    if (isAuthenticated && user?.role !== "admin") {
      return <Navigate to="/unauth-page" />; // Authenticated but not admin
    }
    // Authenticated and admin, proceed
    return <>{children}</>;
  }

  // Scenario 3: For Protected Shopping routes - Must be authenticated (any role is fine here)
  if (protectedShopOnly) {
    if (!isAuthenticated) {
      return <Navigate to='/auth/login' />; // Not authenticated, go to login
    }
    if (isAuthenticated && user?.role === "admin") {
      // If an admin tries to access a shop route, redirect them to admin dashboard
      return <Navigate to="/admin/dashboard" />;
    }
    // Authenticated (and not admin trying to access shop), proceed
    return <>{children}</>;
  }

  // Fallback or default for the root "/" route if you still want it protected or to direct.
  // This original logic might be tricky with the new public home.
  // Let's re-evaluate what "/" should do by default.
  // Given that / and /shop/home are now public, this default CheckAuth might not be needed directly on `/`.
  // If you still want the root to behave as a smart redirect based on auth status, keep this:
  if (!isAuthenticated &&
      !(location.pathname.includes('/login') || location.pathname.includes('/register')) &&
      !(location.pathname === '/' || location.pathname.includes('/shop/home')) // Exclude public home
  ) {
      return <Navigate to='/auth/login'/>
  }
  // If the root is *only* for redirection and the public home is handled by its own route,
  // then the original root CheckAuth might be simplified or removed, as the new public routes cover it.
  // For now, let's keep the existing logic, but ensure it *doesn't* redirect / or /shop/home to login.

  // If none of the specific scenarios (publicAuthOnly, adminOnly, protectedShopOnly) apply,
  // and it's not the public home, then it falls through to this.
  // This part of the logic handles cases where CheckAuth might still be used without specific flags.
  // However, with the new setup, most routes will now have a specific flag.
  // We should primarily rely on the explicit flags.

  // If for some reason CheckAuth is used without any specific flag, it implies a general protection.
  // For this scenario, if not authenticated, redirect to login.
  if (!publicAuthOnly && !adminOnly && !protectedShopOnly && !isAuthenticated) {
    // This catches any *other* route where CheckAuth might be placed without a specific flag,
    // and ensures it's protected.
    return <Navigate to='/auth/login'/>;
  }
  // If authenticated, or if no specific flag and authenticated, allow children to render.
  return <>{children}</>;
}

export default CheckAuth;