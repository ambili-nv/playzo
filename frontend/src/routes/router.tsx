import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = lazy(()=> import ('../pages/User/Home'))
const UserLogin = lazy(() => import('../pages/User/Login'));
const UserSignUP = lazy(()=>import ('../pages/User/signup'))
const UserBook = lazy(()=>import('../pages/User/Book'))

            // Owner Routes

const OwnerLogin = lazy(()=>import('../pages/Owner/ownerLogin'))  
const OwnerSignUp = lazy(()=>import('../pages/Owner/ownerSignUp'))  
const UploadVenues = lazy(()=>import('../pages/Owner/venues/uploadVenues'))        

export const MainRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path = "/" element={<Home/>}/>
        <Route path = "/book" element={<UserBook/>}/>
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignUP/>}/>

        {/* Owner Routes */}
        <Route path = "/owner/login" element={<OwnerLogin/>}/>
        <Route path = "/owner/signup" element={<OwnerSignUp/>}/>
        <Route path = "/owner/venueupload" element={<UploadVenues/>}/>

      </Routes>
    </Suspense>
  );
};

const App = () => {
  return (
    <Router>
      <MainRouter />
    </Router>
  );
};

export default App;
