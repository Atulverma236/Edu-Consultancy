import React, { useState } from "react";
import { Offcanvas, Nav, Dropdown } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../CSS/menu.css";

const AdminMenu = () => {

  return (
    <>
      <Offcanvas show={true} backdrop={false} scroll={true}>
        <Offcanvas.Header>
          <Offcanvas.Title>Admin Menu</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>

          <Nav className="flex-column">
            <Dropdown>
              <Dropdown.Toggle id="dropdown-split-basic" variant="blue" style={{ color: "white" }}>
                Students
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/student-list">Student List</Dropdown.Item>
                <Dropdown.Item href="/current-student">Current Student</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-split-basic" variant="blue" style={{ color: "white" }}>
                Courses
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/course-add">Course Addition</Dropdown.Item>
                <Dropdown.Item href="/admin-course-list">Course List</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-split-basic" variant="blue" style={{ color: "white" }}>
                Subscriptions
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/subscription-list">Subscription List</Dropdown.Item>
                <Dropdown.Item href="/current-subscription">Current Subscription</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Nav.Link href="#payments"> Payment List</Nav.Link>
            <Nav.Link href="/" className="logout-link"> Logout</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default AdminMenu;
