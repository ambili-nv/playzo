import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "../components/Admin/AdminLayout";
import { ProtectRoute,OwnerProtectRoute,AdminProtectRoute} from "./protectRoutes";
import { PublicRouteUser,PublicRouteOwner,PublicRouteAdmin } from "./publicRoutes";

const Home = lazy(()=> import ('../pages/User/Home'))
const UserLogin = lazy(() => import('../pages/User/Login'));
const UserSignUP = lazy(()=>import ('../pages/User/signup'))
const UserOTP = lazy(()=>import('../pages/User/OTP'))
const UserBook = lazy(()=>import('../pages/User/Book'))
const ForgotPassword = lazy(()=>import ('../pages/User/ForgotPAssword'))
const ResetPassword = lazy(()=>import ('../pages/User/resetPassword'))
const UserProfile = lazy(()=>import ('../pages/User/USerProfile'))
const SingleVenuePage = lazy(()=>import ('../pages/User/singleVenuePage'))
// const paymentPage = lazy(()=>import ('../pages/User/paymentSuccess'))
const PaymentPage = lazy(()=>import('../pages/User/paymentSuccess'))

            // Owner Routes

const OwnerLogin = lazy(()=>import('../pages/Owner/ownerLogin'))  
const OwnerSignUp = lazy(()=>import('../pages/Owner/ownerSignUp')) 
const OTP = lazy(()=>import('../pages/Owner/OwnerOtp')) 
const UploadVenues = lazy(()=>import('../pages/Owner/venues/uploadVenues'))   
const HomePage = lazy(()=>import('../pages/Owner/Home'))  
const OwnerProfile = lazy(()=>import ('../pages/Owner/OwnerProfile'))
const Venues = lazy(()=>import('../pages/Owner/venues/VenueDetails'))
const OwnerVenuesList = lazy(()=>import('../pages/Owner/venues/venuesList'))
const VenueDetails = lazy(()=>import('../pages/Owner/venues/VenueDetails'))
const Slots = lazy(()=> import('../pages/Owner/venues/slotsPage'))
const ViewSlotPage = lazy(()=> import('../pages/Owner/venues/viewSlotsPage'))

            // Admin Routes

const AdminLogin = lazy(()=>import('../pages/Admin/login'))     
const AdminDashboard = lazy(()=>import('../pages/Admin/adminDashboard'))      
const UsersList = lazy(()=>import('../pages/Admin/usersList')) 
const OwnerList  = lazy(()=>import('../pages/Admin/ownerList'))
const VenuesList = lazy(()=>import('../pages/Admin/venuesList'))

export const MainRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path = "/" element={<Home/>}/>
        {/* <Route path = "" element = {<PublicRouteUser/>}> */}
        <Route path = "/book" element={<UserBook/>}/>
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignUP/>}/>
        <Route path="/otp" element={<UserOTP/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password/:id" element={<ResetPassword/>}/>
        <Route path="/single-venue/:venueId" element={<SingleVenuePage/>}/>
        {/* </Route> */}

        <Route path = "" element = {<ProtectRoute/>}>
        <Route path="/user-profile" element={<UserProfile/>}/>
        <Route path="/payment_status/:id" element={<PaymentPage/>}/>

        </Route>

        {/* Owner Routes */}

        <Route path = "" element={<PublicRouteAdmin/>}>
        <Route path = "/owner/login" element={<OwnerLogin/>}/>
        <Route path = "/owner/signup" element={<OwnerSignUp/>}/>
        <Route path = "/owner/otp" element={<OTP/>}/>
        </Route>

        <Route path = "" element = {<OwnerProtectRoute/>}>
        <Route path = "/owner/venueupload" element={<UploadVenues/>}/>
        <Route path = "/owner/homepage" element={<HomePage/>}/>
        <Route path = "/owner/profile" element={<OwnerProfile/>}/>
        <Route path = "/owner/venue-details" element={<Venues/>}/>
        <Route path = "/owner/myvenue/:ownerId" element={<OwnerVenuesList/>}/>
        <Route path="/owner/edit-venue/:venueId" element={<VenueDetails />} />
        <Route path="/owner/add-slot/:venueId" element={<Slots />} />
        <Route path="/owner/view-slot/:venueId" element={<ViewSlotPage />} />
        </Route>

        {/* admin routes */}
        <Route path = "" element = {<PublicRouteAdmin/>}>
        <Route path = "/admin/login" element={<AdminLogin/>}/>
        </Route>

        <Route path = "" element = {<AdminProtectRoute/>}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UsersList />} />
          <Route path="owners" element={<OwnerList/>} />
          <Route path="venue-list/:ownerId" element={<VenuesList/>} />
        </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

