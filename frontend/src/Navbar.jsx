import {
    Link,
  } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import SessionStatus from './SessionStatus';
import Col from "react-bootstrap/Col";

function NavigationBar() {
    const sessionStatus = SessionStatus()
    return (
        <Navbar >
          <Container fluid>
        <Nav.Item>
          <Link to="/yarns">Yarns</Link>
          </Nav.Item>
          {sessionStatus !== null 
          
        ? <Nav.Item><Link to={`/user/${sessionStatus}`}> Your favorites</Link></Nav.Item>
        : <><Nav.Item>
          <Link to="/login">Login</Link>
          </Nav.Item>
        <Nav.Item>
        <Link to="/createaccount">Create Account</Link>
        </Nav.Item>
        </>}
        </Container>
          </Navbar>
  
    )
    }

    export default NavigationBar