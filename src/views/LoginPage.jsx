import React, {useState, useRef} from 'react'
import { useAuth } from "../contexts/AuthContext";
import { Container,  Form, Button, Alert, Col, Row } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';

export const LoginPage = () => {
    const [errMsg, setErrMsg] = useState()
    const emailRef = useRef()
    const {logIn} = useAuth()
    const passwordRef = useRef()
    const history = useHistory()

   async function login(e) {
        e.preventDefault()

        try {
            await logIn(emailRef.current.value, passwordRef.current.value);
            history.push('/')
        } catch{
            setErrMsg('Invalid username or password')
        }
    }

    return (
        
            <Container fluid className="d-flex loginImgBg justify-content-center align-items-center">
                <Row>
                    <Col>
                        <div className="formShadowBox text-light">
                            <Form  >
                                <Form.Group>
                                    {errMsg && <Alert  className="text-danger text-center errorBg">{errMsg}!</Alert>}
                                    <div className="d-flex justify-content-center">
                                     <i className="fas fa-user fa-3x"></i>
                                    </div>
                                    <h3 className="text-center mt-1 mb-5">Log in</h3>
                            
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label className="">Email Address:</Form.Label>
                                <Form.Control  type="email" size="sm" ref={emailRef} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password" ref={passwordRef} size="sm" />
                            </Form.Group>
                            <Button onClick={login} type="submit" variant='primary' className="btn-block mt-5">Log in.</Button>
                            <div className="d-flex mt-4 justify-content-between">
                                <Link to="create-user"> Don't have an account yet?<br /> Create account.</Link>
                                <Link to="/reset-password" > Forgot Password?</Link>
                            </div>
                        </Form>
                        </div>
                    </Col>
                </Row>
            </Container>

    )
}

