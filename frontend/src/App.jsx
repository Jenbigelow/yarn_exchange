import { useEffect, useState } from 'react'
import './App.css'
import {
  Routes,
  Route,
  Link,
  Outlet,
  useParams
} from "react-router-dom";
import Yarn from './Yarn'
import GetYarns from './Yarns';
import Yarns from './Yarns'
import About from './About'
import Login from './Login'
import User from './User'
import CreateAccount from './CreateAccount';
import Seller from './Seller';
import Search from './Search';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row';

function Layout() {
  return(
<nav>
  <div>
  <Link to="/login">Login</Link>
  </div>
  <div>
  <Link to="/createaccount">Create Account</Link>
  </div>
  <div>
  <Link to="/yarns">Yarns</Link>
  </div>

</nav>
  )
}


  
function App() {

  return(
    <>
    <Navigationbar> </Navigationbar> 


  <div>
  <Routes>
  <Route path = "" element = {<Layout />}/><Route/>
  <Route path = "/user/:userId" element = {<User/>}/><Route/>
  <Route path = "/seller/:sellerId" element = {<Seller/>}/><Route/>
  <Route path="CreateAccount" element={<CreateAccount />} /><Route/>
  <Route path="Login" element={<Login />} /><Route/>
  <Route path="/yarns" element ={<GetYarns/>}/> <Route/>
    <Route path="/yarns/:yarnId" element={<Yarn />} />
    <Route path="/yarn_form" element ={<Search/>}/> <Route/>
    <Route path="/yarns/search/:yarnSelect" element ={<Search/>}/> <Route/>
  </Routes>
  </div>

  
    </>
)
}

function Navigationbar() {
  return (
    <Nav>
      <Navbar>
    <Nav.Item>
      <Link to="/login">Login</Link>
      </Nav.Item>
    <Nav.Item>
      <Link to="/createaccount">Create Account</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/yarns">Yarns</Link>
        </Nav.Item>
        <Nav.Item>
        <Link to="/yarns/search/:yarnSelect">Filter</Link>
        </Nav.Item>
        </Navbar>
    </Nav>
  )
  }

export default App


