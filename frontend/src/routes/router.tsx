import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "../components/Admin/AdminLayout";

const Home = lazy(()=> import ('../pages/User/Home'))
const UserLogin = lazy(() => import('../pages/User/Login'));
const UserSignUP = lazy(()=>import ('../pages/User/signup'))
const UserOTP = lazy(()=>import('../pages/User/OTP'))
const UserBook = lazy(()=>import('../pages/User/Book'))

            // Owner Routes

const OwnerLogin = lazy(()=>import('../pages/Owner/ownerLogin'))  
const OwnerSignUp = lazy(()=>import('../pages/Owner/ownerSignUp')) 
const OTP = lazy(()=>import('../pages/Owner/OwnerOtp')) 
const UploadVenues = lazy(()=>import('../pages/Owner/venues/uploadVenues'))   
const HomePage = lazy(()=>import('../pages/Owner/Home'))  

            // Admin Routes

const AdminLogin = lazy(()=>import('../pages/Admin/login'))     
const AdminDashboard = lazy(()=>import('../pages/Admin/adminDashboard'))      
const UsersList = lazy(()=>import('../pages/Admin/usersList')) 

export const MainRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path = "/" element={<Home/>}/>
        <Route path = "/book" element={<UserBook/>}/>
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/register" element={<UserSignUP/>}/>
        <Route path="/otp" element={<UserOTP/>}/>

        {/* Owner Routes */}
        <Route path = "/login" element={<OwnerLogin/>}/>
        <Route path = "/owner/signup" element={<OwnerSignUp/>}/>
        <Route path = "/owner/otp" element={<OTP/>}/>
        <Route path = "/owner/venueupload" element={<UploadVenues/>}/>
        <Route path = "/owner/homepage" element={<HomePage/>}/>


        {/* admin routes */}
        <Route path = "/admin/login" element={<AdminLogin/>}/>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UsersList />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

