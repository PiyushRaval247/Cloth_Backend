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

import { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";

import AdminLayout from "./components/admin/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";

import ShoppingLayout from "./components/shopping/layout";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";

import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";

import CheckAuth from "./components/common/check-auth";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "./components/ui/skeleton";

function App() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800px] h-[600px] bg-black" />;

  const publicPaths = [
    "/",
    "/shop/home",
    "/shop/listing",
    "/shop/search",
    "/shop/payment-success",
    "/shop/paypal-return"
  ];

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* Root route (optional: redirect or public page) */}
        <Route
          path="/"
          element={<CheckAuth isAuthenticated={isAuthenticated} user={user} />}
        />

        {/* 🔐 Auth routes */}
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* 🔐 Admin routes */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        {/* 🛍️ Shopping routes (checkout & account are protected) */}
        <Route path="/shop" element={<ShoppingLayout />}>
          {/* Public routes */}
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="search" element={<SearchProducts />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />

          {/* Protected routes */}
          <Route
            path="checkout"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <ShoppingCheckout />
              </CheckAuth>
            }
          />
          <Route
            path="account"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <ShoppingAccount />
              </CheckAuth>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
