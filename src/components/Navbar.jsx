import React from 'react'
import {  Navbar, NavDropdown, Nav } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from 'react-router-dom';


export const PageNavbar = () => {
    const {logOut} = useAuth()
    const history = useHistory()

    async function userLogOut() {
        try {
            await logOut()
            history.push('/login')
        } catch {
            
        }
    }

    return (
        <Navbar sticky="top"  bg="dark" variant="primary" style={{maxHeight: '64px'}}>
            <Navbar.Brand >
                <Link to="/" className="ml-4">
                    <i className="fas fa-utensils " /> My Recipe 
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="userDropdown" />
            <Nav className="ml-auto mr-5">
            <Navbar.Collapse >
                <NavDropdown id="userDropdown" alignRight  title={<i className=" text-primary fas fa-user-circle fa-2x "></i>}>
                    <NavDropdown.Item onClick={()=>{history.push('/profile')}}><i className="fas fa-id-card"></i>  Profile</NavDropdown.Item>
                    <NavDropdown.Item onClick={()=>{history.push('/my-recipes')}}><i className="fas fa-box-open"></i> My Recipes</NavDropdown.Item>
                    <NavDropdown.Item onClick={()=>{history.push('/my-recipes/add')}}><i className="fas fa-plus"></i> Add Recipe</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={userLogOut}><i className="fas fa-sign-out-alt" ></i> Log out</NavDropdown.Item>
                </NavDropdown>
            </Navbar.Collapse>
            </Nav>
        </Navbar>

    )
}

