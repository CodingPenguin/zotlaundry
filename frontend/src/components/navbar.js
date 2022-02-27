import React from "react";
import { Navbar, Nav, Button, Container, NavDropdown } from 'react-bootstrap';
//import "./navbar.css";
// import { useAuth } from '../contexts/AuthContext';
import { FaGithub } from 'react-icons/fa';

export default function NavBar(){
    // const { currentUser, logout } = useAuth()  
        
    return (
        <Navbar className="navigation" bg="white" variant="light" expand="sm">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href= "https://github.com/CodingPenguin/zotlaundry" target="_blank"><FaGithub/></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
