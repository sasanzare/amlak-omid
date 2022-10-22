
    import {useState,useEffect,useContext} from 'react';
    import axios from 'axios';
    import { toast } from 'react-toastify';
    import { context } from "../../../context";
    import Table from 'react-bootstrap/Table';
    import FormModal from '../../../components/modal';
    import Form from 'react-bootstrap/Form';
    const agency = ()=> {
        
        const { setShowLoading } = useContext(context);
        const [agencyList,setagencyList] = useState([]);
        const [modalShow, setModalShow] = useState(false);
        const [modalObj, setModalObj] = useState(null);
        
        const [ownerSearchList, setownerSearchList] = useState([]);
const [cityAreaSearchList, setcityAreaSearchList] = useState([]);

        let searchTimeOut = null;
        useEffect(()=>{
           get({});
        },[])
        function getFilters(){
            return ''
        }
        function get(filters){

                    setShowLoading(true);
                    axios.get('/api/agency'+getFilters()).then((res) => {
                setagencyList(res.data)
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
            axios.delete('/api/agency?id='+data.id).then((res) => {
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
            axios.post('/api/agency',object).then((res) => {
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
            <div className="p-2 pt-5 mt-5">
                <h2 >agency
                <button className="ms-2 me-2" onClick={() => openDialoge()}>+</button>
                </h2>
               
            </div>
            <Table striped bordered hover responsive>
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">name</th>
<th scope="col">owner</th>
<th scope="col">cityArea</th>
<th scope="col">agents</th>
<th scope="col">rate</th>
<th scope="col">createdAt</th>
<th scope="col">updatedAt</th>
<th scope="col">isActive</th>
<th scope="col">RealEstate</th>
<th scope="col">status</th>

        <th scope="col">Actions</th>

                </tr >
            </thead >
            <tbody>
            {
                agencyList?.map((data,i)=>{
                    return (
                        <tr>
                        <td scope="row">{i}</td>
                        <td>{data.name}</td>
<td>{data.owner}</td>
<td>{data.cityArea}</td>
<td>{data.agents}</td>
<td>{data.rate}</td>
<td>{data.createdAt}</td>
<td>{data.updatedAt}</td>
<td>{data.isActive}</td>
<td>{data.RealEstate}</td>
<td>{data.status}</td>

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
        title="add/edit agency"
    >
    <Form dir='rtl' name="submitForm" id="submitForm">
        
                <Form.Group className="mb-3" controlId="name">
                <Form.Label>name</Form.Label>
                <Form.Control value={modalObj?.name} name="name" type="string,null" placeholder="Enter name" />
                </Form.Group>
                

            <input className="form-control" placeHolder="owner"  name="searchowner" onChange={(e)=>{search(e.target.value,'owner','user')}}/>
            <select  className="form-select" multiple aria-label="multiple select example" name="ownerId">
            {
                ownerSearchList.map((e)=>{
                    return ` <option value="${e.id}">e.name</option>`
                })

            }
           
          </select>
            
            <input className="form-control" placeHolder="cityArea"  name="searchcityArea" onChange={(e)=>{search(e.target.value,'cityArea','cityArea')}}/>
            <select  className="form-select" multiple aria-label="multiple select example" name="cityAreaId">
            {
                cityAreaSearchList.map((e)=>{
                    return ` <option value="${e.id}">e.name</option>`
                })

            }
           
          </select>
            
            <Form.Group className="mb-3" controlId="status">
            <Form.Label>status</Form.Label>
            <Form.Select  name="status">
            <option value="">select</option>
           
                    <option value="accepted">accepted</option>

                
                    <option value="pending">pending</option>

                
                    <option value="denied">denied</option>

                
          </Form.Select>
          </Form.Group>
            

    </Form>
    </FormModal>
        </>
        )
    }
    export default agency;
    