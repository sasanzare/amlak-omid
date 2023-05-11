import { Spinner } from "react-bootstrap";
import { useContext } from 'react';
import { context } from './../../context/index';
import styles from "./Loading.module.css"

const Loading = () => {
    const {showLoading} = useContext(context);
  
    return ( 
          <div
          className={`${styles.zIndex} w-100 vh-100 d-flex justify-content-center 
          align-items-center position-fixed bg-dark bg-opacity-75
          ${showLoading ? 'd-flex' : 'd-none'}
          `}>
              {/* <Spinner animation="grow" variant="light" /> */}
              <img className={`spinner-grow text-light rounded-5 p-3 ${styles.img}`} src="/img/logo-melko.png" alt="logo melko" />
          </div>      
     );
}
 
export default Loading;