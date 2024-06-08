import React from 'react'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import { MainRouter } from './routes/router';
import VenueUpload from './pages/Owner/venues/uploadVenues';


function App() {
  

  return (
    <>
    <BrowserRouter>
    <MainRouter/>
    </BrowserRouter>

    {/* <VenueUpload/> */}

    </>
  )
}

export default App
