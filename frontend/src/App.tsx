import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import { MainRouter } from './routes/router';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <BrowserRouter>
        <MainRouter />
        <Toaster />
      </BrowserRouter>

    </>
  )
}

export default App
