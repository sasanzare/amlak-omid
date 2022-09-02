
    import {useState,useEffect,useContext} from 'react';
    import axios from 'axios';
    import { toast } from 'react-toastify';
    import { context } from "../../../context";
    import Table from 'react-bootstrap/Table';
    import FormModal from '../../../components/modal';
    import Form from 'react-bootstrap/Form';
    const realEstate = ()=> {
        
        const { setShowLoading } = useContext(context);
        const [realEstateList,setrealEstateList] = useState([]);
        const [modalShow, setModalShow] = useState(false);
        const [modalObj, setModalObj] = useState(null);
        
        const [userSearchList, setuserSearchList] = useState([]);
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
                    axios.get('/api/realEstate'+getFilters()).then((res) => {
                setrealEstateList(res.data)
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
            axios.delete('/api/realEstate?id='+data.id).then((res) => {
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
            axios.post('/api/realEstate',object).then((res) => {
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
                <h2 >realEstate
                <button className="ms-2 me-2" onClick={() => openDialoge()}>+</button>
                </h2>
               
            </div>
            <Table striped bordered hover responsive>
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">agency</th>
<th scope="col">user</th>
<th scope="col">name</th>
<th scope="col">phoneNumber</th>
<th scope="col">description</th>
<th scope="col">roomCount</th>
<th scope="col">Photos</th>
<th scope="col">assignmentType</th>
<th scope="col">type</th>
<th scope="col">price</th>
<th scope="col">areaName</th>
<th scope="col">cityName</th>
<th scope="col">cityArea</th>
<th scope="col">longitude</th>
<th scope="col">latitude</th>
<th scope="col">createdAt</th>
<th scope="col">updatedAt</th>
<th scope="col">isActive</th>

        <th scope="col">Actions</th>

                </tr >
            </thead >
            <tbody>
            {
                realEstateList?.map((data,i)=>{
                    return (
                        <tr>
                        <td scope="row">{i}</td>
                        <td>{data.agency}</td>
<td>{data.user}</td>
<td>{data.name}</td>
<td>{data.phoneNumber}</td>
<td>{data.description}</td>
<td>{data.roomCount}</td>
<td>{data.Photos}</td>
<td>{data.assignmentType}</td>
<td>{data.type}</td>
<td>{data.price}</td>
<td>{data.areaName}</td>
<td>{data.cityName}</td>
<td>{data.cityArea}</td>
<td>{data.longitude}</td>
<td>{data.latitude}</td>
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
        title="add/edit realEstate"
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
            
                <Form.Group className="mb-3" controlId="name">
                <Form.Label>name</Form.Label>
                <Form.Control value={modalObj?.name} name="name" type="string" placeholder="Enter name" />
                </Form.Group>
                

                <Form.Group className="mb-3" controlId="phoneNumber">
                <Form.Label>phoneNumber</Form.Label>
                <Form.Control value={modalObj?.phoneNumber} name="phoneNumber" type="string" placeholder="Enter phoneNumber" />
                </Form.Group>
                

                <Form.Group className="mb-3" controlId="description">
                <Form.Label>description</Form.Label>
                <Form.Control value={modalObj?.description} name="description" type="string" placeholder="Enter description" />
                </Form.Group>
                

            <Form.Group className="mb-3" controlId="assignmentType">
            <Form.Label>assignmentType</Form.Label>
            <Form.Select  name="assignmentType">
            <option value="">select</option>
           
                    <option value="rental">rental</option>

                
                    <option value="forSale">forSale</option>

                
                    <option value="fastSale">fastSale</option>

                
          </Form.Select>
          </Form.Group>
            

            <Form.Group className="mb-3" controlId="type">
            <Form.Label>type</Form.Label>
            <Form.Select  name="type">
            <option value="">select</option>
           
                    <option value="commercial">commercial</option>

                
                    <option value="apartment">apartment</option>

                
                    <option value="villaGarden">villaGarden</option>

                
                    <option value="land">land</option>

                
                    <option value="independents">independents</option>

                
          </Form.Select>
          </Form.Group>
            

                <Form.Group className="mb-3" controlId="areaName">
                <Form.Label>areaName</Form.Label>
                <Form.Control value={modalObj?.areaName} name="areaName" type="string" placeholder="Enter areaName" />
                </Form.Group>
                

                <Form.Group className="mb-3" controlId="cityName">
                <Form.Label>cityName</Form.Label>
                <Form.Control value={modalObj?.cityName} name="cityName" type="string" placeholder="Enter cityName" />
                </Form.Group>
                

            <input className="form-control" placeHolder="cityArea"  name="searchcityArea" onChange={(e)=>{search(e.target.value,'cityArea','cityArea')}}/>
            <select  className="form-select" multiple aria-label="multiple select example" name="cityAreaId">
            {
                cityAreaSearchList.map((e)=>{
                    return ` <option value="${e.id}">e.name</option>`
                })

            }
           
          </select>
            
                <Form.Group className="mb-3" controlId="longitude">
                <Form.Label>longitude</Form.Label>
                <Form.Control value={modalObj?.longitude} name="longitude" type="string" placeholder="Enter longitude" />
                </Form.Group>
                

                <Form.Group className="mb-3" controlId="latitude">
                <Form.Label>latitude</Form.Label>
                <Form.Control value={modalObj?.latitude} name="latitude" type="string" placeholder="Enter latitude" />
                </Form.Group>
                

    </Form>
    </FormModal>
        </>
        )
    }
    export default realEstate;
    