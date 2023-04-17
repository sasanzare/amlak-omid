import Link from "next/link";
import Rate from "./Rate";
import { useState,useContext } from "react";
import {changeAgencyRating} from "../api";
import axios from "axios";
import { context } from "../context";
import { toast } from "react-toastify";

function Card({ img, title, myclass,to,rate }) {
  const firstRate = (rate == undefined)?0:rate
  const [rating, setRating] = useState(Math.round(firstRate));
  const { setShowLoading } = useContext(context);

  const changeRate = async (rate) => {
    setRating(Math.round((firstRate+rate)/2))
    setShowLoading(true);
    try {
      const resp = await axios.post(changeAgencyRating, {
        agencyId : to,
        rate : rate,
      }, {
        headers: {
          Authorization: `${
            JSON.parse(localStorage.getItem("userData")).token
          }`,
          "Content-Type": "multipart/form-data",
        },
      } );

      if (resp.status === 200) {
        setShowLoading(false);
        toast.success("از امتیازدهی شما سپاس گزاریم!");
        
      }
    } catch (err) {
      toast.error("مشکلی پیش آمده است !");
      setShowLoading(false);
    }
  };
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
        <Rate rating={rating} onRating={(rate) => changeRate(rate)} />
      </div>
    </div>
  );
}

export default Card;
