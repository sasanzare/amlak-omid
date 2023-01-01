import { useState, useEffect, useContext,useCallback } from "react";
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
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML, convertFromHTML } from "draft-convert";





import dynamic from "next/dynamic";









export default () => {
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
  const [faqList, setFaqList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
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
    if (que != "" && editorState != "") {
      let object = {
        question: que,
        answer: convertedContent,
        status: isSwitchOn,
      };
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
    // setAns("");
    setEditorState("");
    setIsSwitchOn(false);
    setIdQ(0);
  }


  const importerConfig = {
    htmlToEntity: (nodeName, node, createEntity) => {
      // a tags will become LINK entities, marked as mutable, with only the URL as data.
      if (nodeName === "a") {
        return createEntity(ENTITY_TYPE.LINK, "MUTABLE", { url: node.href })
      }
  
      if (nodeName === "img") {
        return createEntity(ENTITY_TYPE.IMAGE, "IMMUTABLE", {
          src: node.src,
        })
      }
  
      if (nodeName === "hr") {
        return createEntity(ENTITY_TYPE.HORIZONTAL_RULE, "IMMUTABLE", {})
      }
  
      return null
    },
    htmlToBlock: (nodeName) => {
      if (nodeName === "hr" || nodeName === "img") {
        // "atomic" blocks is how Draft.js structures block-level entities.
        return "atomic"
      }
  
      return null
    },
  }
  



  function openDialoge(obj) {
    if (obj) {
      setQue(obj.question);
       setEditorState(EditorState.createWithContent(convertFromHTML(obj.answer)));
      setIsSwitchOn(obj.status);
      setIdQ(obj.id);
    }
    setModalShow(true);
  }
  function closeDialoge() {
    setModalShow(false);
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
        func={upsert}
        title="سوالات متداول"
      >
        <Form.Group className="mb-3">
          <Form.Label>سوال</Form.Label>
          <Form.Control
            onChange={(e) => setQue(e.target.value)}
            value={que}
            as="textarea"
            rows={3}
            placeholder="سوال را وارد کنید..."
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>پاسخ</Form.Label>
          {/* <Form.Control
              value={ans}
              onChange={(e) => setAns(e.target.value)}
              as="textarea"
              rows={4}
              placeholder="پاسخ را وارد کنید..."
              
            /> */}

          <Editor
            editorState={editorState}
        
            onEditorStateChange={handleEditorChange}
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
                        <tr key={data.id} className="align-middle">
                          <td className="text-center">{++i}</td>
                          <td>
                            <p>{data.question}</p>
                          </td>

                          <td
                            dangerouslySetInnerHTML={{ __html: data.answer }}

                          />
                        
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
