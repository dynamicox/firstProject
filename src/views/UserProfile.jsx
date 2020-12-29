import React, {useState} from 'react'
import { PageNavbar } from "../components/Navbar";
import { Card, Form, Button, Col, Row, Container} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Footer } from "../components/Footer"



export const UserProfile = () => {
    const { currentUser } = useAuth()
    const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const passRegEx =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    const [newPass, setNewPass] = useState('')
    const [passButton, setPassButton] = useState(true)
    const [currentEmail, setCurrentEmail] = useState(currentUser.email)
    const [currentName, setCurrentName] = useState(currentUser.displayName)
    const [displayInfo, setDisplayInfo] = useState({name: currentUser.displayName, email: currentUser.email})
    const [errMsg, setErrMsg] = useState()

    async function updatePassword(pass) {
        try {
            setPassButton(true)
            await currentUser.updatePassword(pass)
           // console.log('si')
        } catch (error) {
            setErrMsg('Error trying to change your password, please try again later...')
            setTimeout(() => {
                        setErrMsg()
                     }, 3000) 
        }
            setPassButton(false)
    }

    async function updateUserName(name) {
        if(name.length < 3){
            return console.log('invalid name')
        }else{
         
             currentUser.updateProfile({displayName: name}).then( setDisplayInfo({name, email: currentUser.email}))
               .catch( ()=>{
                 setErrMsg('Error trying to change username, please try again later')
                    setTimeout(() => {
                        setErrMsg()
                     }, 3000) 
            } )  
        }
    }


   async function updateUserEmail(email) {
            currentUser.updateEmail(email).then(setDisplayInfo({name: currentUser.displayName, email}))
            .catch( ()=>{
                 setErrMsg('Enter a valid email.')
                    setTimeout(() => {
                        setErrMsg()
                     }, 3000) 
            } )
    }


    return (
        <div style={{backgroundColor: "#F3F3F3"}}> 
            <PageNavbar />
                <Container className="mt-3">
                    <Row className="justify-content-center mr-2">
                        <Card className="col-7 d-flex justify-content-center align-items-center ">
                            <div className="mt-2">
                                <i className=" fas fa-user-circle fa-10x "></i>
                            </div>
                            {/* DISPLAY CURRENT USERNAME AND EMAIL */}
                            <h3 className="mt-1">{displayInfo.name || 'Set up a custom username'}</h3>
                            <p className="mt-1 text-muted">{displayInfo.email}</p>
                            {currentName === 'Eimy Diaz'  && <Button className="mb-2" size="sm" onClick={()=>{alert('Te adorito mi prinsheshita <3')}}>Click!</Button>}
                        </Card>
                    </Row>
                    {/* ERROR MESSAGE */}
                    {errMsg && <div className='alert errorBg mt-2 mr-5 text-center text-danger'>{errMsg}</div>}
                    <Row className="mt-3 mb-5">
                        <Col md='7' sm='12' >
                        <Card className="pr-2 pl-2 pb-4 mt-3">
                            <div >
                                {/* CHANGE USERNAME AND EMAIL */}
                                <h4 className="text-center mt-4 mb-4">Change Name or E-Mail</h4>
                                <Form.Control className="mb-4"  placeholder={displayInfo.name || 'Set up a custom username...'} onChange={ (e)=>{
                                    if(e.target.value.length <= 0){
                                        setErrMsg()
                                    }else if(e.target.value.length > 1){
                                        setCurrentName(e.target.value)
                                        setErrMsg()
                                    }else{
                                         setErrMsg('Your name must have at least 2 characteres');
                                    }
                                }} />
                                <Form.Control className="mb-3"  placeholder={displayInfo.email} onChange={(e)=>{ 
                                   if(e.target.value.length <= 0){
                                        setErrMsg()
                                        setCurrentEmail(currentUser.email)
                                    }else if( emailRegEx.test(e.target.value)){
                                  setCurrentEmail(e.target.value) 
                                  setErrMsg()    
                                }else{
                                    setErrMsg('Please enter a valid email.')
                                    setCurrentEmail(currentUser.email)
                                }
                                 } } />
                                <div className='d-flex justify-content-end mr-1 mt-1'> 
                                    <div className='mr-2 w-50'><Button variant="success" block onClick={()=> updateUserName(currentName)} >Change Name</Button></div>
                                    <div className='w-50'><Button variant="success" block onClick={()=> updateUserEmail(currentEmail)}>Change E-mail</Button></div>
                                 </div>
                            </div>
                        </Card>
                      </Col>
                      <Col md='5' sm='12'>
                        <Card className='mt-3'>
                            <div className="mr-2 ml-2">
                                {/* CHANGE PASSWORD */}
                                <h4 className="text-center mt-4 mb-4">Change Password</h4>
                                <Form.Control className="mb-4" type="password"  placeholder="Type in your new password..." onChange={(e)=>{
                                    if(e.target.value.length <= 0){
                                        setErrMsg()
                                    }else if(passRegEx.test(e.target.value)){
                                        setNewPass(e.target.value)
                                        setErrMsg('Please confirm your password!')
                                    }else{
                                        setErrMsg('Invalid Password: Password must have 8 charateres an uppercase and a number.')
                                    }
                                } } />
                                <Form.Control className="mb-3" type="password" placeholder="Confirm your new password..." onChange={(e)=>{
                                    if(e.target.value === newPass){
                                        setPassButton(false)
                                        setErrMsg()
                                    }else{
                                        setPassButton(true);
                                        setErrMsg('Please confirm your password!')
                                    }
                                }} />
                                <Button variant="success" className="btn-block mb-4" disabled={passButton} onClick={()=> updatePassword(newPass)} >Change Password</Button>
                            </div>
                        </Card>
                        </Col>           
                    </Row>
                </Container>
                <Footer />
        </div>
    )
}
