import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Navigation from "@/components/layout/Navigation";
import { store } from "@/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isSigninPage = router.pathname === "/signin";
  const isSignupPage = router.pathname === "/signup";
  const isHomePage = router.pathname === "/";
  const isStudentsSignIn = router.pathname === "/signin/students";
  const isTeachersSignin = router.pathname === "/signin/teachers";
  const isStudentsSignup = router.pathname === "/signup/student";
  const isTeachersSignup = router.pathname === "/signup/teacher";
  const isQuestion = router.pathname.startsWith("/question");

  return (
    <div className="flex">
      <Provider store={store}>
        <div
          className={`flex ${isSigninPage ? "hidden" : ""} ${
            isHomePage ? "hidden" : ""
          } ${isSignupPage ? "hidden" : ""} w-1/6 ${
            isStudentsSignIn ? "hidden" : ""
          } ${isTeachersSignin ? "hidden" : ""} ${
            isStudentsSignup ? "hidden" : ""
          } ${isTeachersSignup ? "hidden" : ""} ${
            isQuestion ? "hidden" : ""
          }`}
        >
          <Navigation />
        </div>
        <Component {...pageProps} /> <ToastContainer />
      </Provider>
    </div>
  );
}
