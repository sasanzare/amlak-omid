var schema = require('../prisma/json-schema/json-schema.json');
var fs = require('fs');
const basePath = process.cwd();
const pageProps = {

    // tempUser: {
    //     trans: 'کاربران موقت',
    //     icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 24 24">
    //     <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    //     <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
    //     <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
    //   </svg>`
    // },
    user: {
        trans: 'کاربران',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" fill="currentColor" className="feather" viewBox="0 0 24 24">
        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
        <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
        <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
      </svg>`
    },
    article: {
        trans: 'مقالات',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" fill="currentColor" className="feather" viewBox="0 0 24 24">
        <path fill-rule="evenodd" d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2ZM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Zm7.5.5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7ZM2 5.5a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5ZM10.5 5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3ZM13 8h-2V6h2v2Z"/>
      </svg>`
    },
    realEstate: {
        trans: 'املاک',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" fill="currentColor" className="feather" viewBox="0 0 24 24">
        <path fill-rule="evenodd" d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"/>
        <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z"/>
      </svg>`
    },
    cityArea: {
        trans: 'محله',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" fill="currentColor" className="feather" viewBox="0 0 24 24">
        <path d="M3.112 3.645A1.5 1.5 0 0 1 4.605 2H7a.5.5 0 0 1 .5.5v.382c0 .696-.497 1.182-.872 1.469a.459.459 0 0 0-.115.118.113.113 0 0 0-.012.025L6.5 4.5v.003l.003.01c.004.01.014.028.036.053a.86.86 0 0 0 .27.194C7.09 4.9 7.51 5 8 5c.492 0 .912-.1 1.19-.24a.86.86 0 0 0 .271-.194.213.213 0 0 0 .039-.063v-.009a.112.112 0 0 0-.012-.025.459.459 0 0 0-.115-.118c-.375-.287-.872-.773-.872-1.469V2.5A.5.5 0 0 1 9 2h2.395a1.5 1.5 0 0 1 1.493 1.645L12.645 6.5h.237c.195 0 .42-.147.675-.48.21-.274.528-.52.943-.52.568 0 .947.447 1.154.862C15.877 6.807 16 7.387 16 8s-.123 1.193-.346 1.638c-.207.415-.586.862-1.154.862-.415 0-.733-.246-.943-.52-.255-.333-.48-.48-.675-.48h-.237l.243 2.855A1.5 1.5 0 0 1 11.395 14H9a.5.5 0 0 1-.5-.5v-.382c0-.696.497-1.182.872-1.469a.459.459 0 0 0 .115-.118.113.113 0 0 0 .012-.025L9.5 11.5v-.003a.214.214 0 0 0-.039-.064.859.859 0 0 0-.27-.193C8.91 11.1 8.49 11 8 11c-.491 0-.912.1-1.19.24a.859.859 0 0 0-.271.194.214.214 0 0 0-.039.063v.003l.001.006a.113.113 0 0 0 .012.025c.016.027.05.068.115.118.375.287.872.773.872 1.469v.382a.5.5 0 0 1-.5.5H4.605a1.5 1.5 0 0 1-1.493-1.645L3.356 9.5h-.238c-.195 0-.42.147-.675.48-.21.274-.528.52-.943.52-.568 0-.947-.447-1.154-.862C.123 9.193 0 8.613 0 8s.123-1.193.346-1.638C.553 5.947.932 5.5 1.5 5.5c.415 0 .733.246.943.52.255.333.48.48.675.48h.238l-.244-2.855zM4.605 3a.5.5 0 0 0-.498.55l.001.007.29 3.4A.5.5 0 0 1 3.9 7.5h-.782c-.696 0-1.182-.497-1.469-.872a.459.459 0 0 0-.118-.115.112.112 0 0 0-.025-.012L1.5 6.5h-.003a.213.213 0 0 0-.064.039.86.86 0 0 0-.193.27C1.1 7.09 1 7.51 1 8c0 .491.1.912.24 1.19.07.14.14.225.194.271a.213.213 0 0 0 .063.039H1.5l.006-.001a.112.112 0 0 0 .025-.012.459.459 0 0 0 .118-.115c.287-.375.773-.872 1.469-.872H3.9a.5.5 0 0 1 .498.542l-.29 3.408a.5.5 0 0 0 .497.55h1.878c-.048-.166-.195-.352-.463-.557-.274-.21-.52-.528-.52-.943 0-.568.447-.947.862-1.154C6.807 10.123 7.387 10 8 10s1.193.123 1.638.346c.415.207.862.586.862 1.154 0 .415-.246.733-.52.943-.268.205-.415.39-.463.557h1.878a.5.5 0 0 0 .498-.55l-.001-.007-.29-3.4A.5.5 0 0 1 12.1 8.5h.782c.696 0 1.182.497 1.469.872.05.065.091.099.118.115.013.008.021.01.025.012a.02.02 0 0 0 .006.001h.003a.214.214 0 0 0 .064-.039.86.86 0 0 0 .193-.27c.14-.28.24-.7.24-1.191 0-.492-.1-.912-.24-1.19a.86.86 0 0 0-.194-.271.215.215 0 0 0-.063-.039H14.5l-.006.001a.113.113 0 0 0-.025.012.459.459 0 0 0-.118.115c-.287.375-.773.872-1.469.872H12.1a.5.5 0 0 1-.498-.543l.29-3.407a.5.5 0 0 0-.497-.55H9.517c.048.166.195.352.463.557.274.21.52.528.52.943 0 .568-.447.947-.862 1.154C9.193 5.877 8.613 6 8 6s-1.193-.123-1.638-.346C5.947 5.447 5.5 5.068 5.5 4.5c0-.415.246-.733.52-.943.268-.205.415-.39.463-.557H4.605z"/>
      </svg>`
    },
    city: {
        trans: 'شهر',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" fill="currentColor" className="feather" viewBox="0 0 24 24">
        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
      </svg>`
    },
    agency: {
        trans: 'آژانس',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" fill="currentColor" className="feather" viewBox="0 0 24 24">
        <path d="m8 0 6.61 3h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.38l.5 2a.498.498 0 0 1-.485.62H.5a.498.498 0 0 1-.485-.62l.5-2A.501.501 0 0 1 1 13V6H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 3h.89L8 0ZM3.777 3h8.447L8 1 3.777 3ZM2 6v7h1V6H2Zm2 0v7h2.5V6H4Zm3.5 0v7h1V6h-1Zm2 0v7H12V6H9.5ZM13 6v7h1V6h-1Zm2-1V4H1v1h14Zm-.39 9H1.39l-.25 1h13.72l-.25-1Z"/>
      </svg>`
    },

}
// <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-home align-text-bottom" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
let adminNavArray = [];

Object.keys(schema.definitions).forEach((table) => {
    // console.log(table)
    pageProps[table] &&
        adminNavArray.push(`
    <li className="nav-item">
        <Link href="/management/${table.toLocaleLowerCase()}">
            <a className="nav-link active" aria-current="page" href="#">
            ${pageProps[table].icon}
                ${pageProps[table].trans}
            </a>
        </Link>
    </li>
    `);

    let dataList = table + 'List'
    let pageCode = `
    import {useState,useEffect,useContext} from 'react';
    import axios from 'axios';
    import { toast } from 'react-toastify';
    import { context } from "../../../context";
    import Table from 'react-bootstrap/Table';
    import FormModal from '../../../components/modal';
    import Form from 'react-bootstrap/Form';
    const ${table} = ()=> {
        
        const { setShowLoading } = useContext(context);
        const [${dataList},set${dataList}] = useState([]);
        const [modalShow, setModalShow] = useState(false);
        const [modalObj, setModalObj] = useState(null);
        
        ${createPageStates(table, dataList)}
        let searchTimeOut = null;
        useEffect(()=>{
           get({});
        },[])
        function getFilters(){
            return ''
        }
        function get(filters){

                    setShowLoading(true);
                    axios.get('/api/${table}'+getFilters()).then((res) => {
                set${dataList}(res.data)
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
            axios.delete('/api/${table}?id='+data.id).then((res) => {
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
            axios.post('/api/${table}',object).then((res) => {
                setModalShow(false);
                get({});
            })
        }
     
        function search(value,field,searchTableName){
            clearTimeout(searchTimeOut);
            searchTimeOut = setTimeout(() => {
                axios.get(\`/api/\${searchTableName}/search?text=\`+value).then((res) => {
                    console.log(res.data)
                    eval(\`
                        set\${field}SearchList(res.data)
                    \`)
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
                <h2 >${table}
                <button className="ms-2 me-2" onClick={() => openDialoge()}>+</button>
                </h2>
               
            </div>
            <Table striped bordered hover responsive>
            <thead>
                <tr>
                <th scope="col">#</th>
                ${createTableFields(table, dataList)}
        <th scope="col">Actions</th>

                </tr >
            </thead >
            <tbody>
            {
                ${dataList}?.map((data,i)=>{
                    return (
                        <tr>
                        <td scope="row">{i}</td>
                        ${createTableDataFields(table, dataList)}
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
        title="add/edit ${table}"
    >
    <Form dir='rtl' name="submitForm" id="submitForm">
        ${createPopUpform(table, dataList)}
    </Form>
    </FormModal>
        </>
        )
    }
    export default ${table};
    `
    let apiCode = `
   
    import type { NextApiRequest, NextApiResponse } from 'next'

    import prisma from '../../../lib/prisma';
    const jwt = require('jsonwebtoken');
    
 
    export default async function handler(
      req: NextApiRequest,
      res: NextApiResponse,
    
    ) {
        if(req.method === "GET"){
            get(req,res)
        }
        else if (req.method === "POST"){
             upsert(req,res)
        }   
        else if (req.method === "DELETE"){
              remove(req,res)
        }else{
            throw new Error(
                \`The HTTP \${req.method} method is not supported at this route.\`
              )
        }
    }
    //schema.definitions[table].properties[current]
    async  function get(req,res) {
            let obj = await prisma.${table}.findMany({
                where: {
                    ${itterateFields(table, (prev, current) => {
        let prop = schema.definitions[table].properties[current];
        let query = '';
        if (prop.enum || prop.type == 'boolean' || (prop.type || '')[0] == 'integer' || (prop.type == 'integer'))
            query = `{ equals : req.query.${current} },\n`
        else if ((prop.type || '')[0] == 'string' || (prop.type == 'string' && prop.format != 'date-time'))
            query = `{ contains : req.query.${current} },\n`

        else
            return prev
        return `${prev || ''}${current} : ${query}`
    })
        }
                },
                // orderBy: [
                //     {
                //         createdAt: req.query.dateSort , //'desc',
                //     },
                    
                //   ],
                skip: 0,
                take: 20,
              });
            res.status(200).json(obj);
    }

    async function upsert(req,res) {
        let id = req.body.id || '';
        delete req.body.id;
        let obj = await prisma.${table}.upsert({
            where: {
              id,
            },
            update: {
                ...req.body
            },
            create: {
                ...req.body
            },
        });
          res.status(200).json(obj);
    }

    async function remove(req,res) {
        let obj = await prisma.${table}.delete({ where: { id:req.query.id } });
        res.status(200).json(obj);
    }
    `
    let searchCode = `
    import type { NextApiRequest, NextApiResponse } from 'next'

    import prisma from '../../../lib/prisma';
    
 
    export default async function handler(
      req: NextApiRequest,
      res: NextApiResponse,
    
    ) {
        let searchList = await prisma.${table}.findMany({
            where:{
                name:{
                    contains: req.query.text
                }
            }
        })
        res.status(200).json(searchList);
    }
    `
    let adminNavCode = `
    
import styles from './AdminBlock.module.css'
import Link from 'next/link';
export default function AdminBlock({ children }) {
    return (
        <div className="admin-header ">
            <header className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-1 shadow ">
                <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">املاک امید</a>
                <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-nav">
                    <div className="nav-item text-nowrap">
                        <a className="nav-link px-3" href="#">Sign out</a>
                    </div>
                </div>
            </header>
            <div className="container-fluid">
                <div className="row">
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse">
                        <div className="position-sticky pt-3">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <Link href="/management">
                                        <a className="nav-link active" aria-current="page" >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-home align-text-bottom" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                            Dashboard
                                        </a>
                                    </Link>
                                </li>
                                ${adminNavArray.join('\n')}
                            </ul>
                        </div>
                    </nav>
                    <main className="col-md-9 me-sm-auto col-lg-10 mt-5">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    )
}
    `
    try {
        fs.mkdirSync(basePath + `/pages/api/${table}`, { recursive: true })
        fs.writeFileSync(basePath + `/pages/api/${table}/index.ts`, apiCode)
        fs.writeFileSync(basePath + `/pages/api/${table}/search.ts`, searchCode)

        fs.mkdirSync(basePath + `/pages/management/${table.toLocaleLowerCase()}`, { recursive: true })
        fs.writeFileSync(basePath + `/pages/management/${table.toLocaleLowerCase()}/index.tsx`, pageCode)

        fs.writeFileSync(basePath + `/blocks/adminBlock/index.tsx`, adminNavCode)
    } catch (error) {
        console.log(error)
    }
});

function itterateFields(table, exec) {
    return Object.keys(schema.definitions[table].properties).filter((e) => { return !e.includes('id') && e != 'id' }).reduce(exec, '')
}
function createPopUpform(table, dataList) {

    return itterateFields(table, (prev, current) => {
        let currrentField = schema.definitions[table].properties[current]
        console.log('-------', current, currrentField)
        if (['createdAt', 'updatedAt', 'lastLogin'].includes(current)) {
            return `${prev || ''}`
        }
        else if ((currrentField.type == 'string' && !currrentField.enum) || (typeof currrentField.type == "object" && currrentField.type[0] == 'string' && currrentField[1] == null)) {
            return `${prev || ''}
                <Form.Group className="mb-3" controlId="${current}">
                <Form.Label>${current}</Form.Label>
                <Form.Control value={modalObj?.${current}} name="${current}" type="${schema.definitions[table].properties[current].type}" placeholder="Enter ${current}" />
                </Form.Group>
                \n`
        }
        else if (currrentField.enum) {
            return `${prev || ''}
            <Form.Group className="mb-3" controlId="${current}">
            <Form.Label>${current}</Form.Label>
            <Form.Select  name="${current}">
            <option value="">select</option>
           ${currrentField.enum.reduce((total, e) => {
                return `${total || ''}
                    <option value="${e}">${e}</option>\n
                `
            }, ``)
                }
          </Form.Select>
          </Form.Group>
            \n`
        }
        else if (currrentField['$ref']) {
            
            return `${prev || ''}
            <input className="form-control" placeHolder="${current}"  name="search${current}" onChange={(e)=>{search(e.target.value,'${current}','${currrentField['$ref'].split('\/').pop()}')}}/>
            <select  className="form-select" multiple aria-label="multiple select example" name="${current}Id">
            {
                ${current}SearchList.map((e)=>{
                    return \` <option value="\${e.id}">e.name</option>\`
                })

            }
           
          </select>
            `

        }
        return `${prev || ''}`
    })

}
function createTableFields(table, dataList) {
    return itterateFields(table, (prev, current) => {
        return `${prev || ''}<th scope="col">${current}</th>\n`
    })
}
function createTableDataFields(table, dataList) {
    return itterateFields(table, (prev, current) => {
        return `${prev}<td>{data.${current}}</td>\n`
    })
}
function createPageStates(table, dataList) {
    return itterateFields(table, (prev, current) => {
        let currrentField = schema.definitions[table].properties[current]
        if (currrentField['$ref']) {

            return `${prev}const [${current}SearchList, set${current}SearchList] = useState([]);\n`
        } else {
            return `${prev || ''}`
        }

    })
}