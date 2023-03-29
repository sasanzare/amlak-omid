import { Container, Row, Col, Form } from "react-bootstrap";
import Title from '../../microComponents/Title';
import styles from './SignIn.module.css'
import { Tabs, Tab } from "react-bootstrap";
import { useState } from 'react';
import AdvisorRegistration from './AdvisorRegistration';
import RealStateRegistration from "./RealStateRegistration";
import Login from './Login';


const SignIn = () => {
    const [key, setKey] = useState('home');

    return (
        <div className="vh-100 d-flex align-items-center justify-content-center">
                 <Container >
            <Row >
                <Col sm={12} md={9} className="mx-auto">
                    {/* <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3"
                    >
                        <Tab eventKey="home" title="ثبت نام کاربر"> */}
                            <Login />
                        {/* </Tab>

                        <Tab eventKey="moshaverAmlak" title="ثبت نام مشاور املاک">
                            <AdvisorRegistration />
                        </Tab>

                        <Tab eventKey="amlak" title="ثبت نام املاکی">
                            <RealStateRegistration />
                        </Tab> 

                    </Tabs> */}
                </Col>
            </Row>
            
        </Container>
        </div>
       





    );
}

export default SignIn;