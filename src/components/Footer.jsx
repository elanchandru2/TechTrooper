import React, { useState } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { GearFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import Contactus from './Contactus';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';

export const Footer = () => {
  const [showModal, setShowModal] = useState(false); // Define showModal state variable

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <Navbar expand="lg" className="bg-transparent Navbar" variant="dark">
        <Container>
          <Navbar.Brand href="#"><h4 style={{ fontFamily: "monospace", color: "black" }} className='text-black'>Tech trooper</h4></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: "black" }}>
            <GearFill color="black" size={24} />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
            <Tabs
              textColor="inherit"
              indicatorColor="secondary"
            >
              <Tab label="Home" style={{ color: "black" }} component={Link} to="/" />
              <Tab label="Shop" style={{ color: "black" }} component={Link} to="/products" />
              <Tab label="Contact Us" style={{ color: "black" }} onClick={handleShow} />
              <Tab label="Login" style={{ color: "black" }} component={Link} to="/login" />
              <Tab label="Signup" style={{ color: "black" }} component={Link} to="/signup" />
            </Tabs>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Us</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Contactus />
          <p><a href="">Terms and service</a>.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      
      <Container className="mt-3">
        <div className="d-flex justify-content-center">
          <a href="https://www.facebook.com/" className="me-3" target='_blank'>
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a href="https://www.instagram.com/" className="me-3" target='_blank'>
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a href="https://github.com/" className="me-3" target='_blank'>
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
          <a href="https://www.youtube.com/" className="me-3" target='_blank'>
            <FontAwesomeIcon icon={faYoutube} size="2x" />
          </a>
        </div>
      </Container>

      <Container>
        <small className="text-center mt-5">&copy; 2024 Tech Trooper. All rights reserved.</small>
      </Container> 
    </>
  );
}; 
