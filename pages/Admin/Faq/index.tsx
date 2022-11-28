import { useState, useEffect, useContext } from "react";
import { AdminLayout } from "../../../layout";
import axios from "axios";
import { toast } from "react-toastify";
import { context } from "../../../context";
import FormModal from "../../../components/modal";
import { Form, Card, Dropdown } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faUsers,
  faCheckCircle,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";

export default () => {
  const { setShowLoading } = useContext(context);
  const [faqList, setFaqList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalObj, setModalObj] = useState(null);

  const [ans, setAns] = useState("");
  const [que, setQue] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [idQ, setIdQ] = useState(0);

  const onSwitchAction = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  useEffect(() => {
    get();
  }, []);

  function get() {
    setShowLoading(true);
    axios
      .get("/api/faq")
      .then((res) => {
        setFaqList(res.data);
        if (res.status === 200) {
          setShowLoading(false);
          // setPageCount(res.data.count / itemsPerPage)
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
    axios.delete("/api/faq?id=" + data.id).then((res) => {
      get();
    });
  }

  


  
  function upsert() {
    if(que != "" && ans != ""){
      let object = { question: que, answer: ans, status: isSwitchOn };
      if (idQ != 0) {
        object = { ...object, id: idQ };
      }
      axios.post("/api/faq", object).then((res) => {
        setModalShow(false);
        get();
        reset();
      });
    }
   
  }

  function reset() {
    setQue("");
    setAns("");
    setIsSwitchOn(false);
    setIdQ(0);
  }

  function openDialoge(obj) {
    if (obj) {
      setQue(obj.question);
      setAns(obj.answer);
      setIsSwitchOn(obj.status);
      setIdQ(obj.id);
    }
    setModalShow(true);
  }
  function closeDialoge() {
    setModalObj({});
    setModalShow(false);
    // setIsSwitchOn(false);
  }


  return (
    <AdminLayout>
      <div className="p-2 pt-5">
        <h2>
          سوالات متداول
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
        onSave={upsert}
      
        title="سوالات متداول"
      >
       
          <Form.Group className="mb-3">
            <Form.Label>سوال</Form.Label>
            <Form.Control
            required
              onChange={(e) => setQue(e.target.value)}
              value={que}
              // as="textarea"
              // rows={3}
              placeholder="سوال را وارد کنید..."
              
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>پاسخ</Form.Label>
            <Form.Control
              value={ans}
              onChange={(e) => setAns(e.target.value)}
              as="textarea"
              rows={4}
              placeholder="پاسخ را وارد کنید..."
              
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="status">
            <Form.Check
              className="d-flex flex-column-reverse"
              type="switch"
              onChange={onSwitchAction}
              checked={isSwitchOn}
              label="نمایش"
            />
          </Form.Group>
        
      </FormModal>
  
      <div className="row">
        <div className="col-md-12">
          <Card className="mb-4">
            <Card.Header>سوالات متداول</Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <table className="table border mb-0">
                  <thead className="table-light fw-semibold">
                    <tr className="align-middle">
                      <th className="text-center">
                        <FontAwesomeIcon icon={faUsers} fixedWidth />
                      </th>
                      <th>سوال</th>
                      <th>پاسخ</th>
                      <th className="text-center">نمایش</th>
                      <th>زمان ایجاد</th>
                      <th className="text-start ps-3">اقدامات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {faqList?.map((data, i) => {
                      let active = (
                        <FontAwesomeIcon
                          icon={faXmarkCircle}
                          className="text-danger"
                          fixedWidth
                        />
                      );

                      if (data.status == true)
                        active = (
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-success"
                            fixedWidth
                          />
                        );
                      return (
                        <tr key={i} className="align-middle">
                          <td className="text-center">{++i} || {data.id}</td>
                          <td>
                            <p>{data.question}</p>
                          </td>
                          <td>
                            <p>{data.answer}</p>
                          </td>
                          <td className="text-center">{active}</td>
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
    </AdminLayout>
  );
};
