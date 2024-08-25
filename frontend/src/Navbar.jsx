import { useEffect, useState } from "react";
import {
    Link,
  } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import SessionStatus from './SessionStatus';
import Col from "react-bootstrap/Col";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from "react-bootstrap/esm/Button";
import Login from "./Login";
import { CloseButton } from "react-bootstrap";
import CreateAccount from "./CreateAccount";


function NavigationBar() {
    const sessionStatus = SessionStatus()
    const [showLogin, setShowLogin] = useState(false);
    const [showCreateAccount, setShowCreateAccount] = useState(false);
    const handleCloseLogin = () => setShowLogin(false);
    const handleCloseCreateAccount= () => setShowCreateAccount(false);
    return (
        <Navbar className="fixed-top" expand="lg" >
          <Link to="/yarns">Yarns</Link>
          {sessionStatus !== null 
          
        ? <Link to={`/user/${sessionStatus}`}> Your favorites</Link>
        : <> 
          
          <Link onClick={() => setShowLogin(!showLogin)}>Login</Link>
  
          <Offcanvas show={showLogin}  >
          <Offcanvas.Header closeButton onClick={handleCloseLogin}></Offcanvas.Header>
          <Offcanvas.Body>
          <Login/>
          </Offcanvas.Body>
          </Offcanvas>
        
        <Link onClick={() => setShowCreateAccount(!showCreateAccount)}>Create Account</Link>
        <Offcanvas show={showCreateAccount} onSubmit={handleCloseCreateAccount} >
          <Offcanvas.Header closeButton onClick={handleCloseCreateAccount}></Offcanvas.Header>
          <Offcanvas.Body>
          <CreateAccount/>
          </Offcanvas.Body>
          </Offcanvas>
        </>}
          </Navbar>
  
    )
    }

    export default NavigationBar