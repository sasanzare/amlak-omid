import SingleSelect from "../SingleSelect";
import { Form } from 'react-bootstrap';
import './NewsForm.module.css'
import MyMap from './../map/Map';
import React, { useState, useContext,useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { context } from './../../context/index';
import axios from "axios";
import { NewsApi } from './../../api/index';
import {getCityApi,getCityAreaByIdApi} from "../../api"
import dynamic from "next/dynamic";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML, convertFromHTML } from "draft-convert";

const NewsForm = () => {
    const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };

  const Editor = dynamic(
    () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
    { ssr: false }
  );

    const { setShowLoading } = useContext(context);


    const [name, setName] = useState();
    const [city, setCity] = useState();
    const [roomCount, setRoomCount] = useState();
    const [area, setArea] = useState();
    const [meter, setMeter] = useState();
    const [estateImage, setEstateImage] = useState();
    const [type, setType] = useState();
    const [price, setPrice] = useState();
    const [metrage, setMetrage] = useState();
    const [assignmentType, setAssignmentType] = useState();
    const [bedRooms, setBedRooms] = useState();
    const [advertiser, setAdvertiser] = useState();
    const [realStateCode, setRealStateCode] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [pictures, setPictures] = useState();
    const [lat, setLat] = useState();
    const [lang, setLang] = useState();
    const [cityList, setCityList] = useState([]);
    const [cityAreaList, setCityAreaList] = useState([]);
    const [showImg, setShowImg] = useState(null);
    const RealStateRegistration = new FormData();

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    useEffect(() => {
        getCity();
      }, [city]);
    useEffect(() => {
        getCityArea();
      }, [city]);

    function getCity() {
        setShowLoading(true);
        axios
          .get(getCityApi)
          .then((res) => {
            setCityList(res.data);
            if (res.status === 200) {
              setShowLoading(false);
            }
          })
          .catch((err) => {
            if (err.response?.data) {
              err?.response?.data?.errors?.map((issue) => toast.error(issue));
            } else {
              toast.error("مشکلی پیش آمده است !");
            }
            setShowLoading(false);
          });
      }



  function getCityArea() {
    setShowLoading(true);
    axios
      .get(`${getCityAreaByIdApi}?cityId=${city}`)
      .then((res) => {
        setCityAreaList(res.data);
        if (res.status === 200) {
          setShowLoading(false);
        }
      })
      .catch((err) => {
        if (err.response?.data) {
          err?.response?.data?.errors?.map((issue) => toast.error(issue));
        } else {
          toast.error("مشکلی پیش آمده است !");
        }
        setShowLoading(false);
      });
  }

    async function BtnHandeller(e) {
        e.preventDefault();

        try {
            setShowLoading(true)

            RealStateRegistration.append('city', city)
            RealStateRegistration.append("area", area);
            RealStateRegistration.append("type", type);
            RealStateRegistration.append("price", price);
            RealStateRegistration.append("metrage", metrage);
            RealStateRegistration.append("assignmentType", assignmentType);
            RealStateRegistration.append("bedRooms", bedRooms);
            RealStateRegistration.append("advertiser", advertiser);
            RealStateRegistration.append("realStateCode", realStateCode);
            RealStateRegistration.append("phoneNumber", phoneNumber);
            RealStateRegistration.append("title", title);
            RealStateRegistration.append("description", description);
            // RealStateRegistration.append("pictures", pictures);
            RealStateRegistration.append("lat", 2);
            RealStateRegistration.append("lang", 2);
            const res = await axios({
                method: "post",
                url: NewsApi,
                data: RealStateRegistration,
                headers: { "Content-Type": "multipart/form-data", 'Authorization': localStorage.getItem('token') },
            });
            if (res.status === 201) {
                toast.success(res.data.message);
                setShowLoading(false);
            }
        } catch (err) {
            if (err?.response?.data) {
                err?.response?.data?.errors?.map(issue => toast.error(issue))
            }
            else {
                toast.error('مشکلی پیش آمده است !')
            }
            setShowLoading(false);
        }
    }

    console.log(city, area, type, price, metrage, assignmentType, bedRooms, advertiser, realStateCode, phoneNumber, title, description, pictures)


    function selectPhoto(e) {
        let img = e.target.files[0]
        console.log(img)
        setPictures(e.target.files[0])
        RealStateRegistration.append('photo', img)

        var reader = new FileReader();
        // it's onload event and you forgot (parameters)
        reader.onload = function (e) {
            var image = document.createElement("img");
            // the result image data
            setShowImg(e.target.result);
        }
        // you have to declare the file loading
        reader.readAsDataURL(img);
    }
    return (
        <Form className="col-lg-6 col-md-8  newsForm mx-auto flex-column flex-lg-row py-3 mt-5" >
 

<Form.Group className="mb-3">
   

            <Form.Select className="border-0 shadow-es" onChange={(e) => setCity(e.target.value)} value={city}>
            <option>شهر
                  </option>
              {cityList?.map((data, i) => {
                return (
                  <option key={data.id} value={data.id}>
                    {data.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Select className="border-0 shadow-es" onChange={(e) => setArea(e.target.value)} value={area}>
              <option>محدوده</option>
              {cityAreaList?.map((data, i) => {
                return (
                  <option key={data.id} value={data.id}>
                    {data.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
   

          <Form.Group className="mb-3">
            <Form.Select className="border-0 shadow-es"
              onChange={(e) => setType(e.target.value)}
              value={type}
            >
              <option>نوع ملک (انتخاب نشده)</option>
              <option value="c">اداری / تجاری</option>
              <option value="a">آپارتمان</option>
              <option value="v">ویلایی / باغ و باغچه</option>
              <option value="l">زمین / کلنگی</option>
              <option value="i">مستقلات / پنت هاوس</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
            className="border-0 shadow-es text-es py-2 new-input"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              placeholder="قیمت برحسب تومان"
            />
          </Form.Group>

          <Form.Group className="mb-3">

            <Form.Select
            className="border-0 shadow-es"
              onChange={(e) => setMetrage(e.target.value)}
              value={metrage}
            >
              <option>متراژ</option>
              <option value="m10">۱۰ تا ۹۰ متر</option>
              <option value="m90">۹۰ تا ۱۵۰ متر</option>
              <option value="m150">۱۵۰ تا ۲۲۰ متر</option>
              <option value="m220">۲۲۰ متر به بالا</option>
            </Form.Select>
          </Form.Group>


          <Form.Group className="mb-3">
            <Form.Select
               className="border-0 shadow-es"
              onChange={(e) => setAssignmentType(e.target.value)}
              value={assignmentType}
            >
              <option>نوع واگذاری</option>
              <option value="rental">رهن و اجاره</option>
              <option value="forSale">خرید</option>
              <option value="fastSale">فروش فوری</option>
            </Form.Select>
          </Form.Group>


          <Form.Group className="mb-3">
            <Form.Select
             className="border-0 shadow-es"
              onChange={(e) => setBedRooms(e.target.value)}
              value={bedRooms}
            >
              <option>تعداد اتاق</option>
              <option value="one">۱</option>
              <option value="two">۲</option>
              <option value="three">۳</option>
              <option value="four">۴</option>
              <option value="five">۵</option>
            </Form.Select>
          </Form.Group>
  



      

            {/* <SingleSelect val={[
            "1",
            "2",
            "3",
            "4",
        ]} 
        name="user" 
        title="آگهی دهنده"
        {...register("advertiser" , {
            required:"شهر وارد نشده",
            onChange:(e)=>setAdvertiser(e.target.value)
        })}
         />

<SingleSelect val={[
            "1",
            "2",
            "3",
            "4",
        ]} 
        name="amlak" 
        title="کدمشاور املاک"
        {...register("realStateCode" , {
            required:"شهر وارد نشده",
            onChange:(e)=>setRealStateCode(e.target.value)
        })}
         /> */}



        
        <Form.Group className="mb-3">
            <Form.Control
            className="border-0 shadow-es text-es py-2 new-input"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              placeholder="شماره تماس"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
                   className="border-0 shadow-es text-es py-2"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="عنوان"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="text">
            <Editor
              editorState={editorState}
              onEditorStateChange={handleEditorChange}
            />
          </Form.Group>
            



            <Form.Group
                className="w-45 my-4 position-relative"
                controlId="formBasicEmail">
                {/* <button className="btn radius-5 upload-btn"></button> */}
                <label for="upload" className="btn radius-5 upload-btn">
                    انتخاب تصویر آگهی
                </label>
                <Form.Control
                    className=' shadow-es py-2 border-0 d-none'
                    type="file"
                    id="upload"
                    placeholder="افزودن عکس کارت ملی"
                    {...register("pictures", {
                        required: " عکس کارت ملی وارد نشده است",
                        onChange: (e) => { selectPhoto(e) }
                    })}
                />
                <Form.Text className="text-warning form-validate position-absolute ">
                    {errors?.pictures?.message}
                </Form.Text>
            <br/>
                {showImg && <img height={200} src={showImg} />}
            </Form.Group>

            <div className="mt-5">
                
            </div>

            <button onClick={(e) => BtnHandeller(e)} className="btn btn-es fw-bold px-3 w-50 mx-auto mt-4" href="#home">ثبت آگهی</button>

        </Form>
    );
}

export default NewsForm;