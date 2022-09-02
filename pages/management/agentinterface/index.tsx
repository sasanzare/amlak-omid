
    import {useState,useEffect,useContext} from 'react';
    import axios from 'axios';
    import { toast } from 'react-toastify';
    import { context } from "../../../context";
    import Table from 'react-bootstrap/Table';
    import FormModal from '../../../components/modal';
    import Form from 'react-bootstrap/Form';
    const agentInterface = ()=> {
        
        const { setShowLoading } = useContext(context);
        const [agentInterfaceList,setagentInterfaceList] = useState([]);
        const [modalShow, setModalShow] = useState(false);
        const [modalObj, setModalObj] = useState(null);
        
        const [userSearchList, setuserSearchList] = useState([]);
const [agencySearchList, setagencySearchList] = useState([]);

        let searchTimeOut = null;
        useEffect(()=>{
           get({});
        },[])
        function getFilters(){
            return ''
        }
        function get(filters){

                    setShowLoading(true);
                    axios.get('/api/agentInterface'+getFilters()).then((res) => {
                setagentInterfaceList(res.data)
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
            axios.delete('/api/agentInterface?id='+data.id).then((res) => {
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
            axios.post('/api/agentInterface',object).then((res) => {
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
                <h2 >agentInterface
                <button className="ms-2 me-2" onClick={() => openDialoge()}>+</button>
                </h2>
               
            </div>
            <Table striped bordered hover responsive>
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">user</th>
<th scope="col">agency</th>
<th scope="col">createdAt</th>
<th scope="col">updatedAt</th>
<th scope="col">isActive</th>

        <th scope="col">Actions</th>

                </tr >
            </thead >
            <tbody>
            {
                agentInterfaceList?.map((data,i)=>{
                    return (
                        <tr>
                        <td scope="row">{i}</td>
                        <td>{data.user}</td>
<td>{data.agency}</td>
<td>{data.createdAt}</td>
<td>{data.updatedAt}</td>
<td>{data.isActive}</td>

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
        title="add/edit agentInterface"
    >
    <Form dir='rtl' name="submitForm" id="submitForm">
        
            <input className="form-control" placeHolder="user"  name="searchuser" onChange={(e)=>{search(e.target.value,'user','user')}}/>
            <select  className="form-select" multiple aria-label="multiple select example" name="userId">
            {
                userSearchList.map((e)=>{
                    return ` <option value="${e.id}">e.name</option>`
                })

            }
           
          </select>
            
            <input className="form-control" placeHolder="agency"  name="searchagency" onChange={(e)=>{search(e.target.value,'agency','agency')}}/>
            <select  className="form-select" multiple aria-label="multiple select example" name="agencyId">
            {
                agencySearchList.map((e)=>{
                    return ` <option value="${e.id}">e.name</option>`
                })

            }
           
          </select>
            
    </Form>
    </FormModal>
        </>
        )
    }
    export default agentInterface;
    