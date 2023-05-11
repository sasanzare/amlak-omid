import { Button, Form } from "react-bootstrap";
import SingleSelect from "../../components/SingleSelect";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
    getCityApi,

    getCityAreaByIdApi,

  } from "./../../api";
  import { context } from "../../context";

export default function Search() {
    const { setShowLoading } = useContext(context);
    const [city, setCity] = useState("");
    const [area, setArea] = useState("");
    const [cityList, setCityList] = useState([]);
    const [cityAreaList, setCityAreaList] = useState([]);

  const navigate = useRouter();

  useEffect(() => {
    getCity();
  }, []);

  useEffect(() => {
    getCityArea();
  }, [city]);

  function pushUrl() {
    let form = document.forms.namedItem("searchForm");
    navigate.push(
      `/Search?pageNumber=1&pageSize=8&cityId=${city}&type=${form.type.value}&cityAreaId=${area}&roomCount=${form.roomCount.value}&meter=${form.meter.value}&assignmentType=${form.assignmentType.value}&price=${form.price.value}`
    );
  }

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

  return (
    <Form className="Search row pt-4" id="searchForm">
      {/* <SingleSelect
        val={["شیراز"]}
        name="city"
        title="شهر"
        myClass="col-sm-6 col-11 mx-auto"
      /> */}



{/* <Form.Group className="SingleSelect mb-3 col-sm-6 col-11 mx-auto" >
            <Form.Select onChange={onChange} name={cityId} className='border-0 shadow-es'>
                <option  value=''>{title} - (انتخاب نشده)</option>
                {val.map((value, index) => {
                 
                        return <option key={index} value={value.val}>{value.title}</option>
                 
                })
                }
            </Form.Select>
        </Form.Group> */}

        <Form.Group className="SingleSelect mb-3 col-sm-6 col-11 mx-auto" >
            <Form.Select onChange={(e) => setCity(e.target.value)} value={city} className='border-0 shadow-es'>
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



            <Form.Group className="SingleSelect mb-3 col-sm-6 col-11 mx-auto">
        

            <Form.Select onChange={(e) => setArea(e.target.value)} value={area} className='border-0 shadow-es'>
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

{/* 
      <SingleSelect
        val={[
          "آب جوار",
          "آبیاری",
          "آرامستان دارالرحمه",
          "ابونصر",
          "ابیوردی",
          "احمدآباد",
          "احمدی",
          "ارم",
          "اسحاق بیگ",
          "اصلاح‌نژاد",
          "اطلسی",
          "امام حسین",
          "بازار",
          "باغ تخت",
          "بالا کفت",
          "بریجستون",
          "بعثت",
          "بنکداران",
          "پارک آزادی",
          "پانصد دستگاه (بلوار رحمت)",
          "پای کتا",
          "پردیس ارم",
          "پودنک",
          "تاچارا",
          "تپه تلویزیون",
          "تحولی",
          "ترکان",
          "ترمینال باربری",
          "تل حسین‌آباد",
          "تلخ داش",
          "تندگویان",
          "جانبازان",
          "جمهوری",
          "جوادیه",
          "چغا",
          "چنچنه",
          "چو گیاه",
          "حافظیه",
          "حسین‌آباد",
          "خلدبرین",
          "خلیلی",
          "دانشگاه شهید باهنر",
          "دباغ خانه",
          "درکی",
          "دروازه اصفهان",
          "دروازه کازرون",
          "دست خضر",
          "دشت چنار",
          "دوکوهک",
          "ده پیاله",
          "دینکان",
          "رحمت‌آباد",
          "رضوان",
          "رکن‌آباد",
          "ریشمک",
          "زرگری",
          "زرهی",
          "زند",
          "زیباشهر",
          "سامان",
          "سایت اداری",
          "ستارخان",
          "سجاد (بنی هاشم)",
          "سر باغ",
          "سعدیه",
          "سهل‌آباد",
          "سیلو",
          "سینما سعدی",
          "شاه قلی بیگی",
          "شریف‌آباد",
          "شهر صدرا",
          "شهرک آرین",
          "شهرک امام حسین",
          "شهرک امام رضا (فرگاز)",
          "شهرک امیر کبیر",
          "شهرک ایثار",
          "شهرک باهنر",
          "شهرک برق",
          "شهرک بزین",
          "شهرک بوتان",
          "شهرک پردیس",
          "شهرک پرواز",
          "شهرک جماران",
          "شهرک حجت‌آباد",
          "شهرک دارائی",
          "شهرک سجادیه",
          "شهرک سراج",
          "شهرک سعدی",
          "شهرک شهید بهشتی",
          "شهرک شهید مطهری",
          "شهرک عرفان",
          "شهرک فجر",
          "شهرک قصر قمشه",
          "شهرک کوشکک",
          "شهرک گلستان",
          "شهرک گلستان شمالی",
          "شهرک گلها",
          "شهرک مخابرات",
          "شهرک مدرس",
          "شهرک مهدی‌آباد",
          "شهرک مهرگان",
          "شهرک نصر",
          "شهرک نواب صفوی",
          "شهرک نیروی انتظامی",
          "شهرک والفجر",
          "شهرک ولیعصر",
          "شهید بهنام امیری",
          "شیخ علی چوپان",
          "شیشه‌گری",
          "صاحب الزمان",
          "صاحب دیوان",
          "عادل‌آباد (بلوار عدالت)",
          "عفیف‌آباد",
          "علی‌آباد",
          "فرزانگان",
          "فرهنگ شهر",
          "فرهنگیان",
          "فضل‌آباد",
          "فضیلت",
          "قدوسی شرقی",
          "قدوسی غربی",
          "قصرالدشت",
          "قلعه شاهزاده بیگم",
          "قلعه قبله",
          "قلعه نو",
          "کاراندیش",
          "کفترک",
          "کوزه‌گری",
          "کوی آزادی",
          "کوی زهرا",
          "کوی فرهنگیان",
          "کوی قضات",
          "کوی ولیعصر",
          "کوی یاس",
          "کیان شهر",
          "گلدشت",
          "گلدشت حافظ",
          "گلدشت محمدی",
          "گلدشت معالی‌آباد",
          "گلشن",
          "گلکوب",
          "گود عربان",
          "گویم",
          "لاله",
          "لب آب",
          "لشکری",
          "ماه فیروزان",
          "محراب",
          "محله انجیر (کلبه)",
          "محله سر دزک",
          "محله سنگ سیاه",
          "محله طلاب (نیستان)",
          "محمدیه",
          "محمودیه",
          "مسلم",
          "مشیر غربی",
          "معالی‌آباد",
          "مقر",
          "ملاصدرا",
          "منصورآباد",
          "منطقه هوایی دوران",
          "مهدی‌آباد",
          "مهدیه",
          "میانرود",
          "میدان شاه",
          "نارنجستان",
          "نشاط",
          "نصرآباد",
          "نیایش",
          "وحدت (بلوار مدرس)",
          "وزیرآباد",
          "وصال",
          "ویلاشهر کیمیا",
          "هفت تنان",
          "هویزه",
        ]}
        name="cityArea"
        title="محدوده"
        myClass="col-sm-6 col-11 mx-auto"
      /> */}



      <SingleSelect
        val={[
          { title: "اداری / تجاری", val: "c" },
          { title: "آپارتمان", val: "a" },
          { title: "ویلایی / باغ و باغچه", val: "v" },
          { title: "زمین / کلنگی", val: "l" },
          { title: "مستقلات / پنت هاوس", val: "i" },
        ]}
        name="type"
        title="نوع ملک"
        myClass="col-sm-4 col-11 mx-auto"
      />
      <SingleSelect
        val={[
          { val: "one", title: "1" },
          { val: "two", title: "2" },
          { val: "three", title: "3" },
          { val: "four", title: "4" },
          { val: "five", title: "5" },
        ]}
        name="roomCount"
        title="تعداد خواب"
        myClass="col-sm-4 col-11 mx-auto"
      />
      <SingleSelect
        val={[
          { title: "10 تا 90 متر", val: "m10" },
          { title: "90 تا 150 متر", val: "m90" },
          { title: "150 تا 220 متر", val: "m150" },
          { title: "220 به بالا", val: "m220" },
        ]}
        name="meter"
        title="متراژ"
        myClass="col-sm-4 col-11 mx-auto"
      />
      <SingleSelect
        val={[
          { title: "رهن و اجاره", val: "rental" },
          { title: "خرید", val: "forSale" },
          { title: "فروش فوری ملک", val: "fastSale" },
        ]}
        name="assignmentType"
        title="نوع واگذاری"
        myClass="col-sm-6 col-11 mx-auto"
      />

      <SingleSelect
        val={[
          {
            title: "100,000,000 تا 500,000,000 تومان",
            val: "100000000-500000000",
          },
          {
            title: "500,000,000 تا 1,500,000,000 تومان",
            val: "500000000-1500000000",
          },
          {
            title: "1,500,000,000 تا 3,500,000,000 تومان",
            val: "1500000000-3500000000",
          },
          {
            title: "3,500,000,000 تا 5,000,000,000 تومان",
            val: "3500000000-5000000000",
          },
          { title: "5,000,000,000 به بالا", val: "5000000000" },
        ]}
        name="price"
        title="قیمت"
        myClass="col-sm-6 col-11 mx-auto"
      />

      <div className="col-11 mx-auto text-center">
        <Button
          onClick={pushUrl}
          className="btn mx-auto btn-es shadow-es col-lg-2 col-md-4 col-sm-6 col-12"
        >
          جستجو
        </Button>
      </div>
    </Form>
  );
}
