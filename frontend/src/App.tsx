import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import { MainRouter } from './routes/router';

function App() {
  return (
    <>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>

    </>
  )
}

export default App
