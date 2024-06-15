import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import { MainRouter } from './routes/router';
import { Toaster } from 'react-hot-toast';
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store/store";
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <>
      <Provider store={store}>
      <PersistGate persistor={persistor}>
      <BrowserRouter>
        <MainRouter />
        <Toaster />
      </BrowserRouter>
      </PersistGate>
      </Provider>
    </>
  )
}

export default App
