import { BrowserRouter as BrowserRouter } from 'react-router-dom';
import { MainRouter } from './routes/router';
import { Toaster } from 'react-hot-toast';
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store/store";
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SocketProvider from './context/socketContext';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  return (
    <>
      <Provider store={store}>
      <PersistGate persistor={persistor}>
      <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
      <SocketProvider  >
        <MainRouter />
        </SocketProvider>
        <Toaster />
      </BrowserRouter>
        </GoogleOAuthProvider>
      </PersistGate>
      </Provider>
    </>
  )
}

export default App
