import React, { useState } from "react";
import { Offcanvas, Nav, Dropdown} from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../CSS/menu.css"; 

const StudentMenu = () => {

  return (
    
    <>
       <Offcanvas show={true} backdrop={false} scroll={true}>
      <Offcanvas.Header>
        <Offcanvas.Title>Student Menu</Offcanvas.Title>
      </Offcanvas.Header>
     
      <Offcanvas.Body>
        
        <Nav className="flex-column">
        
          <Nav.Link href="#home"> Home</Nav.Link>          
          <Dropdown>
            <Dropdown.Toggle id="dropdown-split-basic" split variant="blue" style={{color:"white"}}>
             Student 
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/student-add">Student Registration</Dropdown.Item>
              <Dropdown.Item href="/student-detail">Student Details</Dropdown.Item>
              
            </Dropdown.Menu>
          </Dropdown>
            <Dropdown>
            <Dropdown.Toggle id="dropdown-split-basic" split variant="blue" style={{color:"white"}}>
               Course
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/student-course-list">Course List</Dropdown.Item>
              <Dropdown.Item href="/#">Course Subscription</Dropdown.Item>
              <Dropdown.Item href="subscription-by-student-list">Subscription List</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          
          <Dropdown>
            <Dropdown.Toggle id="dropdown-split-basic" split variant="blue" style={{color:"white"}}>
             Payment 
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Pay Course</Dropdown.Item>
              <Dropdown.Item href="#/action-1">Payment Report</Dropdown.Item>
              
            </Dropdown.Menu>
          </Dropdown>
          <Nav.Link href="/" className="logout-link"> Logout</Nav.Link>
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
    </>
  );
};

export default StudentMenu;
