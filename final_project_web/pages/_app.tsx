import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
// import {store} from "@/store";
import Navigation from "@/components/layout/Navigation";
import { store } from "@/store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      
      
         
          <Component {...pageProps} /> <ToastContainer />
       
    </Provider>
  );
}