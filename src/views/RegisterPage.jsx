import React, {useRef, useState} from 'react'
import { Container,  Form, Button, Alert, Col, Row } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

export const RegisterPage = () => {
  const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  const passRegEx =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPassRef = useRef()
  const [loading, setLoading] = useState()
  const [errMsg, setErrMsg] = useState()
  const { signUp } = useAuth();
  const history = useHistory()


  // CREATE USER
 async function registerUser(e){
      e.preventDefault()
      if(!emailRegEx.test(emailRef.current.value)){
        return setErrMsg('Please enter a valid Email')
      }else if(passwordRef.current.value !== confirmPassRef.current.value){
        return  setErrMsg('Passwords do not match')
      }else if(!passRegEx.test(passwordRef.current.value)){
        return setErrMsg('Password must have 8 characters an uppercase letter and a number')
      }else{
        try {
            setLoading(true);
            setErrMsg();
            await signUp(emailRef.current.value,passwordRef.current.value)
            history.push('/')
        } catch (err) {
          setErrMsg(err.message);
        }
      }
      


        
        setLoading(false)
  }
  function emailAndPassValidator(emailOrPass, regEx, errMsg) {
    if(regEx.test(emailOrPass) || emailOrPass.length <=0){
        setErrMsg()
      }else{
        setErrMsg(errMsg)
      }
  }


    return (
          <Container className="d-flex loginImgBg justify-content-center align-items-center" fluid>
            <Row>
              <Col>
                  <Form className="formShadowBox text-light">  
                    {errMsg && <Alert  className="text-danger text-center errorBg">{errMsg}</Alert>}                     
                        <Link to="/login"><i className="fas fa-chevron-left" />  Back</Link>
                        <Form.Group>
                            <div className="d-flex justify-content-center">
                                <i className="fas fa-user fa-3x"></i>
                            </div>
                            <h3 className="text-center mt-1 mb-5">Create New Account</h3>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label >Email Address:</Form.Label>
                            <Form.Control size="sm" ref={emailRef} onChange={(e)=>{
                              emailAndPassValidator(e.target.value,emailRegEx, 'Please enter a valid Email')
                            }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" size="sm" ref={passwordRef} onChange={ (event) =>{
                              emailAndPassValidator(event.target.value,passRegEx,'Password must have 8-16 characters an uppercase letter and a number')
                            }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Confirm Password:</Form.Label>
                            <Form.Control type="password" size="sm" ref={confirmPassRef} onChange={(e)=>{
                              if(e.target.value === passwordRef.current.value || e.target.value.length <= 0 ){
                                setErrMsg()
                              }else{
                                setErrMsg('Passwords do not match')
                              }
                            }} />
                        </Form.Group>
                        <Button disabled={loading} variant='primary' type="submit" onClick={registerUser} className="btn-block mt-5">Create account.</Button>
                        <div className="mt-2 d-flex justify-content-end">
                          <Link to="/reset-password"> Forgot Password?</Link>
                        </div>
                    </Form>
              </Col>
            </Row>
          </Container>
    )
}

