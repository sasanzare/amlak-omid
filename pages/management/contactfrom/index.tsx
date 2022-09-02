
    import {useState,useEffect,useContext} from 'react';
    import axios from 'axios';
    import { toast } from 'react-toastify';
    import { context } from "../../../context";
    import Table from 'react-bootstrap/Table';
    import FormModal from '../../../components/modal';
    import Form from 'react-bootstrap/Form';
    const contactFrom = ()=> {
        
        const { setShowLoading } = useContext(context);
        const [contactFromList,setcontactFromList] = useState([]);
        const [modalShow, setModalShow] = useState(false);
        const [modalObj, setModalObj] = useState(null);
        
        
        let searchTimeOut = null;
        useEffect(()=>{
           get({});
        },[])
        function getFilters(){
            return ''
        }
        function get(filters){

                    setShowLoading(true);
                    axios.get('/api/contactFrom'+getFilters()).then((res) => {
                setcontactFromList(res.data)
                if (res.status === 200) {
                    setShowLoading(false);
                 // setPageCount(res.data.count / itemsPerPage)
                }
              })
                .catch((err) => {
                  if (err.response?.data) {
                    err?.response?.data?.errors?.map(issue => toast.error(issue));
                  } else {
                    toast.error('مشکلی پیش آمده است !')
                  }
                  setShowLoading(false);
                })
          
        }
        function remove(data){
            axios.delete('/api/contactFrom?id='+data.id).then((res) => {
                get({});
            })
        }
 
        function upsert(){
            let submitForm = document.getElementById('submitForm')
            let formData = new FormData(submitForm);
            modalObj?.id && formData.append('id',modalObj.id)
            console.log('ok')
            let object = {};
            formData.forEach((value, key) => object[key] = value);
            axios.post('/api/contactFrom',object).then((res) => {
                setModalShow(false);
                get({});
            })
        }
     
        function search(value,field,searchTableName){
            clearTimeout(searchTimeOut);
            searchTimeOut = setTimeout(() => {
                axios.get(`/api/${searchTableName}/search?text=`+value).then((res) => {
                    console.log(res.data)
                    eval(`
                        set${field}SearchList(res.data)
                    `)
                })
            }, 1000);
        }
        function openDialoge(obj){
            if(obj)
                setModalObj(obj);
            setModalShow(true)
        }
        function closeDialoge(){
            setModalObj({});
            setModalShow(false)

        }
       
        return (
            <>
            <div className="p-2 pt-5">
                <h2 >contactFrom
                <button className="ms-2 me-2" onClick={() => openDialoge()}>+</button>
                </h2>
               
            </div>
            <Table striped bordered hover responsive>
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">fullName</th>
<th scope="col">email</th>
<th scope="col">title</th>
<th scope="col">description</th>
<th scope="col">createdAt</th>

        <th scope="col">Actions</th>

                </tr >
            </thead >
            <tbody>
            {
                contactFromList?.map((data,i)=>{
                    return (
                        <tr>
                        <td scope="row">{i}</td>
                        <td>{data.fullName}</td>
<td>{data.email}</td>
<td>{data.title}</td>
<td>{data.description}</td>
<td>{data.createdAt}</td>

                        <td scope="row">
                            <button className='btn btn-success' onClick={()=>{remove(data)}}> delete </button>
                            <button className='btn btn-danger' onClick={()=>{openDialoge(data)}}> edit </button>
                        </td>
                    </tr>
                    )
                })
            }
            
                
            </tbody>
        </Table>
        
        <FormModal
        show={modalShow}
        onCancel={() => closeDialoge()}
        onSave={upsert}
        title="add/edit contactFrom"
    >
    <Form dir='rtl' name="submitForm" id="submitForm">
        
                <Form.Group className="mb-3" controlId="fullName">
                <Form.Label>fullName</Form.Label>
                <Form.Control value={modalObj?.fullName} name="fullName" type="string" placeholder="Enter fullName" />
                </Form.Group>
                

                <Form.Group className="mb-3" controlId="email">
                <Form.Label>email</Form.Label>
                <Form.Control value={modalObj?.email} name="email" type="string" placeholder="Enter email" />
                </Form.Group>
                

                <Form.Group className="mb-3" controlId="title">
                <Form.Label>title</Form.Label>
                <Form.Control value={modalObj?.title} name="title" type="string" placeholder="Enter title" />
                </Form.Group>
                

                <Form.Group className="mb-3" controlId="description">
                <Form.Label>description</Form.Label>
                <Form.Control value={modalObj?.description} name="description" type="string" placeholder="Enter description" />
                </Form.Group>
                

    </Form>
    </FormModal>
        </>
        )
    }
    export default contactFrom;
    