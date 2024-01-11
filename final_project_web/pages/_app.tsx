import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/stores";
import Navigation from "@/components/layout/Navigation";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Navigation />
      <Component {...pageProps} />{" "}
    </Provider>
  );
}
