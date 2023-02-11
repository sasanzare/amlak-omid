import { useState, useEffect, useContext,useCallback } from "react";
import { AdminLayout } from "../../../layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { context } from "../../../context";
import FormModal from "../../../components/modal";
import { Form, Card, Dropdown } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import {getnestedCityAreaApi, getCityApi,createCityAreaApi,removeCityAreaApi  } from "../../../api";

export default () => {
  const { setShowLoading } = useContext(context);
  const [areaList, setAreaList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [idC, setIdC] = useState(0);
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    getArea();
  }, []);

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


  function getArea() {
    setShowLoading(true);
    axios
      .get(getnestedCityAreaApi)
      .then((res) => {
        setAreaList(res.data);
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

  function remove(data) {
    axios.delete(`${removeCityAreaApi}?id=` + data.id).then((res) => {
      getArea();
    });
  }

  function upsert() {
    if (city == "") {
      return toast.error("شهر را انتخاب کنید!");
    }
    if (area == "") {
      return toast.error("لطفا محدوده را وارد کنید!");
    }
      let object = {
       name:area,
       cityId: city
      };
      if (idC != 0) {
        object = { ...object, id: idC };
      }
      axios.post(createCityAreaApi, object).then((res) => {
        setModalShow(false);
        getArea();
        reset();
      });
    
  }

  function reset() {
    setCity("");
    setArea("");
    setIdC("");
  }


  function openDialoge(obj) {
    if (obj) {
      setIdC(obj.id);
    }
    setModalShow(true);
  }
  function closeDialoge() {
    reset()
    setModalShow(false);
  }

  function createNewAd(){
    getCity();
    setModalShow(true);
  }

  return (
    <AdminLayout>
      <div className="p-2 pt-5">
        <h2>
            محله ها
          <button
            className="btn btn-success me-3 f-20 fw-bold"
            onClick={() => createNewAd()}
          >
            +
          </button>
        </h2>
      </div>

      <FormModal
        show={modalShow}
        onCancel={() => closeDialoge()}
        func={upsert}
        title="محله"
      >
      <Form.Group className="mb-3">
            <Form.Label>شهر</Form.Label>

            <Form.Select
              onChange={(e) => setCity(e.target.value)}
              value={city}
            >
             <option>-----</option>
              {cityList?.map((data, i) => {
                return(
                  <option key={data.id} value={data.id}>{data.name}</option>
                );
              })}

            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
          <Form.Label>محدوده</Form.Label>
          <Form.Control
            onChange={(e) => setArea(e.target.value)}
            value={area}
          />
        </Form.Group>

      </FormModal>

      <div className="row">
        <div className="col-md-12">
          <Card className="mb-4">
            <Card.Header>محله</Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <table className="table border mb-0">
                  <thead className="table-light fw-semibold">
                    <tr className="align-middle">
                      <th className="text-center">
                       
                      </th>
                      <th>نام شهر</th>
                      <th>نام محله</th>
                    
                      <th>زمان ایجاد</th>
                      <th className="text-start ps-3">اقدامات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {areaList?.map((data, i) => {
                      return (
                        <tr key={data.id} className="align-middle">
                          <td className="text-center">{++i}</td>
                          <td>
                            <p>{data.city.name}</p>
                          </td>
                          <td>
                            <p>{data.name}</p>
                          </td>
                          <td>
                            <span>{data.createdAt}</span>
                          </td>
                          <td className="text-start">
                            <Dropdown align="end">
                              <Dropdown.Toggle
                                as="button"
                                bsPrefix="btn"
                                className="btn-link rounded-0 text-black-50 shadow-none p-0"
                                id="action-user1"
                              >
                                <FontAwesomeIcon
                                  fixedWidth
                                  icon={faEllipsisVertical}
                                />
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                {/* <Dropdown.Item
                                  className="text-success text-end"
                                  onClick={() => {
                                    openDialoge(data);
                                  }}
                                >
                                  ویرایش
                                </Dropdown.Item> */}
                                <Dropdown.Item
                                  className="text-danger text-end"
                                  href="#/action-3"
                                  onClick={() => {
                                    remove(data);
                                  }}
                                >
                                  حذف
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
      <ToastContainer position="top-left" rtl={true} theme="colored" />
    </AdminLayout>
  );
};
