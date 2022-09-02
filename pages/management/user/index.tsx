
    import {useState,useEffect,useContext} from 'react';
    import axios from 'axios';
    import { toast } from 'react-toastify';
    import { context } from "../../../context";
    import Table from 'react-bootstrap/Table';
    import FormModal from '../../../components/modal';
    import Form from 'react-bootstrap/Form';
    const user = ()=> {
        
        const { setShowLoading } = useContext(context);
        const [userList,setuserList] = useState([]);
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
                    axios.get('/api/user'+getFilters()).then((res) => {
                setuserList(res.data)
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
            axios.delete('/api/user?id='+data.id).then((res) => {
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
            axios.post('/api/user',object).then((res) => {
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
                <h2 >user
                <button className="ms-2 me-2" onClick={() => openDialoge()}>+</button>
                </h2>
               
            </div>
            <Table striped bordered hover responsive>
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">firstName</th>
<th scope="col">lastName</th>
<th scope="col">name</th>
<th scope="col">email</th>
<th scope="col">phoneNumber</th>
<th scope="col">nationalCode</th>
<th scope="col">address</th>
<th scope="col">lastLogin</th>
<th scope="col">role</th>
<th scope="col">agency</th>
<th scope="col">agentOf</th>
<th scope="col">agencyRate</th>
<th scope="col">createdAt</th>
<th scope="col">updatedAt</th>
<th scope="col">isActive</th>
<th scope="col">realEstate</th>

        <th scope="col">Actions</th>

                </tr >
            </thead >
            <tbody>
            {
                userList?.map((data,i)=>{
                    return (
                        <tr>
                        <td scope="row">{i}</td>
                        <td>{data.firstName}</td>
<td>{data.lastName}</td>
<td>{data.name}</td>
<td>{data.email}</td>
<td>{data.phoneNumber}</td>
<td>{data.nationalCode}</td>
<td>{data.address}</td>
<td>{data.lastLogin}</td>
<td>{data.role}</td>
<td>{data.agency}</td>
<td>{data.agentOf}</td>
<td>{data.agencyRate}</td>
<td>{data.createdAt}</td>
<td>{data.updatedAt}</td>
<td>{data.isActive}</td>
<td>{data.realEstate}</td>

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
        title="add/edit user"
    >
    <Form dir='rtl' name="submitForm" id="submitForm">
        
                <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>firstName</Form.Label>
                <Form.Control value={modalObj?.firstName} name="firstName" type="string,null" placeholder="Enter firstName" />
                </Form.Group>
                

                <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>lastName</Form.Label>
                <Form.Control value={modalObj?.lastName} name="lastName" type="string,null" placeholder="Enter lastName" />
                </Form.Group>
                

                <Form.Group className="mb-3" controlId="name">
                <Form.Label>name</Form.Label>
                <Form.Control value={modalObj?.name} name="name" type="string,null" placeholder="Enter name" />
                </Form.Group>
                

                <Form.Group className="mb-3" controlId="email">
                <Form.Label>email</Form.Label>
                <Form.Control value={modalObj?.email} name="email" type="string,null" placeholder="Enter email" />
                </Form.Group>
                

                <Form.Group className="mb-3" controlId="phoneNumber">
                <Form.Label>phoneNumber</Form.Label>
                <Form.Control value={modalObj?.phoneNumber} name="phoneNumber" type="string" placeholder="Enter phoneNumber" />
                </Form.Group>
                

                <Form.Group className="mb-3" controlId="address">
                <Form.Label>address</Form.Label>
                <Form.Control value={modalObj?.address} name="address" type="string,null" placeholder="Enter address" />
                </Form.Group>
                

            <Form.Group className="mb-3" controlId="role">
            <Form.Label>role</Form.Label>
            <Form.Select  name="role">
            <option value="">select</option>
           
                    <option value="admin">admin</option>

                
                    <option value="agencyOwner">agencyOwner</option>

                
                    <option value="agencyAgent">agencyAgent</option>

                
                    <option value="normal">normal</option>

                
          </Form.Select>
          </Form.Group>
            

    </Form>
    </FormModal>
        </>
        )
    }
    export default user;
    