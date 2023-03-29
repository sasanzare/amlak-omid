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

import { getCityApi,  } from "../../../api";


export default () => {




 

  const { setShowLoading } = useContext(context);
  const [cityList, setCityList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [name, setName] = useState("");
  const [idC, setIdC] = useState(0);


  useEffect(() => {
    getCity();
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

  function remove(data) {
    axios.delete(`${getCityApi}?id=` + data.id).then((res) => {
      getCity();
    });
  }

  function upsert() {
    if (name == "") {
      return toast.error("لطفا نام شهر را وارد کنید!");
    }
      let object = {
       name
      };
      if (idC != 0) {
        object = { ...object, id: idC };
      }
      axios.post(getCityApi, object).then((res) => {
        setModalShow(false);
        getCity();
        reset();
      });
    
  }

  function reset() {
    setName("");
    setIdC("");
  }


  function openDialoge(obj) {
    if (obj) {
      setName(obj.name);
      setIdC(obj.id);
    }
    setModalShow(true);
  }
  function closeDialoge() {
    reset()
    setModalShow(false);
  }

  return (
    <AdminLayout>
      <div className="p-2 pt-5">
        <h2>
         شهرها
          <button
            className="btn btn-success me-3 f-20 fw-bold"
            onClick={() => openDialoge()}
          >
            +
          </button>
        </h2>
      </div>

      <FormModal
        show={modalShow}
        onCancel={() => closeDialoge()}
        func={upsert}
        title="شهرها"
      >
        <Form.Group className="mb-3">
          <Form.Label>نام شهر</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            value={name}

          />
        </Form.Group>

      </FormModal>

      <div className="row">
        <div className="col-md-12">
          <Card className="mb-4">
            <Card.Header>شهرها</Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <table className="table border mb-0">
                  <thead className="table-light fw-semibold">
                    <tr className="align-middle">
                      <th className="text-center">
                       
                      </th>
                      <th>نام شهر</th>
                    
                      <th>زمان ایجاد</th>
                      <th className="text-start ps-3">اقدامات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cityList?.map((data, i) => {
                      return (
                        <tr key={data.id} className="align-middle">
                          <td className="text-center">{++i}</td>
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
                                <Dropdown.Item
                                  className="text-success text-end"
                                  onClick={() => {
                                    openDialoge(data);
                                  }}
                                >
                                  ویرایش
                                </Dropdown.Item>
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
