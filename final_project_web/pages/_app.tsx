import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
// import {store} from "@/store";
import Navigation from "@/components/layout/Navigation";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "@/store/store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const store = configureStore({
  reducer : rootReducer,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Navigation />
      <Component {...pageProps} />{" "}
      <ToastContainer />
    </Provider>
  );
}
