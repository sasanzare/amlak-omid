import { NextPage } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import {
  Button,
  Col, Container, Form, InputGroup, Row,
} from 'react-bootstrap'
import Link from 'next/link'
import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/router';
import { ToastContainer, toast } from "react-toastify";
import Cookies from 'js-cookie';

import {adminLogin} from "../../api"

const Login: NextPage = () => {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const login = (e: SyntheticEvent) => {
  //   e.stopPropagation()
  //   e.preventDefault()

  //   setSubmitting(true)

  //   // setTimeout(() => {
  //   //   setSubmitting(false)
  //   //   router.push('/')
  //   // }, 2000)
  // }

  const login = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setSubmitting(true);
    const res = await fetch(adminLogin, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    const data = await res.json()
    if (data.token) {
      // Redirect to the dashboard page
      Cookies.set('tokenAdmin', data.token, { expires: 1 })
      toast.success("خوش آمدید")
      router.replace('/Admin')
      setSubmitting(false);
    } else {
      toast.error(data.message)
      setSubmitting(false);
    }
  }



  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center dark:bg-transparent">
      <Container>
        <Row className="justify-content-center align-items-center px-3">
          <Col lg={8}>
            <Row>
              <Col md={7} className="bg-white border p-5">
                <div className="">
                  <h1>ورود به پنل مدیریت</h1>

                  <form onSubmit={login} className='dir-l'>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <FontAwesomeIcon
                          icon={faUser}
                          fixedWidth
                        />
                      </InputGroup.Text>
                      <Form.Control
                        name="username"
                        required
                        disabled={submitting}
                        placeholder="Username"
                        aria-label="Username"
                        value={username} onChange={(e) => setUsername(e.target.value)} 
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <FontAwesomeIcon
                          icon={faLock}
                          fixedWidth
                        />
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        name="password"
                        required
                        disabled={submitting}
                        placeholder="Password"
                        aria-label="Password"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                      />
                    </InputGroup>

                    <Row>
                      <Col xs={12} className='text-center'>
                        <Button className="px-4" variant="primary" type="submit" disabled={submitting}>ورود</Button>
                      </Col>
                      {/* <Col xs={6} className="text-end">
                        <Button className="px-0" variant="link" type="submit">
                          Forgot
                          password?
                        </Button>
                      </Col> */}
                    </Row>
                  </form>
                </div>
              </Col>
              <Col
                md={5}
                className="bg-primary text-white d-flex align-items-center justify-content-center p-5"
              >
                <div className="text-center">
                  <h2>Melko</h2>
                  <p>
                    به ادمین پنل ملکو خوش آمدید! برای ورود به بخش ادمین لطفا نام کاربری و پسورد را وارد کنید.
                  </p>
                  {/* <Link href="/register">
                    <button className="btn btn-lg btn-outline-light mt-3" type="button">
                      Register Now!
                    </button>
                  </Link> */}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <ToastContainer position="top-left" rtl={true} theme="colored" />
    </div>
  )
}

export default Login
