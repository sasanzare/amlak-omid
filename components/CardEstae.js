import Link from "next/link";
import Rate from "./Rate";
import { useState } from "react";
import {changeAgencyRating} from "../api";

function Card({ img, title, myclass,to }) {
  const [rating, setRating] = useState(0);
  // const changeRate = async () => {
  //   setShowLoading(true);
  //   try {
  //     const resp = await axios.post(changeAgencyRating, {
  //       agencyId : to,
  //       rate : rating,
  //     }, {
  //       headers: {
  //         Authorization: `${
  //           JSON.parse(localStorage.getItem("userData")).token
  //         }`,
  //         "Content-Type": "multipart/form-data",
  //       },
  //     } );

  //     if (resp.status === 200) {
  //       setShowLoading(false);
  //       console.log(resp.data);
  //     }
  //   } catch (err) {
  //     toast.error("مشکلی پیش آمده است !");
  //     setShowLoading(false);
  //   }
  // };
  return (
    <div className={`dir-l ${myclass}`}>
      <div className="shadow-sm text-center pb-2 overflow-hidden rounded-3">
        <Link href={"/Agencies/"+to}>
          <a className="text-decoration-none">
          <img src={img} className="w-100" height={150} />
          </a>
        </Link>
        <Link href={"/Agencies/"+to}>
          <a className="text-decoration-none text-dark">
          <p className="text-center">{title}</p>
          </a>
        </Link>
        
        
        <Rate rating={rating} onRating={(rate) => setRating(rate)} />
      </div>
    </div>
  );
}

export default Card;
