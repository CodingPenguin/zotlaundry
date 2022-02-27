import React from "react";
import { Navbar, Nav, Button, Container, NavDropdown } from 'react-bootstrap';
import "./navbar.css";
// import { useAuth } from '../contexts/AuthContext';
import { IconContext } from 'react-icons';
import { FaGithub } from 'react-icons/fa';
import brand from './ZotLaundry.png';

export default function NavBar(){
    // const { currentUser, logout } = useAuth()  

    return (
        <Navbar className="navigation" bg="white" variant="light" expand="sm">

            <a href="/">
                <img style={{ height:"60px"}} src={brand} alt="None"></img>
            </a>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href= "https://github.com/CodingPenguin/zotlaundry" target="_blank">
                        <IconContext.Provider value={{ size: "25px" }}>
                            <FaGithub/>
                        </IconContext.Provider>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
