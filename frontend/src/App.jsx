// import { useState } from 'react'
// import './App.css'
// import { Route, Routes } from 'react-router-dom'
// import AuthLayout from './components/auth/layout'
// import AuthLogin from './pages/auth/login'
// import AuthRegister from './pages/auth/register';
// import AdminLayout from './components/admin/layout'
// import AdminDashboard from './pages/admin-view/dashboard'
// import AdminProducts from './pages/admin-view/products'
// import AdminOrders from './pages/admin-view/orders'
// import AdminFeatures from './pages/admin-view/features'
// import ShoppingLayout from './components/shopping/layout'
// import ShoppingHome from './pages/shopping-view/home'
// import ShoppingListing from './pages/shopping-view/listing'
// import ShoppingCheckout from './pages/shopping-view/checkout'
// import ShoppingAccount from './pages/shopping-view/account'
// import CheckAuth from './components/common/check-auth'
// import { useSelector,useDispatch } from 'react-redux'
// import { useEffect } from 'react'
// import { checkAuth } from './store/auth-slice'
// import { Skeleton } from "./components/ui/skeleton"
// import PaypalReturnPage from './pages/shopping-view/paypal-return'
// import PaymentSuccessPage from './pages/shopping-view/payment-success'
// import SearchProducts from './pages/shopping-view/search'


// function App() {
//  const {isAuthenticated,user,isLoading}=useSelector((state) => state.auth)
//  const dispatch = useDispatch();
//  useEffect(() => {
//   dispatch(checkAuth());
// }, [dispatch]);

// if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;
//   return (
//     <>
//      <div className='flex flex-col overflow-hidden bg-white'>
//        <Routes>
//        <Route
//           path="/"
//           element={
//             <CheckAuth
//               isAuthenticated={isAuthenticated}
//               user={user}
//             ></CheckAuth>
//           }
//         />
//        <Route
//           path="/auth"
//           element={
//             <CheckAuth isAuthenticated={isAuthenticated} user={user}>
//               <AuthLayout />
//             </CheckAuth>
//           }
//         >
//             <Route path="login" element={<AuthLogin/>}/>
//             <Route path="register" element={<AuthRegister/>}/>
//          </Route>
//          <Route
//           path="/admin"
//           element={
//             <CheckAuth isAuthenticated={isAuthenticated} user={user}>
//               <AdminLayout />
//             </CheckAuth>
//           }
//         >
//            <Route path="dashboard" element={<AdminDashboard/>} />
//            <Route path="products" element={<AdminProducts/>} />
//            <Route path="orders" element={<AdminOrders/>} />
//            <Route path="features" element={<AdminFeatures/>} />
//          </Route>
//          <Route
//           path="/shop"
//           element={
//             <CheckAuth isAuthenticated={isAuthenticated} user={user}>
//               <ShoppingLayout />
//             </CheckAuth>
//           }
//         >
//          <Route path="home" element={<ShoppingHome/>}  />
//          <Route path="listing" element={<ShoppingListing/>}  />
//          <Route path="checkout" element={<ShoppingCheckout/>}  />
//          <Route path="account" element={<ShoppingAccount/>}  />
//          <Route path="paypal-return" element={<PaypalReturnPage />} />
//             <Route path="payment-success" element={<PaymentSuccessPage />} />
//              <Route path="search" element={<SearchProducts />} />
//          </Route>
//          {/* <Route path="/unauth-page" element={<UnauthPage />} /> */}
//        </Routes>
//      </div>
//     </>
//   )
// }

// export default App

import { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import AuthLayout from './components/auth/layout';
import AuthLogin from './pages/auth/login';
import AuthRegister from './pages/auth/register';
import AdminLayout from './components/admin/layout';
import AdminDashboard from './pages/admin-view/dashboard';
import AdminProducts from './pages/admin-view/products';
import AdminOrders from './pages/admin-view/orders';
import AdminFeatures from './pages/admin-view/features';
import ShoppingLayout from './components/shopping/layout';
import ShoppingHome from './pages/shopping-view/home'; // This will be public
import ShoppingListing from './pages/shopping-view/listing';
import ShoppingCheckout from './pages/shopping-view/checkout';
import ShoppingAccount from './pages/shopping-view/account';
import CheckAuth from './components/common/check-auth';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './store/auth-slice';
import { Skeleton } from "./components/ui/skeleton";
import PaypalReturnPage from './pages/shopping-view/paypal-return';
import PaymentSuccessPage from './pages/shopping-view/payment-success';
import SearchProducts from './pages/shopping-view/search';

// Import an UnauthPage or create a simple one if you don't have it
// For demonstration, let's assume you have a simple UnauthPage component
const UnauthPage = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-3xl font-bold text-red-600">401 - Unauthorized Access</h1>
    <p className="mt-4 text-gray-700">You do not have permission to view this page.</p>
    <a href="/shop/home" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Go to Home</a>
  </div>
);


function App() {
  const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  return (
    <>
      <div className='flex flex-col overflow-hidden bg-white'>
        <Routes>

          {/* Public Home Route - No CheckAuth wrapper here */}
          <Route path="/" element={<ShoppingLayout />}>
            <Route index element={<ShoppingHome />} /> {/* Renders ShoppingHome for "/" */}
          </Route>
          <Route path="/shop/home" element={<ShoppingLayout />}>
            <Route index element={<ShoppingHome />} /> {/* Renders ShoppingHome for "/shop/home" */}
          </Route>

          {/* Auth Routes (Login/Register) - Still protected to redirect if logged in */}
          <Route
            path="/auth"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user} publicAuthOnly={true}>
                <AuthLayout />
              </CheckAuth>
            }
          >
            <Route path="login" element={<AuthLogin />} />
            <Route path="register" element={<AuthRegister />} />
          </Route>

          {/* Admin Routes - Fully protected by CheckAuth */}
          <Route
            path="/admin"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user} adminOnly={true}>
                <AdminLayout />
              </CheckAuth>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="features" element={<AdminFeatures />} />
          </Route>

          {/* Protected Shopping Routes - Wrapped by CheckAuth */}
          <Route
            path="/shop"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user} protectedShopOnly={true}>
                <ShoppingLayout />
              </CheckAuth>
            }
          >
            {/* These will be protected */}
            <Route path="listing" element={<ShoppingListing />} />
            <Route path="checkout" element={<ShoppingCheckout />} />
            <Route path="account" element={<ShoppingAccount />} />
            <Route path="paypal-return" element={<PaypalReturnPage />} />
            <Route path="payment-success" element={<PaymentSuccessPage />} />
            <Route path="search" element={<SearchProducts />} />
          </Route>

          {/* Unauthorized Access Page */}
          <Route path="/unauth-page" element={<UnauthPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
