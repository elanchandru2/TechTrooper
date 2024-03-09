import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { GearFill } from 'react-bootstrap-icons'; // Import Bootstrap Icons for the toggle icon
import Contactus from "./Contactus";

function ContainerInsideExample() {
  const [value, setValue] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <Navbar expand="lg" className="bg-transparent Navbar" variant="dark">
        <Container>
          <Navbar.Brand href="#"><h4 style={{fontFamily:"monospace", color:"black"}} className='text-black'>Tech trooper</h4></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{borderColor: "black"}}>
            <GearFill color="black" size={24} />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="inherit"
              indicatorColor="secondary"
            >
              <Tab label="Home" style={{color:"black"}} component={Link} to="/" />
              <Tab label="Shop" style={{color:"black"}} component={Link} to="/products" />
              <Tab label="Contact Us" style={{color:"black"}} onClick={handleShow} />
              <Tab label="Login" style={{color:"black"}} component={Link} to="/login" />
              <Tab label="Signup" style={{color:"black"}} component={Link} to="/signup" />
            </Tabs>
          </Navbar.Collapse>
        </Container>
      </Navbar> 

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Us</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Contactus/>
          <p><a href="">Terms and service</a>.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ContainerInsideExample;
