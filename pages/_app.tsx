

// import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-svg-core/styles.css';
import '../styles/globals.scss';
import "../styles/globals.css";



import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Loading from "../components/Loading/index";
import type { AppProps } from "next/app";
import Backtotop from "../components/backtotop/Backtotop";
import Header from "../blocks/header/";
import Footer from "../blocks/footer/";
import ContextProvider from "../context";
import { SSRProvider } from "react-bootstrap";
import AdminBlock from "../blocks/adminBlock";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const hide =
    router.pathname === "/404" || router.pathname.includes("/Admin") ? false : true;
  return (
    <ContextProvider>
      <div className="App overflow-hidden" dir="rtl">
        {false ? (
          <AdminBlock>
            <Component {...pageProps} />
          </AdminBlock>
        ) : (
          <SSRProvider>
            {/* <ToastContainer /> */}
            <Loading />
            {hide && <Header />}           
            {hide && <Backtotop />}
            <Component {...pageProps} className="mt-5" />
            {hide && <Footer />}
          </SSRProvider>
        )}
      </div>
    </ContextProvider>
  );
}

export default MyApp;
