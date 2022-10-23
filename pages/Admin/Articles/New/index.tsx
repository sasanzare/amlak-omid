import { useState, useEffect, useContext } from "react";
import { AdminLayout } from '../../../../layout';
import axios from "axios";
import { toast } from "react-toastify";
import { context } from "../../../../context";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import {
    Button, ButtonGroup, Card, Dropdown, ProgressBar,
  } from 'react-bootstrap';
  import Image from 'next/image';


  import { useEditor, EditorContent } from '@tiptap/react'
  import StarterKit from '@tiptap/starter-kit'


export default () => {

 
    const editor = useEditor({
        extensions: [
          StarterKit,
        ],
        content: '<p>Hello World! 🌎️</p>',
      })



    const { setShowLoading } = useContext(context);
    const [articleList, setarticleList] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [modalObj, setModalObj] = useState(null);
  
    let searchTimeOut = null;
  
    useEffect(() => {
    //   get({});
    }, []);
  
    function getFilters() {
      return "";
    }
  
    // function get(filters) {
    //   setShowLoading(true);
    //   axios
    //     .get("/api/article" + getFilters())
    //     .then((res) => {
    //       setarticleList(res.data);
    //       if (res.status === 200) {
    //         setShowLoading(false);
    //         // setPageCount(res.data.count / itemsPerPage)
    //       }
    //     })
    //     .catch((err) => {
    //       if (err.response?.data) {
    //         err?.response?.data?.errors?.map((issue) => toast.error(issue));
    //       } else {
    //         toast.error("مشکلی پیش آمده است !");
    //       }
    //       setShowLoading(false);
    //     });
    // }
  
    function remove(data) {
      axios.delete("/api/article?id=" + data.id).then((res) => {
        get({});
      });
    }
  
    function upsert() {
      let submitForm = document.getElementById("submitForm");
      let formData = new FormData(submitForm);
      modalObj?.id && formData.append("id", modalObj.id);
      console.log("ok");
      let object = {};
      formData.forEach((value, key) => (object[key] = value));
      axios.post("/api/article", object).then((res) => {
        setModalShow(false);
        get({});
      });
    }
  
    function search(value, field, searchTableName) {
      clearTimeout(searchTimeOut);
      searchTimeOut = setTimeout(() => {
        axios.get(`/api/${searchTableName}/search?text=` + value).then((res) => {
          console.log(res.data);
          eval(`
                      set${field}SearchList(res.data)
                  `);
        });
      }, 1000);
    }
    
    function openDialoge(obj) {
      if (obj) setModalObj(obj);
      setModalShow(true);
    }
    function closeDialoge() {
      setModalObj({});
      setModalShow(false);
    }
  
    return (
      <AdminLayout>
        {/* <div className="p-2 pt-5">
          <h2>
            article
            <button className="ms-2 me-2" onClick={() => openDialoge()}>
              +
            </button>
          </h2>
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">title</th>
              <th scope="col">summary</th>
              <th scope="col">text</th>
              <th scope="col">normalName</th>
              <th scope="col">articleImage</th>
              <th scope="col">createdAt</th>
  
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articleList?.map((data, i) => {
              return (
                <tr>
                  <td scope="row">{i}</td>
                  <td>{data.title}</td>
                  <td>{data.summary}</td>
                  <td>{data.text}</td>
                  <td>{data.normalName}</td>
                  <td>{data.articleImage}</td>
                  <td>{data.createdAt}</td>
  
                  <td scope="row">
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        remove(data);
                      }}
                    >
                      {" "}
                      delete{" "}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        openDialoge(data);
                      }}
                    >
                      {" "}
                      edit{" "}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
   */}


<div className="row">
      <div className="col-md-12">
        <Card className="mb-4">
          <Card.Header>
           ایجاد مقاله جدید
          </Card.Header>
          <Card.Body>
          <Form name="submitForm" id="submitForm">
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>عنوان مقاله</Form.Label>
              <Form.Control
                value={modalObj?.title}
                name="title"
                type="string"
                placeholder="عنوان مقاله را وارد کنید..."
              />
            </Form.Group>
  
            <Form.Group className="mb-3" controlId="summary">
              <Form.Label>خلاصه مقاله(توضیحات)</Form.Label>
              <Form.Control
                value={modalObj?.summary}
                name="summary"
                type="string,null"
                as="textarea" rows={3}
                placeholder="خلاصه مقاله را وارد کنید..."
              />
            </Form.Group>
  
            <Form.Group className="mb-3" controlId="text">
              <Form.Label>محتوا</Form.Label>
              <Form.Control
                value={modalObj?.text}
                name="text"
                type="string"
                placeholder="Enter text"
                as="textarea" rows={3}
              />
            </Form.Group>
  
            <Form.Group className="mb-3" controlId="normalName">
              <Form.Label>normalName</Form.Label>
              <Form.Control
                value={modalObj?.normalName}
                name="normalName"
                type="string,null"
                placeholder="Enter normalName"
              />
            </Form.Group>
  
            <Form.Group className="mb-3" controlId="articleImage">
              <Form.Label>articleImage</Form.Label>
              <Form.Control
                value={modalObj?.articleImage}
                name="articleImage"
                type="string,null"
                placeholder="Enter articleImage"
              />
            </Form.Group>

    

            <EditorContent editor={editor} />


            
          </Form>



    




          </Card.Body>
        </Card>
      </div>
    </div>
   
         
       
      </AdminLayout>
    );
  };
  