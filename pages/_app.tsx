import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Loading from '../components/Loading/index';
import type { AppProps } from 'next/app';
import Backtotop from "../components/backtotop/Backtotop";
import Header from '../blocks/header/Header.js';
import Footer from '../blocks/footer/';
import ContextProvider from '../context';
import { Html } from 'next/document'
import { SSRProvider } from 'react-bootstrap';
import AdminBlock from '../blocks/adminBlock';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>

      {/* <Html lang='fa' dir='rtl'> */}

      <div className="App overflow-hidden" dir='rtl'>
        {
          false ? <AdminBlock >
            <Component  {...pageProps} />
          </AdminBlock>
            :
            (
              <SSRProvider>
                <ToastContainer />
                <Loading />
                <Header />
                <Backtotop />
                <Component {...pageProps} className="mt-5" />
                <Footer />
              </SSRProvider>

            )
        }

      </div>
    </ContextProvider>
  )
}

export default MyApp
