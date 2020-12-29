import React, {useRef, useState} from 'react'
import { Container,  Form, Button, Alert, Col, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

export const ForgotPass = () => {
  const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  const emailRef = useRef()
  const [loading, setLoading] = useState()
  const [errMsg, setErrMsg] = useState()
  const { resetPass } = useAuth();
  const [successMsg, setSuccessMsg] = useState()


  // CREATE USER
 async function registerUser(e){
      e.preventDefault()
      if(!emailRegEx.test(emailRef.current.value)){
        return setErrMsg('Please enter a valid Email')
      }
      
        try {
          setLoading(true);
          setErrMsg();
          await resetPass(emailRef.current.value)
          setSuccessMsg('Please check your Email for further steps')
        } catch (err) {
          setErrMsg(err.message);
        }
        setTimeout(() => {
            setErrMsg()
        }, 1000);
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
                    {successMsg && <Alert  className="text-succes text-center successBg">{successMsg}</Alert>}                     
                        <Link to="/login"><i className="fas fa-chevron-left" />  Back</Link>
                        <Form.Group>
                            <div className="d-flex justify-content-center">
                                <i className="fas fa-user fa-3x"></i>
                            </div>
                            <h3 className="text-center mt-1 mb-5">Reset Password</h3>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label >Email Address:</Form.Label>
                            <Form.Control size="sm" ref={emailRef} onChange={(e)=>{
                              emailAndPassValidator(e.target.value,emailRegEx, 'Please enter a valid Email')
                            }} />
                        </Form.Group>
                        <Button disabled={loading} variant='primary' type="submit" onClick={registerUser} className="btn-block mt-5">Reset Password.</Button>
                            <div className="mt-4 ">
                                <Link to="/create-user"> Don't have an account yet?<br /> Create account.</Link>
                            </div>
                    </Form>
              </Col>
            </Row>
          </Container>
    )
}

