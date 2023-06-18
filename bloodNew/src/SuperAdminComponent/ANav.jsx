import React from "react";
import logo from "../Images/blood.png";
import {Container,Navbar,Nav,NavDropdown} from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import './ANav.css'

const ANav=()=>{  
    return(
      <div className="ov"> 
      
      <div className="cont">
        <div className="hold-menu me-4">

            <Navbar sticky="top" bg="dark" variant="dark" expand="md">
          <Container fluid>
          <Navbar.Brand  as={NavLink} to='/super-admin'><img style={{height: '40px', width:'70px',boxShadow: 'rgb(255 255 255) 1px 0px 4px 4px',marginLeft: '14px'}} className="logo" src={logo} alt="No Logo" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0 justify-content-end text-center me-3"
                style={{  maxHeight: '300px',width:"96%", padding:'20px'}}
                navbarScroll
              >

                    <NavDropdown title="Requests" id="basic-nav-dropdown">
                          <NavDropdown.Item as={NavLink} to="/super-admin/admin-list">Admin List</NavDropdown.Item>
                         <NavDropdown.Item as={NavLink} to="/super-admin/">Admin Sign up</NavDropdown.Item>
          
      
          <NavDropdown.Item as={NavLink} to="/super-admin/orgsignup">org sign up</NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/super-admin/camping">Camping</NavDropdown.Item>
          <NavDropdown.Divider />
        </NavDropdown>

        <Nav.Link as={NavLink} to='/super-admin/feedback'>Feedback</Nav.Link>
        
        <NavDropdown title="Manage users" id="basic-nav-dropdown">
        <NavDropdown.Item as={NavLink} to="/super-admin/donor">Donors</NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/super-admin/recipent">Recipients</NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/super-admin/jazzcash"> Donated Cash record</NavDropdown.Item> 
        <NavDropdown.Divider />
        </NavDropdown>

        <NavDropdown title="Camping" id="basic-nav-dropdown">
          <NavDropdown.Item as={NavLink} to='/super-admin/new-camp'>New Camp</NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to='/super-admin/existing-camp'>Existing Camps</NavDropdown.Item>
          <NavDropdown.Divider />
        </NavDropdown>


        <NavDropdown title="Setting" id="basic-nav-dropdown">
                    {/* <NavDropdown.Item as={NavLink} to='/super-admin/about'>About us</NavDropdown.Item> */}
                    {/* <NavDropdown.Item as={NavLink} to='/super-admin/update-blood-info'>Blood Info</NavDropdown.Item> */}
                    <NavDropdown.Item as={NavLink} to="/super-admin/contact">Contact us</NavDropdown.Item>
       
          {/* <NavDropdown.Item as={NavLink} to="/super-admin/easypaisa">Easy Paisa</NavDropdown.Item> */}
          <NavDropdown.Item as={NavLink} to="/super-admin/changejazzcash">Change Jazz Cash</NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/super-admin/change_easypaisa">Change Easy Paisa</NavDropdown.Item>

          <NavDropdown.Item as={NavLink} to="/super-admin/password">Password</NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/">Logout</NavDropdown.Item>
          <NavDropdown.Divider />
        </NavDropdown>


      </Nav>
      
    </Navbar.Collapse>
  </Container>
</Navbar>
</div>
        </div>
        </div>
    );
}

export default ANav;