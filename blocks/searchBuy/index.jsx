import { Button, Form } from "react-bootstrap";
import SingleSelect from "../../components/SingleSelect";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  getCityApi,
  getCityAreaByIdApi,
  getSurfaceFiltersApi,
  getPriceFiltersApi,
  getSettingsApi,
} from "../../api";
import { context } from "../../context";
import {
  convertToPersianDigits,
  convertToPersianDigitsWithComma,
} from "../../lib/number-converter";

export default function SearchBuy() {
  const { setShowLoading } = useContext(context);
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [cityList, setCityList] = useState([]);
  const [cityAreaList, setCityAreaList] = useState([]);
  const [priceFilters, setPriceFilters] = useState([]);
  const [surfaceFilters, setSurfaceFilters] = useState([]);
  const [settings, setSettings] = useState([]);

  const navigate = useRouter();

  useEffect(() => {
    getCity();
    getSurfaceFilters();
    getPriceFilters();
    getSettings()
  }, []);

  useEffect(() => {
    getCityArea();
  }, [city]);

  function pushUrl() {
    let form = document.forms.namedItem("searchForm");
    navigate.push(
      `/Buy?pageNumber=1&pageSize=8&cityId=${city}&type=${form.type.value}&cityAreaId=${area}&roomCount=${form.roomCount.value}&surface=${form.surface.value}&assignmentType=${form.assignmentType.value}&price=${form.price.value}`
    );
  }

  function getCity() {
    setShowLoading(true);
    axios
      .get(getCityApi)
      .then((res) => {
        setCityList(res.data);
        console.log(cityList)
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
  function getSurfaceFilters() {
    setShowLoading(true);
    axios
      .get(getSurfaceFiltersApi)
      .then((res) => {
        setSurfaceFilters(res.data);
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
  function getSettings() {
    setShowLoading(true);
    axios
      .get(getSettings)
      .then((res) => {
        setSettings(res.data);
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

  function generateRoomOptions() {
    const roomOptions = [];

    console.log(settings);
    for (let i = 1; i <= settings.maximumNumberOfRooms; i++) {
      roomOptions.push({ val: i, title: i.toString() });
    }

    return roomOptions;
  }


  function getPriceFilters() {
    setShowLoading(true);
    axios
      .get(getPriceFiltersApi)
      .then((res) => {
        setPriceFilters(res.data);
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
    <Form className="Search row pt-5 mt-5 " id='searchForm' >
      <Form.Group className="SingleSelect mb-3 col-sm-6 col-11 mx-auto">
        <Form.Select
          onChange={(e) => setCity(e.target.value)}
          value={city}
          className="border-0 shadow-es"
        >
          <option>شهر</option>
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
        <Form.Select
          onChange={(e) => setArea(e.target.value)}
          value={area}
          className="border-0 shadow-es"
        >
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
        val={generateRoomOptions()}
        name="roomCount"
        title="تعداد خواب"
        myClass="col-sm-4 col-11 mx-auto"
      />
      <SingleSelect
        val={surfaceFilters.map((filter) => ({
          title: `از ${convertToPersianDigitsWithComma(
            filter.minValue
          )} تا ${convertToPersianDigitsWithComma(filter.maxValue)} متر`,
          val: filter.id,
        }))}
        name="surface"
        title="متراژ"
        myClass="col-sm-4 col-11 mx-auto"
      />
      <SingleSelect
        val={[
          { title: "خرید", val: "forSale" },
          { title: "فروش فوری ملک", val: "fastSale" },
        ]}
        name="assignmentType"
        title="نوع واگذاری"
        myClass="col-sm-6 col-11 mx-auto"
      />

      <SingleSelect
        val={priceFilters.map((filter) => ({
          title: `از ${convertToPersianDigitsWithComma(
            filter.minValue
          )} تا ${convertToPersianDigitsWithComma(filter.maxValue)} تومان`,
          val: filter.id,
        }))}
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
